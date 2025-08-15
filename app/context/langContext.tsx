"use client";
import { createContext, useContext, useState, useEffect } from "react";
import i18n from "../lib/language/i18n";
import { useRouter } from "next/navigation";
import { Lang } from "../types/shared/lang/lang";

// TypeScript interface for context value
interface LangContextType {
  lang: string;
  dir: "ltr" | "rtl";
  setLang: (lang: "en" | "fa") => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  dir: "ltr",
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, _setLang] = useState<Lang>("en");
  const router = useRouter();

useEffect(() => {
  const stored = (localStorage.getItem("lang") as "en" | "fa") || "en";
  if (stored !== lang) {
    updateLang(stored, false); 
  }
}, []);

const updateLang = (newLang: "en" | "fa", refresh = true) => {
  localStorage.setItem("lang", newLang);
  document.cookie = `i18next=${newLang}; path=/; max-age=31536000`;
  document.dir = newLang === "fa" ? "rtl" : "ltr";
  document.documentElement.setAttribute("lang", newLang);
  i18n.changeLanguage(newLang);
  _setLang(newLang);
  if (refresh) router.refresh();
};


  return (
    <LangContext.Provider
      value={{
        lang,
        dir: lang === "fa" ? "rtl" : "ltr",
        setLang: updateLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};
