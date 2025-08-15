"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "@/app/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/components/ui/alert-dialog"; // ✅ use your custom alert dialog
import { deleteSubmissionById } from "../../actions/deleteSubmissionById";
import toast from "react-hot-toast";
import { Trash2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/app/hooks/useClickOutside";

export default function DeleteSubmissionButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslation("dashboard");

  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([dialogRef], () => setOpen(false), open);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteSubmissionById(id);
        toast.success(t("submissions.DeleteSuccess"));
      } catch (error) {
        toast.error(t("submissions.DeleteFail"));
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          aria-label={t("submissions.Delete")}
          title={t("submissions.Delete")}
          className="flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent ref={dialogRef}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("submissions.ConfirmDeletion")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("submissions.DeleteConfirmationMessage")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            {t("submissions.Cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDelete();
              setOpen(false);
            }}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              t("submissions.Delete")
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
