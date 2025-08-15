"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Color scheme context
const ColorSchemeContext = createContext<{
  colorScheme: string
  setColorScheme: (scheme: string) => void
}>({
  colorScheme: "blue",
  setColorScheme: () => {},
})

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState("blue")

  useEffect(() => {
    const stored = localStorage.getItem("color-scheme")
    if (stored) {
      setColorScheme(stored)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("color-scheme", colorScheme)
    document.documentElement.setAttribute("data-color-scheme", colorScheme)
  }, [colorScheme])

  return <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>{children}</ColorSchemeContext.Provider>
}

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext)
  if (!context) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider")
  }
  return context
}
