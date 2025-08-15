export async function fetchHeroData(lang = "en") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero?lang=${lang}`, {
    cache: "force-cache",
    next: { tags: ["hero"] },
  });
  if (!res.ok) throw new Error("Failed to fetch hero data");
  return res.json();
}

export const fetchHeroDataClient = async (lang = "en") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero?lang=${lang}`);
  if (!res.ok) throw new Error("Failed to fetch hero data");
  return res.json();
};
