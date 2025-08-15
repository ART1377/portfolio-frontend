"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface SectionParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export function SectionParallax({ children, className = "", speed = 0.5, direction = "up" }: SectionParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], direction === "up" ? [0, -100 * speed] : [0, 100 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

export function ParallaxContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <ParallaxElements />
    </div>
  )
}

function ParallaxElements() {
  const { scrollYProgress } = useScroll()

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -75])

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating shapes for different sections */}
      <motion.div
        className="absolute top-1/4 -right-20 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
        style={{ y: y1, scale }}
      />

      <motion.div
        className="absolute bottom-1/4 -left-20 w-48 h-48 bg-gradient-to-br from-pink-500/5 to-red-500/5 rounded-full blur-2xl"
        style={{ y: y2 }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-lg blur-xl"
        style={{ y: y3, rotate, x: "-50%", translateY: "-50%" }}
      />
    </div>
  )
}
