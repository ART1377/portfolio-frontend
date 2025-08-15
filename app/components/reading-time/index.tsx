"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

export function ReadingTime() {
  const [readingTime, setReadingTime] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Calculate estimated reading time based on content
    const calculateReadingTime = () => {
      const text = document.body.innerText
      const wordsPerMinute = 200
      const words = text.trim().split(/\s+/).length
      const time = Math.ceil(words / wordsPerMinute)
      setReadingTime(time)
    }

    calculateReadingTime()

    // Track time spent on page
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setTimeSpent(elapsed)
    }, 1000)

    // Show component after some scrolling
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      className="fixed top-20 right-4 z-40 bg-background/80 backdrop-blur-md border rounded-lg px-3 py-2 shadow-lg"
      initial={{ opacity: 0, x: 100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 100,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2 text-sm">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">{readingTime} min read</span>
          <span className="text-xs font-mono">{formatTime(timeSpent)}</span>
        </div>
      </div>
    </motion.div>
  )
}
