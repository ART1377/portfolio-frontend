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

export function useSkillsEditor() {
  const { lang } = useLang();
  const { t } = useTranslation("dashboard");

  const { data, error, isLoading, mutate } = useSWR<SkillCategory[]>(
    () => `/skills?lang=${lang}`,
    () => fetchSkillsClient(lang)
  );

  const [skillsData, setSkillsData] = useState<SkillCategory[] | null>(null);

  // Sync SWR data to local state
  useEffect(() => {
    if (data) setSkillsData(data);
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

    if (key === "level" && typeof value === "number") {
      skill[key] = value;
    } else if (key === "name" && typeof value === "string") {
      skill[key] = value;
    }

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

  const handleSave = async () => {
    if (!skillsData) return;
    try {
      await updateSkillsData(skillsData, lang as Lang);
      mutate(); 
      toast.success(t("skills.successUpdate"));
    } catch {
      toast.error(t("skills.errorUpdate"));
    }
  };

  return {
    skillsData,
    isLoading,
    error,
    handleCategoryChange,
    handleSkillChange,
    addCategory,
    addSkill,
    removeCategory,
    removeSkill,
    handleSave,
  };
}
