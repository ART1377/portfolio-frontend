"use server";

import { AboutData } from "@/app/types/shared/about/aboutData";
import { revalidateTag } from "next/cache";

export async function updateAboutData(data: AboutData, lang: "en" | "fa") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/about?lang=${lang}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update About data");
  }

  revalidateTag("about");
}
