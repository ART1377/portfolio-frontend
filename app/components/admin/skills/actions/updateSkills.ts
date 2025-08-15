"use server";

import { SkillCategory } from "@/app/types/shared/skill/skill";
import { revalidateTag } from "next/cache";

export async function updateSkillsData(
  data: SkillCategory[],
  lang: "en" | "fa"
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/skills?lang=${lang}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update skills");
  }

  revalidateTag("skills");
}
