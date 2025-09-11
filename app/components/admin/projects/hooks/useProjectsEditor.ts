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
import { useAuth } from "@/app/context/AuthContext";

export function useProjectsEditor() {
  const { lang } = useLang();
  const { t } = useTranslation("dashboard");
  const { token } = useAuth();

  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    () => `/projects?lang=${lang}`,
    () => fetchProjectsClient(lang as Lang)
  );

  const [projects, setProjects] = useState<Project[] | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setProjects(JSON.parse(JSON.stringify(data)));
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
        id: "new",
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

  // Move project up/down
  const moveProject = (fromIndex: number, toIndex: number) => {
    if (!projects || toIndex < 0 || toIndex >= projects.length) return;
    const updated = [...projects];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setProjects(updated);
  };

  const handleSave = async () => {
    if (!projects) return;
    try {
      setSaving(true);
      await updateProjects(projects, lang as Lang, token as string);
      mutate(projects, false);
      toast.success(t("projects.UpdateSuccess"));
    } catch {
      toast.error(t("projects.UpdateError"));
    } finally {
      setSaving(false);
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
    moveProject,
    saving,
  };
}
