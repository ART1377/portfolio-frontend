"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
} from "@/app/components/ui/alert-dialog";
import { LogOut } from "lucide-react";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { useAdminLogout } from "../hooks/useAdminLogout";

export function AdminLogoutButton() {
  const { t } = useTranslation("login");
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([dialogRef], () => setOpen(false), open);

  const { logout, isLoading } = useAdminLogout();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          disabled={isLoading}
        >
          <LogOut className="w-4 h-4" />
          {t("logout", "Logout")}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent ref={dialogRef}>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("logout_confirm_title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("logout_confirm_description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isLoading}
          >
            {t("confirm_logout")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
