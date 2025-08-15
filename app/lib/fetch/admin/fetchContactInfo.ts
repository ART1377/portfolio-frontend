
export async function fetchContactInfo(lang: "en" | "fa" = "en") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-info?lang=${lang}`, {
    cache: "force-cache",
    next: { tags: ["contact-info"] },
  });
  return res.json();
}

export async function fetchContactInfoClient(lang: "en" | "fa" = "en") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-info?lang=${lang}`);
  if (!res.ok) throw new Error("Failed to fetch contact info");
  return res.json();
}
