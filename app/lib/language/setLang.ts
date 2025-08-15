// utils/setLang.ts (client-side)
export const setLanguage = (lang: string) => {
  localStorage.setItem("lang", lang); // still used by client
  document.cookie = `i18next=${lang}; path=/; max-age=31536000`; // <-- server sees this
};
