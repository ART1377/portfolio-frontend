export async function fetchSuggestions(): Promise<
  { id: string; name: string }[]
> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestions`, {
    cache: "no-store",
    next: { tags: ["suggestion"] },
  });

  if (!res.ok) throw new Error("Failed to fetch suggestions");

  return res.json();
}
