"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { AddButton, Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import {
  FileText,
  Lightbulb,
  Star,
  Plus,
  Minus,
  Save,
  Loader2,
} from "lucide-react";
import { useAboutForm } from "../hooks/useAboutForm";
import AdminSectionHeader from "../../admin-section-header";
import { useTranslation } from "react-i18next";
import AboutEditorSkeleton from "../skeleton";

export default function AboutEditor() {
  const {
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
  } = useAboutForm();

  const { t } = useTranslation("dashboard");

  if (isLoading) return <AboutEditorSkeleton />;
  if (error || !form)
    return (
      <p className="text-red-600 dark:text-red-400">{t("about.UpdateError")}</p>
    );

  return (
    <section className="section-container my-10">
      <Card className="max-w-5xl mx-auto border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-900 dark:to-slate-800">
        {/* Main Header */}
        <AdminSectionHeader title={t("hero.Title")} />

        {/* Card Content */}
        <CardContent className="space-y-8 p-4 md:p-6">
          {/* Description Sub-Card */}
          <div className="p-4 bg-white/50 dark:bg-slate-700/40 rounded-lg border border-gray-200 dark:border-slate-600 space-y-4 shadow-sm">
            <CardTitle className="flex items-center gap-3 text-lg text-slate-800 dark:text-slate-200 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white">
                <FileText className="w-5 h-5" />
              </div>
              {t("about.Description")}
            </CardTitle>

            {form.description.map((desc, i) => (
              <div key={i} className="space-y-2">
                <Input
                  value={desc}
                  onChange={(e) =>
                    updateArrayItem("description", i, e.target.value)
                  }
                  placeholder={t("about.EnterDescription")}
                  className="w-full border-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem("description", i)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <AddButton color="blue" onClick={() => addArrayItem("description")}>
              {t("about.AddDescription")}
            </AddButton>
          </div>

          {/* Skills Sub-Card */}
          <div className="p-4 bg-white/50 dark:bg-slate-700/40 rounded-lg border border-gray-200 dark:border-slate-600 space-y-4 shadow-sm">
            <CardTitle className="flex items-center gap-3 text-lg text-slate-800 dark:text-slate-200 mb-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg text-white">
                <Star className="w-5 h-5" />
              </div>
              {t("about.Skills")}
            </CardTitle>

            {form.skills.map((skill, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateArrayItem("skills", i, e.target.value)}
                  placeholder={t("about.EnterSkill")}
                  className="flex-1 border-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem("skills", i)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <AddButton color="emerald" onClick={() => addArrayItem("skills")}>
              {t("about.AddSkill")}
            </AddButton>
          </div>

          {/* Features Sub-Card */}
          <div className="p-4 bg-white/50 dark:bg-slate-700/40 rounded-lg border border-gray-200 dark:border-slate-600 space-y-4 shadow-sm">
            <CardTitle className="flex items-center gap-3 text-lg text-slate-800 dark:text-slate-200 mb-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg text-white">
                <Lightbulb className="w-5 h-5" />
              </div>
              {t("about.Features")}
            </CardTitle>

            {form.features.map((feature, i) => (
              <div
                key={i}
                className="p-4 border border-slate-200 rounded-lg bg-white/50 dark:bg-slate-700/40 dark:border-slate-600 space-y-3"
              >
                <Input
                  value={feature.title}
                  placeholder={t("about.FeatureTitlePlaceholder")}
                  onChange={(e) =>
                    updateFeatureItem(i, "title", e.target.value)
                  }
                  className="w-full border-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                />
                <Textarea
                  value={feature.description}
                  placeholder={t("about.FeatureDescriptionPlaceholder")}
                  onChange={(e) =>
                    updateFeatureItem(i, "description", e.target.value)
                  }
                  className="w-full border-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                />
                <Input
                  value={feature.icon}
                  placeholder={t("about.IconPlaceholder")}
                  onChange={(e) => updateFeatureItem(i, "icon", e.target.value)}
                  className="w-full border-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFeature(i)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <AddButton color="purple" onClick={addFeature}>
              {t("about.AddFeature")}
            </AddButton>
          </div>
        </CardContent>

        {/* Footer Save Button */}
        <CardContent className="flex justify-center border-t border-border/50 pt-4">
          <Button
            variant={"gradient"}
            onClick={handleSave}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t("about.SavingChanges")}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t("about.Save")}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
