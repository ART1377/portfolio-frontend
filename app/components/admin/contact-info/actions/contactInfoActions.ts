"use server";

import { ContactInfo } from "@/app/types/shared/contact/contactInfo";
import { Lang } from "@/app/types/shared/lang/lang";
import { revalidateTag } from "next/cache";

export async function updateContactInfo(data: ContactInfo, lang: Lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/contact-info?lang=${lang}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update contact info");
  }

  revalidateTag(`contact-info`);
}
