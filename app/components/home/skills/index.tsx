import { fetchSkills } from "@/app/lib/fetch/fetchSkills";
import React from "react";
import { SkillsContent } from "./content";
import { getCurrentLang } from "@/app/lib/language/getCurrentLang";

const Skills = async () => {
  const lang = await getCurrentLang();
  const skills = await fetchSkills(lang);

  return <SkillsContent skills={skills} />;
};

export default Skills;
