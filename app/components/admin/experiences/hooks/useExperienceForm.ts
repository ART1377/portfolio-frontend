import { useEffect, useState } from "react";
import useSWR from "swr";
import { ExperienceData } from "@/app/types/shared/experience/experience";
import toast from "react-hot-toast";
import { updateExperiences } from "../actions/updateExperiences";
import { useLang } from "@/app/context/langContext";
import { fetchExperiencesClient } from "@/app/lib/fetch/fetchExperiences";
import { Lang } from "@/app/types/shared/lang/lang";
import { useTranslation } from "react-i18next";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";

export function useExperienceForm() {
  const { lang } = useLang();
  const { t } = useTranslation("dashboard");

  const { data, error, isLoading, mutate } = useSWR<ExperienceData>(
    () => `/experience?lang=${lang}`,
    () => fetchExperiencesClient(lang as Lang)
  );

  const [formData, setFormData] = useState<ExperienceData | null>(null);

  useEffect(() => {
    if (data) setFormData(data);
  }, [data, formData]);

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  const handleChange = <K extends keyof ExperienceData>(
    key: K,
    index: number,
    field: keyof ExperienceData[K][0],
    value: any
  ) => {
    if (!formData) return;
    const updated = { ...formData };
    (updated[key] as any)[index][field] = value;
    setFormData(updated);
  };

  const handleAddItem = <K extends keyof ExperienceData>(
    key: K,
    newItem: ExperienceData[K][0]
  ) => {
    if (!formData) return;
    const updated = { ...formData };
    (updated[key] as any).push(newItem);
    setFormData(updated);
  };

  const handleRemoveItem = <K extends keyof ExperienceData>(
    key: K,
    index: number
  ) => {
    if (!formData) return;
    const updated = { ...formData };
    (updated[key] as any).splice(index, 1);
    setFormData(updated);
  };

  const handleSave = async () => {
    if (!formData) return;
    try {
      await updateExperiences(formData, lang as Lang);
      mutate();
      toast.success(t("experience.UpdateSuccess"));
    } catch {
      toast.error(t("experience.UpdateError"));
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    handleSave,
  };
}
