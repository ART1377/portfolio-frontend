import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      import(`@/app/locales/${language}/${namespace}.json`) // ✅ use @ alias
    )
  )
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'fa'],
    ns: ['common', 'hero', 'about', 'skills'],
    defaultNS: 'common',
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
