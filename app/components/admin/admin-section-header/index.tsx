"use client";

import React from "react";
import { CardHeader, CardTitle } from "../../ui/card";
import { useLang } from "@/app/context/langContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useTranslation } from "react-i18next";
import { cn } from "@/app/lib/utils/cn/cn";

type Props = {
  title: string;
  IconComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
};

const AdminSectionHeader = ({ title, IconComponent, className }: Props) => {
  const { dir, lang, setLang } = useLang();
  const { t } = useTranslation("dashboard");

  return (
    <CardHeader
      className={cn(
        "flex flex-row justify-between items-center p-4 md:p-6 bg-gradient-to-r from-slate-100/50 to-gray-100/50 dark:from-slate-700/50 dark:to-gray-800/50 border-b border-border/50 w-full mb-6",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {IconComponent && (
          <div className="p-2 rounded-lg bg-gradient-to-br from-slate-500/20 to-gray-500/20 dark:from-slate-400/20 dark:to-gray-400/20">
            <IconComponent className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
        )}
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold break-words">
          {title}
        </CardTitle>
      </div>

      <Select
        value={lang}
        onValueChange={(value: "en" | "fa") => setLang(value)}
      >
        <SelectTrigger
          className={`w-[140px] ${
            lang === "fa" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <SelectValue placeholder={t("language.SelectLanguage")} />
        </SelectTrigger>
        <SelectContent dir={dir}>
          <SelectItem className="text-start" value="en">
            {t("language.English")}
          </SelectItem>
          <SelectItem className="text-start" value="fa">
            {t("language.Persian")}
          </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
  );
};

export default AdminSectionHeader;
