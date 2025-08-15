"use client";

import { useLang } from "@/app/context/langContext";
import { Button } from "@/app/components/ui/button";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div className="relative flex items-center bg-muted rounded-lg p-1 gap-1">
      <div
        className={`absolute bg-background rounded-md shadow-sm border transition-transform duration-300 ease-out`}
        style={{
          width: "calc(50% - 8px)",
          height: "calc(100% - 8px)",
          top: "4px",
          left: "4px",
          transform: lang === "en" ? "translateX(2px)" : "translateX(0)",
        }}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLang("en")}
        className={`relative z-10 flex-1 h-8 text-xs font-medium transition-colors ${
          lang === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLang("fa")}
        className={`relative z-10 flex-1 h-8 text-xs font-medium transition-colors ${
          lang === "fa" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        فا
      </Button>
    </div>
  )
}
