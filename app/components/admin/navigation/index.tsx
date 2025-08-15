"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  User,
  Info,
  Menu,
  Briefcase,
  Layers,
  BookOpen,
  Settings,
  Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../language/language-toggle";
import { cn } from "@/app/lib/utils/cn/cn";
import { AdminLogoutButton } from "../../auth/logout";
import { ThemeToggle } from "../../theme/theme-toggle";
import { useLang } from "@/app/context/langContext";

export function AdminNavigation() {
  const { t } = useTranslation("navigation");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { lang } = useLang();

  const adminLinks = [
    {
      href: "/admin",
      label: t("dashboard"),
      icon: LayoutDashboard,
      badge: null,
    },
    {
      href: "/admin/submissions",
      label: t("submission"),
      icon: FileText,
      badge: "3",
    },
    {
      href: "/admin/contact-info",
      label: t("contactInfo"),
      icon: Mail,
      badge: null,
    },
    { href: "/admin/hero", label: t("hero"), icon: User, badge: null },
    { href: "/admin/about", label: t("about"), icon: Info, badge: null },
    { href: "/admin/skills", label: t("skills"), icon: Layers, badge: null },
    {
      href: "/admin/projects",
      label: t("projects"),
      icon: BookOpen,
      badge: null,
    },
    {
      href: "/admin/experiences",
      label: t("experiences"),
      icon: Briefcase,
      badge: null,
    },
    {
      href: "/admin/suggestions",
      label: t("suggestions"),
      icon: Sparkles,
      badge: null,
    },
  ];

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Settings className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{t("adminPanel")}</h2>
            <p className="text-xs text-muted-foreground">
              {t("managementDashboard")}
            </p>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {adminLinks.map(({ href, label, icon: Icon, badge }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              prefetch={true}
              className={cn(
                "flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-accent-foreground"
                  )}
                />
                <span className="font-medium">{label}</span>
              </div>
              {badge && (
                <Badge
                  variant={isActive ? "secondary" : "destructive"}
                  className="h-5 px-1.5 text-xs"
                >
                  {badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      <Separator className="my-4" />

      {/* Bottom Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <LanguageSwitcher />
          </div>
          <ThemeToggle />
        </div>
        <AdminLogoutButton />
      </div>

      {/* User Info */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{t("adminName")}</p>
            <p className="text-xs text-muted-foreground truncate mt-1">
              {t("adminEmail")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden sticky top-0 z-10">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={lang === "fa" ? "right" : "left"}
                  className="w-80 p-0"
                >
                  <div className="p-6">
                    <NavLinks isMobile={true} />
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                  <Settings className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="font-semibold">{t("adminPanel")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </header>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:h-screen bg-card border-r sticky top-0">
        <div className="p-6">
          <NavLinks />
        </div>
      </aside>
    </>
  );
}
