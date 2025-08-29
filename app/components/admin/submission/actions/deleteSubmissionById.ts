"use server";

import { revalidateTag } from "next/cache";

export async function deleteSubmissionById(id: number | string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/submissions/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete submission");
  }

  revalidateTag("submissions");
}
