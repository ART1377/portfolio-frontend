"use server";

import { revalidateTag } from "next/cache";

export async function updateHeroInfo(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update hero info");
  }

  revalidateTag("hero");
}
