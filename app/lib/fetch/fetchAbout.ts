export async function fetchAboutData(lang: "en" | "fa" = "en") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/about?lang=${lang}`,
    {
      cache: "force-cache",
      next: { tags: ["about"] },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch About data");
  return res.json();
}

export async function fetchAboutDataClient(lang = "en") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/about?lang=${lang}`
  );
  if (!res.ok) throw new Error("Failed to fetch about data");
  return res.json();
}
