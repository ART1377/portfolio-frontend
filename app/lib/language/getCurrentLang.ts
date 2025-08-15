// app/lib/i18n/getCurrentLang.ts
import { cookies } from "next/headers";

// ✅ No async/await needed
export async function getCurrentLang(): Promise<string> {
  const cookieStore = await cookies(); // sync in App Router server components
  const lang = cookieStore.get("i18next")?.value || "en";

  return lang;
}
