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
import { Textarea } from "@/app/components/ui/textarea";
import { User, Briefcase, FileText, Sparkles } from "lucide-react";
import { HeroData } from "@/app/types/shared/hero/heroData";
import { useTranslation } from "react-i18next";

interface HeroFormProps {
  form: HeroData;
  isPending: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRolesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export default function HeroForm({
  form,
  isPending,
  onChange,
  onRolesChange,
  onSave,
}: HeroFormProps) {
  const { t } = useTranslation("dashboard");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information */}
     <Card className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-lg">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-[hsl(var(--foreground))]">
      <User className="h-5 w-5 text-[hsl(var(--primary))]" />
      {t("hero.PersonalInfo")}
    </CardTitle>
  </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>{t("hero.Name")}</Label>
            <Input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder={t("hero.NamePlaceholder") || ""}
              className="bg-white"
            />
          </div>
          <div>
            <Label>{t("hero.Initials")}</Label>
            <Input
              name="initials"
              value={form.initials}
              onChange={onChange}
              placeholder={t("hero.InitialsPlaceholder") || ""}
              maxLength={3}
              className="bg-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Info */}
  <Card className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-lg">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-[hsl(var(--foreground))]">
      <Briefcase className="h-5 w-5 text-[hsl(var(--primary))]" />
      {t("hero.ProfessionalDetails")}
    </CardTitle>
  </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>{t("hero.Roles")}</Label>
            <Input
              value={form.roles.join(", ")}
              onChange={onRolesChange}
              placeholder={t("hero.RolesPlaceholder") || ""}
              className="bg-white"
            />
          </div>
          <div>
            <Label>{t("hero.Bio")}</Label>
            <Textarea
              name="bio"
              value={form.bio}
              onChange={onChange}
              placeholder={t("hero.BioPlaceholder") || ""}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="lg:col-span-2">
        <Button
          onClick={onSave}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? t("hero.Saving") : t("hero.Save")}
        </Button>
      </div>
    </div>
  );
}
