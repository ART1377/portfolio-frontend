// hooks/useAboutForm.ts
import { useEffect, useState, useTransition } from "react";
import useSWR from "swr";
import { toast } from "react-hot-toast";
import { AboutData, Feature } from "@/app/types/shared/about/aboutData";
import { fetchAboutDataClient } from "@/app/lib/fetch/fetchAbout";
import { Lang } from "@/app/types/shared/lang/lang";
import { updateAboutData } from "../actions/aboutActions";
import { useLang } from "@/app/context/langContext";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { useTranslation } from "react-i18next";

export function useAboutForm() {
  const { lang } = useLang();
  const { t } = useTranslation("dashboard");

  const { data, error, isLoading, mutate } = useSWR<AboutData>(
    () => `/about?lang=${lang}`,
    () => fetchAboutDataClient(lang)
  );

  const [form, setForm] = useState<AboutData | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  const updateArrayItem = (
    field: keyof AboutData,
    index: number,
    value: string
  ) => {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addArrayItem = (field: keyof AboutData, value = "") => {
    setForm((prev) =>
      prev ? { ...prev, [field]: [...prev[field], value] } : null
    );
  };

  const removeArrayItem = (field: keyof AboutData, index: number) => {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev[field]];
      updated.splice(index, 1);
      return { ...prev, [field]: updated };
    });
  };

  const updateFeatureItem = (
    index: number,
    key: keyof Feature,
    value: string
  ) => {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.features];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, features: updated };
    });
  };

  const addFeature = () => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            features: [
              ...prev.features,
              { title: "", description: "", icon: "Zap" },
            ],
          }
        : null
    );
  };

  const removeFeature = (index: number) => {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.features];
      updated.splice(index, 1);
      return { ...prev, features: updated };
    });
  };

  const handleSave = () => {
    if (!form) return;
    startTransition(async () => {
      try {
        await updateAboutData(form, lang as Lang);
        toast.success(t("about.UpdateSuccess"));
        mutate();
      } catch {
        toast.error(t("about.UpdateError"));
      }
    });
  };

  return {
    form,
    isLoading,
    error,
    isPending,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    updateFeatureItem,
    addFeature,
    removeFeature,
    handleSave,
  };
}
