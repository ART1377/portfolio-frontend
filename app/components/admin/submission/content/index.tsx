"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Submission } from "@/app/types/submission/submission";
import SubmissionsTable from "./table";
import { useTranslation } from "react-i18next";
import AdminSectionHeader from "../../admin-section-header";
import { Mail } from "lucide-react";

type Props = {
  submissions: Submission[];
};

export default function Submissions({ submissions }: Props) {
  const hasData = submissions && submissions.length > 0;

  const { t } = useTranslation("dashboard");

  return (
    <section className="section-container my-10">
      <Card className="max-w-5xl mx-auto">
        <AdminSectionHeader title={t("submissions.RecentContactSubmissions")} />
        <CardContent className="overflow-x-auto">
          <div className="rounded-xl border bg-white/80 dark:bg-slate-800/70">
            {hasData ? (
              <SubmissionsTable submissions={submissions} />
            ) : (
              <div className="text-center text-muted-foreground py-10 bg-slate-100 dark:bg-slate-800/70 rounded-xl">
                {t("No submissions found.")}{" "}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
