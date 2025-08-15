"use client";

import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { HomeIcon, User } from "lucide-react";
import { useHeroData } from "../hooks/useHeroData";
import { useResumeUploader } from "../hooks/useResumeUploader";
import HeroForm from "./form";
import ResumeUploader from "./resume-uploader";
import HeroEditorSkeleton from "../skeleton";
import { Lang } from "@/app/types/shared/lang/lang";
import { useTranslation } from "react-i18next";
import AdminSectionHeader from "../../admin-section-header";

export default function HeroEditor() {
  const { t } = useTranslation("dashboard");

  const {
    form,
    isLoading,
    error,
    isPending,
    handleChange,
    handleRolesChange,
    handleSave,
  } = useHeroData();

  const { resumeFiles, setResumeFile, handleResumeUpload, uploadProgress } =
    useResumeUploader();

  const langs: Lang[] = ["en", "fa"];

  if (isLoading) return <HeroEditorSkeleton />;
  if (error || !form)
    return <p className="text-red-500">{t("hero.LoadError")}</p>;

  return (
    <section className="section-container !max-w-5xl mx-auto p-4 md:p-6 space-y-8 my-10">
      {/* Header Card */}
      <AdminSectionHeader title={t("hero.Title")} />

      {/* Hero Form */}
      <HeroForm
        form={form}
        isPending={isPending}
        onChange={handleChange}
        onRolesChange={handleRolesChange}
        onSave={handleSave}
      />

      {/* Resume Uploader */}
      <ResumeUploader
        langs={langs}
        resumeFiles={resumeFiles}
        setResumeFile={setResumeFile}
        handleResumeUpload={handleResumeUpload}
        uploadProgress={uploadProgress}
      />
    </section>
  );
}
