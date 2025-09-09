'use client'

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Plus,
  X,
  Save,
  Trash2,
  Star,
  Code2,
  Palette,
  Database,
  Globe,
  Target,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import SkillsEditorSkeleton from "../skeleton";
import { useSkillsEditor } from "../hooks/useSkillsEditor";
import AdminSectionHeader from "../../admin-section-header";
import { useTranslation } from "react-i18next";
import { Progress } from "@/app/components/ui/progress";

const categoryIcons = {
  Frontend: Code2,
  Backend: Database,
  Design: Palette,
  Tools: Globe,
  Languages: Target,
  Other: Star,
};

export default function SkillsEditor() {
  const {
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
  } = useSkillsEditor();

  const { t } = useTranslation("dashboard");

  if (isLoading || !skillsData) return <SkillsEditorSkeleton />;
  if (error) return <p>{t("skills.error")}</p>;

  return (
    <section className="section-container my-10">
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-700/50 mx-auto max-w-5xl">
        <AdminSectionHeader title={t("skills.title")} />

        <CardContent className="space-y-12 p-4 md:p-6">
          {skillsData.map((category, catIdx) => {
            const IconComponent =
              categoryIcons[category.title as keyof typeof categoryIcons] ||
              Star;

            return (
              <div key={catIdx} className="rounded-lg border gap-y-4">
                {/* Category header */}
                <div className="flex items-center justify-between mb-4 flex-wrap-reverse">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-gradient rounded-lg text-white">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <Input
                      value={category.title}
                      onChange={(e) =>
                        handleCategoryChange(catIdx, e.target.value)
                      }
                      className="text-lg font-semibold border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-foreground"
                    />
                  </div>

                  <div className="flex gap-1 ms-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveCategory(catIdx, catIdx - 1)}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveCategory(catIdx, catIdx + 1)}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCategory(catIdx)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div
                      key={skillIdx}
                      className="p-3 bg-gradient-to-r from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-lg border border-gray-100 dark:border-slate-600"
                    >
                      <div className="flex flex-wrap-reverse items-center gap-2 mb-3">
                        <Input
                          value={skill.name}
                          onChange={(e) =>
                            handleSkillChange(
                              catIdx,
                              skillIdx,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder={t("skills.skillName")}
                          className="flex-1 bg-background text-foreground min-w-24"
                        />
                        <Input
                          type="number"
                          value={skill.level}
                          onChange={(e) =>
                            handleSkillChange(
                              catIdx,
                              skillIdx,
                              "level",
                              +e.target.value
                            )
                          }
                          placeholder={t("skills.skillLevel")}
                          min={0}
                          max={100}
                          className="w-16 bg-background text-foreground"
                        />
                        <div className="flex gap-1 ms-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              moveSkill(catIdx, skillIdx, skillIdx - 1)
                            }
                          >
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              moveSkill(catIdx, skillIdx, skillIdx + 1)
                            }
                          >
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(catIdx, skillIdx)}
                            className="text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {skill.level > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                            <span>{t("skills.proficiency")}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => addSkill(catIdx)}
                    className="w-full border-dashed border-2 border-gray-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t("skills.addSkill")}
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>

        {/* Footer */}
        <CardContent className="flex flex-wrap gap-4 justify-center pt-6 border-t border-border/50">
          <Button onClick={addCategory} variant="outline" className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            {t("skills.addCategory")}
          </Button>

          <Button
            variant="gradient"
            onClick={handleSave}
            disabled={saving}
            isLoading={saving}
            className="flex-1"
          >
            {saving ? (
              <div className="flex items-center gap-2">
                {t("skills.saving")}
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t("skills.save")}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
