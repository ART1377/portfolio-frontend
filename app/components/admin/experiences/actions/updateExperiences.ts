"use server";

import { revalidateTag } from "next/cache";
import { ExperienceData } from "@/app/types/shared/experience/experience";
import { Lang } from "@/app/types/shared/lang/lang";

export async function updateExperiences(
  data: ExperienceData,
  lang: Lang = "en"
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/experiences?lang=${lang}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update experiences");
  }

  revalidateTag("experiences");
}
