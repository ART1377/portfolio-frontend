"use server";

import { revalidateTag } from "next/cache";

export async function addSuggestion(name: string) {
  if (!name.trim()) return;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Failed to add suggestion");
  const newItem = await res.json();

  revalidateTag("suggestion");
  return newItem;
}

// Delete a suggestion
export async function deleteSuggestion(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/suggestions/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Failed to delete suggestion");
  revalidateTag("suggestion");
}
