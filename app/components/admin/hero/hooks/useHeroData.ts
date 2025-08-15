import { useState, useEffect, useTransition } from "react";
import useSWR from "swr";
import * as actions from "../actions/heroActions";
import { HeroData } from "@/app/types/shared/hero/heroData";
import { toast } from "react-hot-toast";
import { fetchHeroDataClient } from "@/app/lib/fetch/fetchHero";
import { Lang } from "@/app/types/shared/lang/lang";
import { useLang } from "@/app/context/langContext";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { useTranslation } from "react-i18next";

export function useHeroData() {
  const { lang } = useLang();
  const { t } = useTranslation("dashboard");

  const { data, error, isLoading, mutate } = useSWR<HeroData>(
    () => `/hero?lang=${lang}`,
    () => fetchHeroDataClient(lang)
  );

  const [form, setForm] = useState<HeroData | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data) setForm({ ...data, lang } as HeroData & { lang: Lang });
  }, [data, lang]);

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roles = e.target.value.split(",").map((r) => r.trim());
    setForm((prev) => (prev ? { ...prev, roles } : null));
  };

  const handleSave = () => {
    if (!form) return;

    startTransition(async () => {
      try {
        await actions.updateHeroInfo(form);
        toast.success(t("hero.UpdateSuccess"));
        mutate();
      } catch (err) {
        toast.error(t("hero.UpdateError"));
      }
    });
  };

  return {
    form,
    setForm,
    isLoading,
    error,
    isPending,
    handleChange,
    handleRolesChange,
    handleSave,
  };
}
