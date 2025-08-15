"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Create different parallax speeds for various elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y5 = useTransform(scrollYProgress, [0, 1], [0, 200])

  // Rotation effects
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180])

  // Scale effects
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1])

  // Opacity effects
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.3, 0.1])
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.05, 0.2, 0.2, 0.05])

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Background Layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
        style={{ y: y1, opacity: opacity1 }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-tl from-green-500/3 via-blue-500/3 to-purple-500/3"
        style={{ y: y2, opacity: opacity2 }}
      />

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
        style={{ y: y1, scale: scale1 }}
      />

      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/10 to-red-400/10 rounded-lg blur-lg"
        style={{ y: y2, rotate: rotate1 }}
      />

      <motion.div
        className="absolute top-60 left-1/3 w-16 h-16 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-md"
        style={{ y: y3, scale: scale2 }}
      />

      <motion.div
        className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-2xl"
        style={{ y: y4, opacity: opacity1 }}
      />

      <motion.div
        className="absolute bottom-60 left-20 w-20 h-20 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-lg blur-lg"
        style={{ y: y5, rotate: rotate2 }}
      />

      {/* Floating Dots Pattern */}
      <FloatingDots />

      {/* Animated Lines */}
      <AnimatedLines />
    </div>
  )
}

function FloatingDots() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -500])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.1, 0.3])

  // Fix hydration error: only generate dots on client
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const dots = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }))
  }, [])

  if (!mounted) return null // Avoid mismatch during SSR

  return (
    <motion.div className="absolute inset-0" style={{ y, opacity }}>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute bg-primary/20 rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}

function AnimatedLines() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <>
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        style={{ y: y2 }}
      />
    </>
  )
}
