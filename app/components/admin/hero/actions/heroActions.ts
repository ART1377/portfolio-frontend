"use server";

import { HeroData } from "@/app/types/shared/hero/heroData";
import { revalidateTag } from "next/cache";

export async function updateHeroInfo(data: HeroData, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update hero info");
  }

  revalidateTag("hero");
}
