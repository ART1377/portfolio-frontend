import React from "react";
import { ContactContent } from "./content";
import { fetchContactInfo } from "@/app/lib/fetch/admin/fetchContactInfo";
import { getCurrentLang } from "@/app/lib/language/getCurrentLang";
import { Lang } from "@/app/types/shared/lang/lang";

const Content = async () => {
  const lang = await getCurrentLang();
  const contactInfo = await fetchContactInfo(lang as Lang);

  return <ContactContent contactInfoData={contactInfo} />;
};

export default Content;
