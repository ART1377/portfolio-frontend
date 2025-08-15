"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  ThemeToggle,
  ThemeToggleExpanded,
} from "@/app/components/theme/theme-toggle";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import LanguageSwitcher from "../language/language-toggle";
import { useTranslation } from "react-i18next";
import { useScrollFromTop } from "@/app/hooks/useScrollFromTop";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const scrollFromTop = useScrollFromTop();

  useClickOutside(
    [mobileMenuRef, toggleButtonRef],
    () => setIsOpen(false),
    isOpen
  );

  const { t } = useTranslation("navigation");
  const navItems = [
    { id: "home", label: t("hero") },
    { id: "about", label: t("about") },
    { id: "skills", label: t("skills") },
    { id: "projects", label: t("projects") },
    { id: "contact", label: t("contact") },
  ];

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsOpen(false); // close menu on mobile
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur-md border-b z-50 bg-background/${scrollFromTop}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <motion.div
            className="font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {t("name")}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 grow ms-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-medium transition-colors hover:text-primary relative ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            <div className="flex ms-auto gap-4 items-center">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {/* <LanguageToggle /> */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                ref={toggleButtonRef}
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={mobileMenuRef}
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block px-3 py-2 text-base font-medium w-full text-start transition-colors hover:text-primary ${
                      activeSection === item.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                <motion.div
                  className="px-3 py-2 flex items-center gap-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: navItems.length * 0.1,
                  }}
                >
                  <ThemeToggleExpanded />
                  <LanguageSwitcher />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
