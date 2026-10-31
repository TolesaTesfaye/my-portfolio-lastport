import { boolean, index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const admins = pgTable("admins", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  ...timestamps,
});
export const profiles = pgTable("profiles", { id: text("id").primaryKey(), name: text("name").notNull(), title: text("title").notNull(), biography: text("biography").notNull(), email: text("email").notNull(), phone: text("phone"), location: text("location"), photoKey: text("photo_key"), resumeKey: text("resume_key"), ...timestamps });
export const skills = pgTable("skills", { id: text("id").primaryKey(), name: text("name").notNull(), category: text("category").notNull(), proficiency: integer("proficiency").notNull(), icon: text("icon"), displayOrder: integer("display_order").notNull().default(0), published: boolean("published").notNull().default(true), ...timestamps }, (t: any) => [index("skills_order_idx").on(t.displayOrder)]);
export const experiences = pgTable("experiences", { id: text("id").primaryKey(), position: text("position").notNull(), organization: text("organization").notNull(), employmentType: text("employment_type"), description: text("description").notNull(), startDate: text("start_date").notNull(), endDate: text("end_date"), currentlyWorking: boolean("currently_working").notNull().default(false), location: text("location"), published: boolean("published").notNull().default(true), ...timestamps });
export const projects = pgTable("projects", { id: text("id").primaryKey(), title: text("title").notNull(), description: text("description").notNull(), imageKey: text("image_key"), githubUrl: text("github_url"), liveUrl: text("live_url"), featured: boolean("featured").notNull().default(false), displayOrder: integer("display_order").notNull().default(0), published: boolean("published").notNull().default(true), ...timestamps }, (t: any) => [index("projects_order_idx").on(t.displayOrder)]);
export const projectTechnologies = pgTable("project_technologies", { id: text("id").primaryKey(), projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }), technology: text("technology").notNull() }, (t: any) => [index("project_technologies_project_idx").on(t.projectId)]);
export const education = pgTable("education", { id: text("id").primaryKey(), institution: text("institution").notNull(), degree: text("degree").notNull(), fieldOfStudy: text("field_of_study"), startDate: text("start_date"), endDate: text("end_date"), description: text("description"), published: boolean("published").notNull().default(true), ...timestamps });
export const certificates = pgTable("certificates", { id: text("id").primaryKey(), title: text("title").notNull(), issuer: text("issuer").notNull(), issueDate: text("issue_date"), credentialUrl: text("credential_url"), fileKey: text("file_key"), description: text("description"), published: boolean("published").notNull().default(true), ...timestamps });
export const socialLinks = pgTable("social_links", { id: text("id").primaryKey(), platform: text("platform").notNull(), url: text("url").notNull(), displayOrder: integer("display_order").notNull().default(0), published: boolean("published").notNull().default(true), ...timestamps });
export const contactMessages = pgTable("contact_messages", { id: text("id").primaryKey(), name: text("name").notNull(), email: text("email").notNull(), subject: text("subject"), message: text("message").notNull(), read: boolean("read").notNull().default(false), ...timestamps }, (t: any) => [index("messages_created_idx").on(t.createdAt)]);
