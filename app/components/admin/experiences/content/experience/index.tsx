"use client";

import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { AddButton, Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { useTranslation } from "react-i18next";
import ChipsInput from "@/app/components/chips-input";
import { Briefcase, Plus, Trash2, Calendar, FileText } from "lucide-react";

export default function ExperienceSection({
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
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-400/20 dark:to-indigo-400/20">
          <Briefcase className="h-5 w-5 text-blue-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          {t("experience.Experiences")}
        </h3>
      </div>

      <div className="grid gap-4">
        {data.map((item, idx) => {
          const baseId = `experience-${idx}`;
          return (
            <Card
              key={idx}
              className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-600 dark:text-indigo-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-indigo-300">
                      {t("experience.Experience")} #{idx + 1}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove("experiences", idx)}
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
                      htmlFor={`${baseId}-title`}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <Briefcase className="h-3 w-3 text-blue-600 dark:text-indigo-400" />
                      {t("experience.TitlePlaceholder")}
                    </Label>
                    <Input
                      id={`${baseId}-title`}
                      value={item.title}
                      onChange={(e) =>
                        onChange("experiences", idx, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${baseId}-company`}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <Briefcase className="h-3 w-3 text-blue-600 dark:text-indigo-400" />
                      {t("experience.Company")}
                    </Label>
                    <Input
                      id={`${baseId}-company`}
                      value={item.company}
                      onChange={(e) =>
                        onChange("experiences", idx, "company", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-period`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <Calendar className="h-3 w-3 text-blue-600 dark:text-indigo-400" />
                    {t("experience.Period")}
                  </Label>
                  <Input
                    id={`${baseId}-period`}
                    value={item.period}
                    onChange={(e) =>
                      onChange("experiences", idx, "period", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-description`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <FileText className="h-3 w-3 text-blue-600 dark:text-indigo-400" />
                    {t("experience.Description")}
                  </Label>
                  <Textarea
                    id={`${baseId}-description`}
                    value={item.description}
                    onChange={(e) =>
                      onChange(
                        "experiences",
                        idx,
                        "description",
                        e.target.value
                      )
                    }
                    className="min-h-[80px] bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-technologies`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <Briefcase className="h-3 w-3 text-blue-600 dark:text-indigo-400" />
                    {t("experience.Technologies")}
                  </Label>
                  <ChipsInput
                    values={item.technologies}
                    onChange={(newValues) =>
                      onChange("experiences", idx, "technologies", newValues)
                    }
                    placeholder={t("experience.Technologies")}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AddButton
        onClick={() =>
          onAdd("experiences", {
            title: "",
            company: "",
            period: "",
            description: "",
            technologies: [],
          })
        }
        color="blue"
      >
        {t("experience.Add")}
      </AddButton>
    </div>
  );
}
