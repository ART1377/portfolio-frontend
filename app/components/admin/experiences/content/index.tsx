"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import AdminSectionHeader from "../../admin-section-header";
import { useTranslation } from "react-i18next";
import ExperienceEditorSkeleton from "../skeleton";
import { useExperienceForm } from "../hooks/useExperienceForm";
import { Briefcase, Save, Loader2 } from "lucide-react";

import ExperienceSection from "./experience";
import EducationSection from "./education";
import CourseSection from "./course";

export default function ExperienceEditor() {
  const {
    formData,
    isLoading,
    error,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    handleSave,
  } = useExperienceForm();

  const { t } = useTranslation("dashboard");

  if (isLoading || !formData) return <ExperienceEditorSkeleton />;
  if (error)
    return <p className="text-red-500">{t("experience.UpdateError")}</p>;

  return (
    <section className="max-w-5xl mx-auto my-10">
      <Card className="border-0 bg-gradient-to-br from-slate-50/50 to-gray-50/50 dark:from-slate-950/50 dark:to-gray-950/50 shadow-lg">
        <AdminSectionHeader title={t("experience.Title")} />
        <CardContent className="p-4 md:p-6 space-y-12">
          <ExperienceSection
            data={formData.experiences}
            onChange={handleChange}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />

          <EducationSection
            data={formData.education}
            onChange={handleChange}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />

          <CourseSection
            data={formData.courses}
            onChange={handleChange}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />

          <div className="flex justify-end pt-6 border-t border-border/50">
            <Button
              variant={"gradient"}
              onClick={handleSave}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("experience.Saving")}...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {t("experience.Save")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
