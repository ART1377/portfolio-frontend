import { Lang } from "@/app/types/shared/lang/lang";

export async function fetchExperiences(lang: Lang = "en") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/experiences?lang=${lang}`,
    {
      cache: "force-cache",
      next: { tags: ["experiences"] },
    }
  );
  return res.json();
}

export async function fetchExperiencesClient(lang: Lang = "en") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/experiences?lang=${lang}`
  );
  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}
