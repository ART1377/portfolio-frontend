import React from "react";
import { fetchAboutData } from "@/app/lib/fetch/fetchAbout";
import { getCurrentLang } from "@/app/lib/language/getCurrentLang";
import AboutContent from "./content";

const About = async () => {
  const lang =await getCurrentLang();
  const about = await fetchAboutData(lang as "en" | "fa");
  return (
    <AboutContent
      description={about.description}
      skills={about.skills}
      features={about.features}
    />
  );
};

export default About;
