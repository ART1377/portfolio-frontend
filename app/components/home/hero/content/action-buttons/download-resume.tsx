"use client";

import { Download } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/popover";
import { useTranslation } from "react-i18next";

export function DownloadResumeButton() {
  const api = process.env.NEXT_PUBLIC_API_URL;

  const { t } = useTranslation("hero");

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button size="lg" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            {t("downloadResume")}{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-40 p-0">
          <a
            href={`${api}/hero/resume?lang=en`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-background text-sm text-foreground bg-muted"
          >
            {t("resumeEn")}
          </a>
          <a
            href={`${api}/hero/resume?lang=fa`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-background text-sm text-foreground bg-muted"
          >
            {t("resumeFa")}
          </a>
        </PopoverContent>
      </Popover>
  );
}
