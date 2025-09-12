"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Upload, Download, FileText, Globe } from "lucide-react";
import { Lang } from "@/app/types/shared/lang/lang";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLang } from "@/app/context/langContext";

interface ResumeUploaderProps {
  langs: Lang[];
  resumeFiles: Partial<Record<Lang, File>>;
  setResumeFile: (lang: Lang, file: File) => void;
  handleResumeUpload: (lang: Lang) => Promise<void>;
  uploadProgress: Partial<Record<Lang, number>>;
}

export default function ResumeUploader({
  langs,
  resumeFiles,
  setResumeFile,
  handleResumeUpload,
  uploadProgress,
}: ResumeUploaderProps) {
  const { t } = useTranslation("dashboard");
  const { dir } = useLang();
  const [isUploading, setIsUploading] = useState<
    Partial<Record<Lang, boolean>>
  >({});

  const getLangLabel = (lang: Lang) =>
    lang === "en" ? t("hero.English") : t("hero.Persian");
  const getLangFlag = (lang: Lang) => (lang === "en" ? "🇺🇸" : "🇮🇷");

  const handleUpload = async (lang: Lang) => {
    setIsUploading((prev) => ({ ...prev, [lang]: true }));
    try {
      await handleResumeUpload(lang);
    } finally {
      setIsUploading((prev) => ({ ...prev, [lang]: false }));
    }
  };

  return (
    <Card className="bg-gradient-to-br from-[hsl(var(--primary)/0.05)] to-[hsl(var(--secondary)/0.05)] border border-[hsl(var(--border))]">
      <CardHeader className="p-3 md:p-6">
        <CardTitle className="flex items-center gap-2 text-[hsl(var(--foreground))]">
          <FileText className="h-5 w-5 text-[hsl(var(--primary))]" />
          {t("hero.ResumeTitle")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-3 md:p-6">
        {langs.map((lang) => (
          <div
            key={lang}
            className="space-y-4 p-4 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
          >
            <Label className="flex items-center gap-2 text-[hsl(var(--foreground))] font-medium text-base">
              <Globe className="h-4 w-4 text-[hsl(var(--primary))]" />
              {getLangFlag(lang)}{" "}
              {dir === "rtl"
                ? `${t("hero.Resume")} ${getLangLabel(lang)}`
                : `${getLangLabel(lang)} ${t("hero.Resume")}`}
            </Label>

            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files?.[0]) setResumeFile(lang, e.target.files[0]);
              }}
            />
            {resumeFiles[lang] && (
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{resumeFiles[lang]?.name}</span>
                <a
                  href={URL.createObjectURL(resumeFiles[lang]!)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {t("hero.Preview")}
                </a>
              </div>
            )}

            <div className="flex gap-3 items-center flex-wrap">
              <Button
                variant={"gradient"}
                onClick={() => handleUpload(lang)}
                disabled={!resumeFiles[lang] || isUploading[lang]}
                className="flex-1 md:flex-none"
              >
                {isUploading[lang] ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("hero.Uploading")}
                  </div>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    {t("hero.Upload")} {lang.toUpperCase()}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/hero/resume?lang=${lang}`
                    );
                    const data = await response.json();

                    if (response.ok && data.downloadUrl) {
                      // If the API returns a URL, redirect to it
                      window.open(
                        data.suggestedUrl || data.downloadUrl,
                        "_blank"
                      );
                    } else {
                      console.error("Download failed:", data.message);
                    }
                  } catch (error) {
                    console.error("Download error:", error);
                  }
                }}
                className="flex-1 md:flex-none"
              >
                <Download className="h-4 w-4 mr-2" />
                {t("hero.Download")} {lang.toUpperCase()}
              </Button>
            </div>

            {uploadProgress[lang] !== undefined && (
              <div>
                <div className="flex justify-between text-sm">
                  <span>{t("hero.UploadProgress")}</span>
                  <span>{uploadProgress[lang]}%</span>
                </div>
                <div className="w-full bg-[hsl(var(--muted))] rounded-full h-2">
                  <div
                    className="bg-primary-gradient h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress[lang]}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
