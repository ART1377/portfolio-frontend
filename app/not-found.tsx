"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { t } = useTranslation("not-found");
  const router = useRouter();

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt={t("title")}
            width={64}
            height={64}
            className="rounded-full"
            priority
          />
        </div>

        <p className="text-sm font-medium text-muted-foreground">
          {t("errorCode")}
        </p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("goHome")}
          </Link>
          <Button
            variant="outline"
            className="h-10 px-6 bg-transparent"
            onClick={() => router.refresh()} // ✅ keeps the language
          >
            {t("refreshPage")}
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-2 text-start sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">{t("checkUrlTitle")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("checkUrlDescription")}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">{t("headBackTitle")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("headBackDescription")}
            </p>
          </div>
        </div>

        <p className="sr-only">{t("srMessage")}</p>
      </div>
    </main>
  );
}
