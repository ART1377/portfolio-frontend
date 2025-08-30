import { Lang } from "@/app/types/shared/lang/lang";

export async function fetchProjects(lang: Lang = "en") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects?lang=${lang}`,
    {
      cache: "force-cache",
      next: { tags: ["projects"] },
    }
  );
  return res.json();
}

export async function fetchProjectsClient(lang: Lang = "en") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects?lang=${lang}`
  );
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}
