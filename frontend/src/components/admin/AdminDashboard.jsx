// Admin Dashboard - Enhanced Image Gallery v2.1
import { useEffect, useMemo, useState } from "react";
import {
  FiActivity, FiArrowUpRight, FiBookOpen, FiBriefcase, FiCheck, FiChevronRight,
  FiClock, FiEdit3, FiExternalLink, FiFileText, FiFolder, FiGrid, FiImage,
  FiInbox, FiLayers, FiLink, FiLogOut, FiMail, FiMenu, FiPlus, FiSearch,
  FiSettings, FiTrash2, FiUploadCloud, FiUser, FiX,
} from "react-icons/fi";
import { apiEnabled, apiFetch, apiUpload, assetUrl } from "../../lib/api";

const modules = {
  projects: { label: "Projects", singular: "Project", path: "/api/projects", icon: FiFolder, fields: [["title", "Project title"], ["description", "Description", "textarea"], ["technologies", "Technologies (comma separated)"], ["githubUrl", "GitHub URL"], ["liveUrl", "Live URL"], ["displayOrder", "Display order", "number"], ["featured", "Featured", "checkbox"], ["published", "Visible on portfolio", "checkbox"]] },
  skills: { label: "Skills", singular: "Skill", path: "/api/skills", icon: FiActivity, fields: [["name", "Skill name"], ["category", "Category"], ["proficiency", "Proficiency %", "number"], ["icon", "Icon name"], ["displayOrder", "Display order", "number"], ["published", "Visible on portfolio", "checkbox"]] },
  experience: { label: "Experience", singular: "Experience", path: "/api/experience", icon: FiBriefcase, fields: [["position", "Position"], ["organization", "Organization"], ["employmentType", "Employment type"], ["description", "Description", "textarea"], ["startDate", "Start date"], ["endDate", "End date"], ["location", "Location"], ["currentlyWorking", "Currently working", "checkbox"], ["published", "Visible on portfolio", "checkbox"]] },
  education: { label: "Education", singular: "Education", path: "/api/education", icon: FiBookOpen, fields: [["institution", "Institution"], ["degree", "Degree"], ["fieldOfStudy", "Field of study"], ["startDate", "Start date"], ["endDate", "End date"], ["description", "Description", "textarea"], ["published", "Visible on portfolio", "checkbox"]] },
  certificates: { label: "Certificates", singular: "Certificate", path: "/api/certificates", icon: FiFileText, fields: [["title", "Certificate title"], ["issuer", "Issuer"], ["issueDate", "Issue date"], ["credentialUrl", "Credential URL"], ["description", "Description", "textarea"], ["published", "Visible on portfolio", "checkbox"]] },
  "social-links": { label: "Social links", singular: "Social link", path: "/api/social-links", icon: FiLink, fields: [["platform", "Platform"], ["url", "URL"], ["displayOrder", "Display order", "number"], ["published", "Visible on portfolio", "checkbox"]] },
};
const profileFields = [["name", "Full name"], ["title", "Professional title"], ["biography", "Biography", "textarea"], ["email", "Public email"], ["phone", "Phone"], ["location", "Location"], ["photoKey", "Profile image key"], ["resumeKey", "Resume file key"]];
const empty = (fields) => Object.fromEntries(fields.map(([key, , type]) => [key, type === "checkbox" ? true : type === "number" ? 0 : ""]));
const displayName = (row) => row.title || row.name || row.position || row.institution || row.platform || "Untitled";
const previewFor = (row) => {
  // For projects with images array, use the first image
  if (row.images && row.images.length > 0) return row.images[0].imageKey;
  // Fallback to old imageKey field
  return row.imageKey || "";
};
const active = "projects";
const dateLabel = (value) => value ? new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Not published";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const submit = async (event) => { event.preventDefault(); try { const result = await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(form) }); localStorage.setItem("portfolio_admin_token", result.token); onLogin(); } catch (e) { setError(e.message); } };
  return <div className="min-h-screen bg-[#0b1020] px-5 py-10 text-slate-100"><div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#11182b] shadow-2xl lg:grid-cols-2"><div className="hidden min-h-[620px] flex-col justify-between bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-10 lg:flex"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold">T</div><div><p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-white/70">Portfolio control room</p><h1 className="max-w-sm text-5xl font-semibold leading-[1.05] tracking-tight">Make every detail count.</h1><p className="mt-6 max-w-sm text-base leading-7 text-white/75">One calm workspace for your work, story, links and messages.</p></div><p className="text-sm text-white/60">Secure administrator access</p></div><form onSubmit={submit} className="p-7 sm:p-12"><div className="mb-12"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">Welcome back</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Sign in to studio</h2><p className="mt-3 text-sm leading-6 text-slate-400">Manage your portfolio content from one focused workspace.</p></div><label className="mb-5 block text-sm text-slate-300">Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3.5 text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10" /></label><label className="block text-sm text-slate-300">Password<input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3.5 text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10" /></label>{error && <p className="mt-4 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}<button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400">Enter studio <FiArrowUpRight /></button></form></div></div>;
}

