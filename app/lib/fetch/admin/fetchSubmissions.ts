export async function fetchSubmissions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
    cache: "force-cache",
    next: { tags: ["submissions"] },
  });
  if (!res.ok) throw new Error("Failed to fetch submissions");
  return res.json();
}
