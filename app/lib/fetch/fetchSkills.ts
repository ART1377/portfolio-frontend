export async function fetchSkills(lang = "en") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills?lang=${lang}`, {
    cache: "force-cache",
    next: { tags: ["skills"] },
  });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export const fetchSkillsClient = async (lang = "en") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills?lang=${lang}`);
  if (!res.ok) throw new Error("Failed to fetch hero data");
  return res.json();
};
