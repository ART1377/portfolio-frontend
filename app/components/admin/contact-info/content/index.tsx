"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  User,
  Globe,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContactInfoEditor } from "../hooks/useContactInfoEditor";
import AdminSectionHeader from "../../admin-section-header";
import ContactInfoSkeleton from "../skeleton";


export default function ContactEditor() {
  const { t } = useTranslation("dashboard");
  const { formData, error, isLoading, isPending, handleChange, handleSave } =
    useContactInfoEditor();

  if (isLoading || !formData) return <ContactInfoSkeleton/>;
  if (error) return <p className="text-red-500">{t("contact.FailedToLoad")}</p>;

  return (
    <section className="section-container my-10">
      <div className="max-w-5xl mx-auto space-y-8 p-6">
        <AdminSectionHeader
          title={t("contact.EditContactInformation")}
        />
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            {t("contact.UpdateContactInfoDescription")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Information Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/20">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">
                  {t("contact.ContactDetails")}
                </h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {t("contact.Email")}
                </Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.Email")}
                  className="h-11 border-2 focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  {t("contact.Phone")}
                </Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("contact.Phone")}
                  className="h-11 border-2 focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {t("contact.Location")}
                </Label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={t("contact.Location")}
                  className="h-11 border-2 focus:border-primary/50 transition-colors"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Links Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">
                  {t("contact.SocialLinks")}
                </h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="social.github"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Github className="h-4 w-4 text-primary" />
                  {t("contact.GitHub")}
                </Label>
                <Input
                  name="social.github"
                  value={formData.social.github}
                  onChange={handleChange}
                  placeholder={t("contact.GitHubURL")}
                  className="h-11 border-2 focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="social.linkedin"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Linkedin className="h-4 w-4 text-primary" />
                  {t("contact.LinkedIn")}
                </Label>
                <Input
                  name="social.linkedin"
                  value={formData.social.linkedin}
                  onChange={handleChange}
                  placeholder={t("contact.LinkedInURL")}
                  className="h-11 border-2 focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="social.telegram"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Send className="h-4 w-4 text-primary" />
                  {t("contact.Telegram")}
                </Label>
                <Input
                  name="social.telegram"
                  value={formData.social.telegram}
                  onChange={handleChange}
                  placeholder={t("contact.TelegramURL")}
                  className="h-11 border-2 focus:border-primary/50 transition-colors"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <Button
              onClick={handleSave}
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={isPending}
              isLoading={isPending}
            >
              {t("contact.SaveChanges")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