function ImageGalleryField({ itemId, apiPath, onImagesChange }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  
  useEffect(() => {
    if (itemId) {
      apiFetch(`${apiPath}/${itemId}/images`)
        .then(data => { setImages(data); setLoading(false); })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [itemId, apiPath]);
  
  const uploadImage = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const uploadResult = await apiUpload(file);
      if (itemId) {
        const newImage = await apiFetch(`${apiPath}/${itemId}/images`, {
          method: "POST",
          body: JSON.stringify({ imageKey: uploadResult.key, displayOrder: images.length })
        });
        const updated = [...images, newImage];
        setImages(updated);
        onImagesChange?.(updated);
      } else {
        const tempImage = { id: `temp-${Date.now()}`, imageKey: uploadResult.key, displayOrder: images.length };
        const updated = [...images, tempImage];
        setImages(updated);
        onImagesChange?.(updated);
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  };
  
  const handleFileInput = (event) => {
    const file = event.target.files?.[0];
    if (file) uploadImage(file);
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      uploadImage(file);
    }
  };
  
  const deleteImage = async (imageId, imageKey) => {
    if (!window.confirm("Delete this preview image?")) return;
    try {
      if (itemId && !imageId.startsWith("temp-")) {
        await apiFetch(`${apiPath}/${itemId}/images/${imageId}`, { method: "DELETE" });
      }
      const updated = images.filter(img => img.id !== imageId);
      setImages(updated);
      onImagesChange?.(updated);
    } catch (e) {
      alert(e.message);
    }
  };
  
  return (
    <div className="md:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <label className="text-sm font-semibold text-slate-200">Preview Images Gallery</label>
          <p className="mt-1 text-xs text-slate-500">Drag & drop or click to upload • {images.length} image{images.length !== 1 ? 's' : ''}</p>
        </div>
        {images.length > 0 && (
          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </span>
        )}
      </div>
      
      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/[.025] p-12 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
          <p className="mt-3 text-sm text-slate-500">Loading gallery...</p>
        </div>
      ) : (
        <>
          {/* Image Grid */}
          {images.length > 0 && (
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/[.025] transition-all hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  {/* Image */}
                  <img
                    src={assetUrl(image.imageKey)}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => deleteImage(image.id, image.imageKey)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500 text-white opacity-0 shadow-lg transition-all hover:bg-rose-600 hover:scale-110 group-hover:opacity-100"
                    title="Delete image"
                  >
                    <FiTrash2 size={14} />
                  </button>
                  
                  {/* Image number badge */}
                  <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Upload Area */}
          <label
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all ${
              dragOver
                ? 'border-indigo-400 bg-indigo-500/10 scale-[1.02]'
                : uploading
                ? 'border-white/10 bg-white/[.025] cursor-not-allowed'
                : 'border-white/15 bg-white/[.025] hover:border-indigo-400 hover:bg-indigo-500/5'
            }`}
          >
            {uploading ? (
              <>
                <div className="h-12 w-12 animate-spin rounded-full border-3 border-indigo-500 border-t-transparent"></div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Uploading image...</p>
                  <p className="mt-1 text-xs text-slate-500">Please wait</p>
                </div>
              </>
            ) : dragOver ? (
              <>
                <FiUploadCloud size={32} className="text-indigo-400" />
                <div>
                  <p className="text-sm font-medium text-indigo-300">Drop image here</p>
                  <p className="mt-1 text-xs text-slate-500">Release to upload</p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-full bg-indigo-500/10 p-3">
                  <FiImage size={24} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {images.length > 0 ? 'Add another image' : 'Upload preview images'}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Drag & drop or click to browse • PNG, JPG, WebP
                  </p>
                </div>
                <div className="mt-2 rounded-lg bg-white/[.04] px-4 py-2 text-xs font-medium text-slate-400">
                  Click or drag here
                </div>
              </>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              onChange={handleFileInput}
              disabled={uploading}
              className="hidden"
            />
          </label>
          
          {/* Tips */}
          {images.length === 0 && (
            <div className="mt-4 rounded-xl bg-indigo-500/5 border border-indigo-400/10 p-4">
              <p className="text-xs font-medium text-indigo-300">💡 Pro tip</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Upload multiple images to create an image carousel on your portfolio. First image will be the default preview.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ImageField({ value, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const upload = async (event) => { const file = event.target.files?.[0]; if (!file) return; setUploading(true); try { const result = await apiUpload(file); onChange(result.key); } catch (e) { alert(e.message); } finally { setUploading(false); } };
  return <div className="md:col-span-2"><div className="mb-3 flex items-center justify-between"><label className="text-sm font-medium text-slate-300">{label}</label>{value && <span className="flex items-center gap-1.5 text-xs text-emerald-400"><FiCheck size={14} /> Image attached</span>}</div>{value && <div className="mb-4 rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">Current Image</p><div className="overflow-hidden rounded-xl"><img src={assetUrl(value)} alt="Current preview" className="w-full max-w-md object-cover" /></div></div>}<div className="flex flex-wrap items-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[.025] p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"><label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white"><FiUploadCloud size={18} />{uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}<input type="file" accept="image/png,image/jpeg,image/webp,image/jpg" onChange={upload} disabled={uploading} className="hidden" /></label>{value && <button type="button" onClick={() => onChange("")} className="flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300 transition hover:border-rose-400 hover:bg-rose-500/20"><FiTrash2 size={16} /> Remove</button>}</div><div className="w-full border-t border-white/10 pt-4 sm:border-0 sm:pt-0"><input value={value || ""} onChange={e => onChange(e.target.value)} placeholder="Or paste image key or URL" className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20" /></div></div></div>;
}

function Editor({ module, initial, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    ...initial,
    technologies: Array.isArray(initial.technologies)
      ? initial.technologies.join(", ")
      : initial.technologies || "",
  }));
  const fields = module === "profile" ? profileFields : modules[module].fields;
  const config = module === "profile" ? { label: "Profile", fields } : modules[module];
  const set = (key, value) => setForm({ ...form, [key]: value });
  
  // Show gallery for all modules except profile and social-links
  const showGallery = initial.id && module !== "profile" && module !== "social-links";
  
  return <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 p-0 backdrop-blur-sm sm:p-4"><form onSubmit={e => { e.preventDefault(); onSave(form); }} className="flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-white/10 bg-[#11182b] shadow-2xl sm:rounded-3xl sm:border"><div className="flex items-center justify-between border-b border-white/10 px-6 py-5"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">Content editor</p><h2 className="mt-1 text-xl font-semibold">{initial.id ? `Edit ${config.label}` : `New ${config.label}`}</h2></div><button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white"><FiX size={20} /></button></div><div className="flex-1 overflow-y-auto p-6"><div className="grid gap-5 md:grid-cols-2">{showGallery && <ImageGalleryField itemId={initial.id} apiPath={`/api/${module}`} />}{fields.map(([key, label, type]) => module !== "profile" && key === "imageKey" ? <ImageField key={key} value={form[key]} onChange={v => set(key, v)} /> : <label key={key} className={`${type === "textarea" ? "md:col-span-2" : ""} ${type === "checkbox" ? "flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.025] px-4 py-3" : "block"}`}>{type === "checkbox" ? <><input type="checkbox" checked={Boolean(form[key])} onChange={e => set(key, e.target.checked)} className="h-4 w-4 accent-indigo-500" /><span className="text-sm text-slate-300">{label}</span></> : <><span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>{type === "textarea" ? <textarea required={key === "description" || key === "biography"} rows={5} value={form[key] || ""} onChange={e => set(key, e.target.value)} className="w-full resize-y rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 text-sm leading-6 text-white outline-none focus:border-indigo-400" /> : <input required={key === "title" || key === "name" || key === "email" || key === "platform" || key === "url" || key === "position" || key === "organization" || key === "institution" || key === "degree"} type={type === "number" ? "number" : "text"} value={form[key] ?? ""} onChange={e => set(key, type === "number" ? Number(e.target.value) : e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 text-sm text-white outline-none focus:border-indigo-400" />}</>}</label>)}</div></div><div className="flex gap-3 border-t border-white/10 bg-[#0f1627] px-6 py-4"><button type="button" onClick={onClose} className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5">Cancel</button><button className="flex-1 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400">Save changes</button></div></form></div>;
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false); const [active, setActive] = useState("overview"); const [rows, setRows] = useState([]); const [allCounts, setAllCounts] = useState({}); const [editing, setEditing] = useState(null); const [profile, setProfile] = useState(null); const [messages, setMessages] = useState([]); const [query, setQuery] = useState(""); const [notice, setNotice] = useState(""); const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { if (apiEnabled) apiFetch("/api/auth/me").then(() => setAuthenticated(true)).catch(() => {}); }, []);
  const load = async (key = active) => { try { if (key === "profile") setProfile(await apiFetch("/api/profile")); else if (key === "messages") setMessages(await apiFetch("/api/messages")); else if (modules[key]) setRows(await apiFetch(modules[key].path)); } catch (e) { setNotice(e.message); } };
  useEffect(() => { if (authenticated && active !== "overview") load(); }, [authenticated, active]);
  useEffect(() => { if (!authenticated) return; Promise.all(Object.entries(modules).map(async ([key, item]) => [key, (await apiFetch(item.path)).length])).then(items => setAllCounts(Object.fromEntries(items))).catch(() => {}); }, [authenticated]);
  const save = async (data) => { try { if (active === "profile") await apiFetch("/api/profile", { method: "PUT", body: JSON.stringify(data) }); else { const item = modules[active]; const payload = { ...data }; if ("technologies" in payload) payload.technologies = Array.isArray(payload.technologies) ? payload.technologies : payload.technologies.split(",").map(v => v.trim()).filter(Boolean); await apiFetch(editing.id ? `${item.path}/${editing.id}` : item.path, { method: editing.id ? "PUT" : "POST", body: JSON.stringify(payload) }); } setEditing(null); setNotice("Changes saved and published."); load(); } catch (e) { setNotice(e.message); } };
  const remove = async (row) => { if (!window.confirm(`Delete ${displayName(row)}?`)) return; try { await apiFetch(`${modules[active].path}/${row.id}`, { method: "DELETE" }); load(); setNotice("Item deleted."); } catch (e) { setNotice(e.message); } };
  const filtered = useMemo(() => rows.filter(row => Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase())), [rows, query]);
  if (!apiEnabled) return <div className="min-h-screen bg-[#0b1020] p-8 text-white"><h1 className="text-3xl font-bold">Admin API not configured</h1><p className="mt-2 text-slate-400">Set <code>VITE_API_URL</code> to the deployed Render API URL.</p></div>;
  if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />;
  const nav = [["overview", "Overview", FiGrid], ["profile", "Profile", FiUser], ...Object.entries(modules).map(([key, item]) => [key, item.label, item.icon]), ["messages", "Messages", FiInbox]];
  const title = active === "overview" ? "Good morning, Tolesa" : active === "profile" ? "Profile" : active === "messages" ? "Messages" : modules[active].label;
  return <div className="min-h-screen bg-[#0b1020] text-slate-100"><aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#10172a] px-5 py-6 transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}><div className="flex items-center justify-between px-2"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-bold">T</div><div><p className="font-semibold">Content studio</p><p className="text-xs text-slate-500">Portfolio admin</p></div></div><button onClick={() => setMenuOpen(false)} className="lg:hidden"><FiX /></button></div><nav className="mt-10 space-y-1">{nav.map(([key, label, Icon]) => <button key={key} onClick={() => { setActive(key); setMenuOpen(false); setQuery(""); }} className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition ${active === key ? "bg-indigo-500/15 text-indigo-300" : "text-slate-400 hover:bg-white/[.04] hover:text-slate-100"}`}><span className="flex items-center gap-3"><Icon size={18} />{label}</span>{key === "messages" && messages.filter(m => !m.read).length > 0 ? <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">{messages.filter(m => !m.read).length}</span> : active === key ? <FiChevronRight /> : null}</button>)}</nav><div className="absolute bottom-6 left-5 right-5 rounded-2xl border border-indigo-400/15 bg-indigo-500/[.07] p-4"><p className="text-xs font-medium text-indigo-300">Portfolio status</p><div className="mt-3 flex items-center gap-2 text-sm text-slate-300"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" /> Live and published</div><a href="/" target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-1 text-xs text-slate-500 hover:text-white">View website <FiExternalLink /></a></div></aside><main className="min-h-screen lg:pl-72"><header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/10 bg-[#0b1020]/90 px-5 backdrop-blur-xl sm:px-8"><button onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-slate-400 lg:hidden"><FiMenu size={22} /></button><div className="hidden lg:block"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Workspace / {active}</p><h1 className="mt-1 font-semibold">{title}</h1></div><div className="ml-auto flex items-center gap-3"><a href="/" target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-400 hover:text-white sm:flex"><FiExternalLink /> View site</a><button onClick={async () => { await apiFetch("/api/auth/logout", { method: "POST" }); setAuthenticated(false); }} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-400 hover:border-rose-400/50 hover:text-rose-300"><FiLogOut /> <span className="hidden sm:inline">Sign out</span></button></div></header><div className="mx-auto max-w-[1500px] p-5 sm:p-8">{notice && <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-400/[.07] px-4 py-3 text-sm text-emerald-300"><span className="flex items-center gap-2"><FiCheck />{notice}</span><button onClick={() => setNotice("")}><FiX /></button></div>}{active === "overview" ? <Overview counts={allCounts} onNavigate={setActive} /> : active === "profile" ? <ProfilePage profile={profile} onEdit={() => setEditing(profile || empty(profileFields))} /> : active === "messages" ? <Messages messages={messages} onDelete={async id => { await apiFetch(`/api/messages/${id}`, { method: "DELETE" }); load(); }} /> : <Collection module={modules[active]} rows={filtered} query={query} setQuery={setQuery} onAdd={() => setEditing(empty(modules[active].fields))} onEdit={setEditing} onDelete={remove} />}</div></main>{editing && <Editor module={active} initial={editing} onClose={() => setEditing(null)} onSave={save} />}</div>;
}

function Overview({ counts, onNavigate }) { const total = Object.values(counts).reduce((sum, value) => sum + value, 0); return <><div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-3 text-sm font-medium text-indigo-400">Your creative command center</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Good morning, Tolesa</h2><p className="mt-3 max-w-xl text-slate-400">Keep your story current, your work visible, and your next opportunity one click away.</p></div><button onClick={() => onNavigate("projects")} className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-400"><FiPlus /> Add project</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Published items" value={total} icon={FiLayers} accent="indigo" /><Stat label="Projects" value={counts.projects || 0} icon={FiFolder} accent="fuchsia" /><Stat label="Skills listed" value={counts.skills || 0} icon={FiActivity} accent="cyan" /><Stat label="Collections" value={Object.keys(counts).length} icon={FiGrid} accent="emerald" /></div><div className="mt-8 grid gap-5 xl:grid-cols-[1.3fr_.7fr]"><div className="rounded-3xl border border-white/10 bg-[#11182b] p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-slate-400">Manage content</p><h3 className="mt-1 text-xl font-semibold">Your portfolio building blocks</h3></div><FiSettings className="text-slate-500" /></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{Object.entries(modules).slice(0, 4).map(([key, item]) => <button key={key} onClick={() => onNavigate(key)} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.025] p-4 text-left transition hover:border-indigo-400/50 hover:bg-indigo-500/[.07]"><span className="flex items-center gap-3"><span className="rounded-xl bg-white/[.07] p-2.5 text-indigo-300"><item.icon /></span><span><span className="block text-sm font-medium">{item.label}</span><span className="mt-1 block text-xs text-slate-500">{counts[key] || 0} entries</span></span></span><FiChevronRight className="text-slate-600" /></button>)}</div></div><div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/[.08] p-6 sm:p-8"><FiClock className="text-indigo-300" size={22} /><h3 className="mt-5 text-xl font-semibold">A polished profile starts here.</h3><p className="mt-3 text-sm leading-6 text-slate-400">Update your headline, biography and profile image so visitors immediately understand what you do.</p><button onClick={() => onNavigate("profile")} className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-300 hover:text-white">Edit profile <FiArrowUpRight /></button></div></div></>; }
function Stat({ label, value, icon: Icon, accent }) { const accents = { indigo: "bg-indigo-500/10 text-indigo-300", fuchsia: "bg-fuchsia-500/10 text-fuchsia-300", cyan: "bg-cyan-500/10 text-cyan-300", emerald: "bg-emerald-500/10 text-emerald-300" }; return <div className="rounded-2xl border border-white/10 bg-[#11182b] p-5"><div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${accents[accent]}`}><Icon /></div><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-semibold">{value}</p></div>; }
function Collection({ module, rows, query, setQuery, onAdd, onEdit, onDelete }) { return <><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-sm text-slate-500">Organize and publish</p><h2 className="text-3xl font-semibold tracking-tight">{module.label}</h2><p className="mt-2 text-sm text-slate-400">{rows.length} existing {module.label.toLowerCase()} available to edit.</p></div><button onClick={onAdd} className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold hover:bg-indigo-400"><FiPlus /> New {module.singular}</button></div><div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#11182b] px-4 py-3"><FiSearch className="text-slate-500" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${module.label.toLowerCase()}...`} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600" /></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{rows.map(row => <article key={row.id} className="group rounded-2xl border border-white/10 bg-[#11182b] p-5 transition hover:-translate-y-0.5 hover:border-indigo-400/40"><div className="mb-5 flex items-start justify-between gap-4">{previewFor(row) ? <img src={assetUrl(previewFor(row))} alt={`${displayName(row)} preview`} className="h-16 w-20 rounded-xl object-cover" /> : <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-white/[.05] text-slate-600"><module.icon size={24} /></div>}<span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${row.published === false ? "bg-slate-700/40 text-slate-500" : "bg-emerald-400/10 text-emerald-300"}`}>{row.published === false ? "Draft" : "Live"}</span></div><h3 className="truncate text-lg font-semibold">{displayName(row)}</h3><p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-400">{row.description || row.category || row.organization || row.degree || row.url || "No description added yet."}</p><div className="mt-5 flex items-center justify-between border-t border-white/[.07] pt-4"><span className="text-xs text-slate-600">Updated {dateLabel(row.updatedAt)}</span><span className="flex gap-1 opacity-80"><button onClick={() => onEdit(row)} className="rounded-lg p-2 text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-300"><FiEdit3 /></button><button onClick={() => onDelete(row)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300"><FiTrash2 /></button></span></div></article>)}{!rows.length && <div className="col-span-full rounded-3xl border border-dashed border-white/10 py-20 text-center"><FiFolder className="mx-auto text-slate-600" size={30} /><p className="mt-4 font-medium">Nothing here yet</p><p className="mt-1 text-sm text-slate-500">Create your first {module.singular.toLowerCase()} to get started.</p></div>}</div></>; }
function ProfilePage({ profile, onEdit }) { return <><div className="mb-7 flex items-end justify-between"><div><p className="mb-2 text-sm text-slate-500">Public identity</p><h2 className="text-3xl font-semibold">Profile</h2></div><button onClick={onEdit} className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold hover:bg-indigo-400"><FiEdit3 /> Edit profile</button></div><div className="max-w-4xl rounded-3xl border border-white/10 bg-[#11182b] p-6 sm:p-8">{profile ? <div className="grid gap-8 md:grid-cols-[180px_1fr]"><div>{profile.photoKey ? <img src={assetUrl(profile.photoKey)} alt={profile.name} className="h-44 w-44 rounded-3xl object-cover" /> : <div className="flex h-44 w-44 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-300"><FiUser size={42} /></div>}<p className="mt-3 text-xs text-slate-600">Profile image preview</p></div><div><p className="text-3xl font-semibold">{profile.name}</p><p className="mt-2 text-lg text-indigo-300">{profile.title}</p><p className="mt-6 max-w-2xl whitespace-pre-wrap text-sm leading-7 text-slate-400">{profile.biography}</p><div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400"><span className="rounded-full bg-white/[.06] px-3 py-2">{profile.email}</span>{profile.location && <span className="rounded-full bg-white/[.06] px-3 py-2">{profile.location}</span>}</div></div></div> : <div className="py-16 text-center"><FiUser className="mx-auto text-slate-600" size={32} /><p className="mt-4">Your profile has not been created yet.</p><button onClick={onEdit} className="mt-4 text-sm text-indigo-300">Create profile</button></div>}</div></>; }
function Messages({ messages, onDelete }) { return <><div className="mb-7"><p className="mb-2 text-sm text-slate-500">Inbox</p><h2 className="text-3xl font-semibold">Messages</h2><p className="mt-2 text-sm text-slate-400">Keep track of conversations from your portfolio contact form.</p></div><div className="space-y-3">{messages.map(message => <article key={message.id} className="rounded-2xl border border-white/10 bg-[#11182b] p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2"><h3 className="font-semibold">{message.name}</h3>{!message.read && <span className="rounded-full bg-indigo-500/15 px-2 py-1 text-[10px] font-semibold uppercase text-indigo-300">New</span>}</div><a href={`mailto:${message.email}`} className="mt-1 block text-sm text-indigo-300 hover:text-white">{message.email}</a></div><div className="flex items-center gap-3 text-xs text-slate-600"><span>{dateLabel(message.createdAt)}</span><button onClick={() => onDelete(message.id)} className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"><FiTrash2 /></button></div></div>{message.subject && <p className="mt-5 text-sm font-medium text-slate-300">{message.subject}</p>}<p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-400">{message.message}</p></article>)}{!messages.length && <div className="rounded-3xl border border-dashed border-white/10 py-20 text-center"><FiMail className="mx-auto text-slate-600" size={30} /><p className="mt-4 font-medium">Your inbox is clear</p><p className="mt-1 text-sm text-slate-500">New contact form messages will appear here.</p></div>}</div></>; }
