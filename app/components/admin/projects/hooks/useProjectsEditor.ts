"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Project } from "@/app/types/shared/project/project";
import { updateProjects } from "../actions/updateProjects";
import { fetchProjectsClient } from "@/app/lib/fetch/fetchProjects";
import { useLang } from "@/app/context/langContext";
import { Lang } from "@/app/types/shared/lang/lang";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

export function useProjectsEditor() {
  const { lang } = useLang();
  const { t } = useTranslation("dashboard");

  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    () => `/projects?lang=${lang}`,
    () => fetchProjectsClient(lang as Lang)
  );

  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    if (data) setProjects(data);
  }, [data]);

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  const handleChange = <K extends keyof Project>(
    index: number,
    key: K,
    value: Project[K]
  ) => {
    if (!projects) return;
    const updated = [...projects];
    updated[index][key] = value;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects((prev) => [
      ...(prev || []),
      {
        id: uuidv4(),
        title: "New Project",
        description: "",
        image: "",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
      },
    ]);
  };

  const removeProject = (index: number) => {
    if (!projects) return;
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  const handleSave = async () => {
    if (!projects) return;
    try {
      await updateProjects(projects, lang as Lang);
      mutate();
      toast.success(t("projects.UpdateSuccess"));
    } catch (error) {
      toast.error(t("projects.UpdateError"));
    }
  };

  return {
    projects,
    error,
    isLoading,
    handleChange,
    handleSave,
    addProject,
    removeProject,
  };
}
