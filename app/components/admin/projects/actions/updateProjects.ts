"use server";

import { Project } from "@/app/types/shared/project/project";
import { revalidateTag } from "next/cache";
import { Lang } from "@/app/types/shared/lang/lang";

export async function updateProjects(data: Project[], lang: Lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects?lang=${lang}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update projects");
  }

  revalidateTag("projects");
}
