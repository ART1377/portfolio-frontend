// app/actions/contact/submitContactForm.ts
"use server";

import { revalidateTag } from "next/cache";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to submit submissions form");
  }

  revalidateTag("submissions");
}
