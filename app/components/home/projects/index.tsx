import React from "react";
import { ProjectsContent } from "./content";
import { fetchProjects } from "@/app/lib/fetch/fetchProjects";
import { getCurrentLang } from "@/app/lib/language/getCurrentLang";
import { Lang } from "@/app/types/shared/lang/lang";

const Projects = async () => {
  const lang = await getCurrentLang();
  const projects = await fetchProjects(lang as Lang);

  return <ProjectsContent projects={projects} />;
};

export default Projects;
