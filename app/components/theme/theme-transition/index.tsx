"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeTransition() {
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [theme])

  if (!isTransitioning) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="absolute inset-0 bg-background"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(150% at 50% 50%)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  )
}
