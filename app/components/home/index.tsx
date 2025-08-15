import { Suspense } from "react";
import HeroSkeleton from "./hero/skeleton";
import AboutSkeleton from "./about/skeleton";
import SkillsSkeleton from "./skills/skeleton";
import ContactSkeleton from "./contact/skeleton";
import ProjectsSkeleton from "./projects/skeleton";
import ExperienceSkeleton from "./experience/skeleton";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./hero"), {
  loading: () => <HeroSkeleton />,
});
const About = dynamic(() => import("./about"), {
  loading: () => <AboutSkeleton />,
});
const Skills = dynamic(() => import("./skills"), {
  loading: () => <SkillsSkeleton />,
});
const Projects = dynamic(() => import("./projects"), {
  loading: () => <ProjectsSkeleton />,
});
const Experience = dynamic(() => import("./experience"), {
  loading: () => <ExperienceSkeleton />,
});
const Contact = dynamic(() => import("./contact"), {
  loading: () => <ContactSkeleton />,
});

const HomePageContent = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
};

export default HomePageContent;
