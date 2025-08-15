"use client";

import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { AddButton, Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  Plus,
  Trash2,
  School,
  Calendar,
  FileText,
} from "lucide-react";

export default function EducationSection({
  data,
  onChange,
  onAdd,
  onRemove,
}: {
  data: any[];
  onChange: Function;
  onAdd: Function;
  onRemove: Function;
}) {
  const { t } = useTranslation("dashboard");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-400/20 dark:to-teal-400/20">
          <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          {t("experience.Education")}
        </h3>
      </div>

      <div className="grid gap-4">
        {data.map((item, idx) => {
          const baseId = `education-${idx}`;
          return (
            <Card
              key={idx}
              className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      {t("experience.Education")} #{idx + 1}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove("education", idx)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${baseId}-degree`}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <GraduationCap className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      {t("experience.Degree")}
                    </Label>
                    <Input
                      id={`${baseId}-degree`}
                      value={item.degree}
                      onChange={(e) =>
                        onChange("education", idx, "degree", e.target.value)
                      }
                      placeholder={t("experience.DegreePlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${baseId}-school`}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <School className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      {t("experience.School")}
                    </Label>
                    <Input
                      id={`${baseId}-school`}
                      value={item.school}
                      onChange={(e) =>
                        onChange("education", idx, "school", e.target.value)
                      }
                      placeholder={t("experience.SchoolPlaceholder")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-period`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <Calendar className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    {t("experience.Period")}
                  </Label>
                  <Input
                    id={`${baseId}-period`}
                    value={item.period}
                    onChange={(e) =>
                      onChange("education", idx, "period", e.target.value)
                    }
                    placeholder={t("experience.PeriodPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-description`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <FileText className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    {t("experience.Description")}
                  </Label>
                  <Textarea
                    id={`${baseId}-description`}
                    value={item.description}
                    onChange={(e) =>
                      onChange("education", idx, "description", e.target.value)
                    }
                    placeholder={t("experience.DescriptionPlaceholder")}
                    className="min-h-[80px] bg-transparent"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AddButton
        onClick={() =>
          onAdd("education", {
            degree: "",
            school: "",
            period: "",
            description: "",
          })
        }
        color="emerald"
      >
        {t("experience.Add")}
      </AddButton>
    </div>
  );
}
