"use server";

import { revalidateTag } from "next/cache";

export async function deleteSubmissionById(id: number | string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete submission");
  }

  revalidateTag("submissions");
}
