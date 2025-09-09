"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Skill, SkillCategory } from "@/app/types/shared/skill/skill";
import { updateSkillsData } from "../actions/updateSkills";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { fetchSkillsClient } from "@/app/lib/fetch/fetchSkills";
import { useLang } from "@/app/context/langContext";
import { useTranslation } from "react-i18next";
import { Lang } from "@/app/types/shared/lang/lang";
import { useAuth } from "@/app/context/AuthContext";

export function useSkillsEditor() {
  const { lang } = useLang();
  const { t } = useTranslation("dashboard");
  const { token } = useAuth();

  const { data, error, isLoading, mutate } = useSWR<SkillCategory[]>(
    () => `/skills?lang=${lang}`,
    () => fetchSkillsClient(lang)
  );

  const [skillsData, setSkillsData] = useState<SkillCategory[] | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setSkillsData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  // Save on Enter
  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  const handleCategoryChange = (index: number, value: string) => {
    if (!skillsData) return;
    const updated = [...skillsData];
    updated[index].title = value;
    setSkillsData(updated);
  };

  const handleSkillChange = (
    catIdx: number,
    skillIdx: number,
    key: keyof Skill,
    value: string | number
  ) => {
    if (!skillsData) return;
    const updated = [...skillsData];
    const skill = updated[catIdx].skills[skillIdx];

    if (key === "level" && typeof value === "number") skill[key] = value;
    if (key === "name" && typeof value === "string") skill[key] = value;

    setSkillsData(updated);
  };

  const addCategory = () => {
    setSkillsData((prev) => [
      ...(prev || []),
      { title: "New Category", skills: [{ name: "New Skill", level: 0 }] },
    ]);
  };

  const addSkill = (index: number) => {
    const updated = [...(skillsData || [])];
    updated[index].skills.push({ name: "New Skill", level: 0 });
    setSkillsData(updated);
  };

  const removeCategory = (index: number) => {
    const updated = [...(skillsData || [])];
    updated.splice(index, 1);
    setSkillsData(updated);
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    const updated = [...(skillsData || [])];
    updated[catIdx].skills.splice(skillIdx, 1);
    setSkillsData(updated);
  };

  // Move category up/down
  const moveCategory = (fromIndex: number, toIndex: number) => {
    if (!skillsData || toIndex < 0 || toIndex >= skillsData.length) return;
    const updated = [...skillsData];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setSkillsData(updated);
  };

  // Move skill up/down
  const moveSkill = (catIdx: number, skillIdx: number, newIndex: number) => {
    if (!skillsData) return;
    const skills = [...skillsData[catIdx].skills];
    if (newIndex < 0 || newIndex >= skills.length) return;
    const [moved] = skills.splice(skillIdx, 1);
    skills.splice(newIndex, 0, moved);
    const updated = [...skillsData];
    updated[catIdx].skills = skills;
    setSkillsData(updated);
  };

  const handleSave = async () => {
    if (!skillsData) return;
    try {
      setSaving(true);
      await updateSkillsData(skillsData, lang as Lang, token as string);
      mutate(skillsData, false);
      toast.success(t("skills.successUpdate"));
    } catch {
      toast.error(t("skills.errorUpdate"));
    } finally {
      setSaving(false);
    }
  };

  return {
    skillsData,
    isLoading,
    error,
    saving,
    handleCategoryChange,
    handleSkillChange,
    addCategory,
    addSkill,
    removeCategory,
    removeSkill,
    moveCategory,
    moveSkill,
    handleSave,
  };
}
