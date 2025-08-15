"use client";

import { Input } from "@/app/components/ui/input";
import { AddButton, Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { useTranslation } from "react-i18next";
import { BookOpen, Plus, Trash2, Building, Calendar } from "lucide-react";

export default function CourseSection({
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
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-400/20 dark:to-pink-400/20">
          <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          {t("experience.Courses")}
        </h3>
      </div>

      <div className="grid gap-4">
        {data.map((item, idx) => {
          const baseId = `course-${idx}`;
          return (
            <Card
              key={idx}
              className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      {t("experience.Course")} #{idx + 1}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove("courses", idx)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-name`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <BookOpen className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                    {t("experience.CourseName")}
                  </Label>
                  <Input
                    id={`${baseId}-name`}
                    value={item.name}
                    onChange={(e) =>
                      onChange("courses", idx, "name", e.target.value)
                    }
                    placeholder={t("experience.CourseNamePlaceholder")}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${baseId}-org`}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <Building className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                      {t("experience.Organization")}
                    </Label>
                    <Input
                      id={`${baseId}-org`}
                      value={item.org}
                      onChange={(e) =>
                        onChange("courses", idx, "org", e.target.value)
                      }
                      placeholder={t("experience.OrganizationPlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${baseId}-year`}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <Calendar className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                      {t("experience.Year")}
                    </Label>
                    <Input
                      id={`${baseId}-year`}
                      value={item.year}
                      onChange={(e) =>
                        onChange("courses", idx, "year", e.target.value)
                      }
                      placeholder={t("experience.YearPlaceholder")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AddButton
        onClick={() => onAdd("courses", { name: "", org: "", year: "" })}
        color="purple"
      >
        {t("experience.Add")}
      </AddButton>
    </div>
  );
}
