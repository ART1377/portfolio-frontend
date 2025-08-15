import React from "react";
import SubmissionRow from "./row";
import { Submission } from "@/app/types/submission/submission";
import { useTranslation } from "react-i18next";

type Props = {
  submissions: Submission[];
};

const SubmissionsTable = ({ submissions }: Props) => {
  const { t } = useTranslation("dashboard");

  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-muted text-muted-foreground">
        <tr>
          <th className="p-3 text-start">{t("submissions.Name")}</th>
          <th className="p-3 text-start">{t("submissions.Email")}</th>
          <th className="p-3 text-start">{t("submissions.Subject")}</th>
          <th className="p-3 text-start">{t("submissions.Message")}</th>
          <th className="p-3 text-start">{t("submissions.Date")}</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((item) => (
          <SubmissionRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionsTable;
