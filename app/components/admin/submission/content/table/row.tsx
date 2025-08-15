"use client";

import { Submission } from "@/app/types/submission/submission";
import DeleteSubmissionButton from "./delete-button";
import { useLang } from "@/app/context/langContext";
import { formatJalaliDate } from "@/app/lib/utils/date/formatJalaliDate";

type Props = {
  item: Submission;
};

export default function SubmissionRow({ item }: Props) {
  const { lang } = useLang();

  return (
    <tr className="hover:bg-muted transition-colors">
      <td className="p-3">{item.name}</td>
      <td className="p-3">{item.email}</td>
      <td className="p-3">{item.subject}</td>
      <td className="p-3 max-w-[200px] truncate">{item.message}</td>
      <td className="p-3">
        {lang === "fa"
          ? formatJalaliDate(item.submittedAt, "short")
          : new Date(item.submittedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
      </td>
      <td className="p-3">
        <DeleteSubmissionButton id={item.id} />
      </td>
    </tr>
  );
}
