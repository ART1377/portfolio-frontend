import { fetchExperiences } from "@/app/lib/fetch/fetchExperiences";
import React from "react";
import { ExperienceContent } from "./content";
import { getCurrentLang } from "@/app/lib/language/getCurrentLang";
import { Lang } from "@/app/types/shared/lang/lang";

const Experience = async () => {
  const lang = await getCurrentLang(); 
  const experiences = await fetchExperiences(lang as Lang);

  return <ExperienceContent data={experiences} />;
};

export default Experience;
