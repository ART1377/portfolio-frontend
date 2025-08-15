"use client";

import React from "react";
import {
  ThemeProvider,
  ColorSchemeProvider,
} from "@/app/components/theme/theme-provider";
import { ThemeTransition } from "@/app/components/theme/theme-transition";
import { ParallaxBackground } from "@/app/components/parallax/parallax-background";
import { ColorSchemePicker } from "@/app/components/theme/color-scheme-picker";
import { EnhancedThemeSettings } from "@/app/components/theme/enhanced-theme-settings";
import { ScrollToTop } from "@/app/components/scroll-to-top";
import { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import i18n from "@/app/lib/language/i18n";
import { LangProvider } from "@/app/context/langContext";

type Props = {
  children: React.ReactNode;
};

const MainProvider = ({ children }: Props) => {
  return (
    <LangProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorSchemeProvider>
            <div className="min-h-screen bg-background">
              <ParallaxBackground />
              {/* <ParallaxParticles /> */}
              <ThemeTransition />
              {/* <ReadingTime /> */}
              {children}
              <ScrollToTop />
              <EnhancedThemeSettings />
              <ColorSchemePicker />
              <Toaster position="top-center" reverseOrder={false} />
            </div>
            <ThemeTransition />
          </ColorSchemeProvider>
        </ThemeProvider>
      </I18nextProvider>
    </LangProvider>
  );
};

export default MainProvider;
