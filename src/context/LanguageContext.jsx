import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "om", name: "Afaan Oromoo", nativeName: "Afaan Oromoo", flag: "🇪🇹" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹" },
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("portfolio-language");
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  const translate = (translations) => {
    if (!translations) return "";
    return translations[language] || translations.en || "";
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translate, LANGUAGES }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export { LANGUAGES };
