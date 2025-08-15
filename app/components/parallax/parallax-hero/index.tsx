"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100])

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
        style={{ y: y1, opacity, scale }}
      />

      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-600/10 to-red-600/10 rounded-full blur-3xl"
        style={{ y: y2, opacity }}
      />

      {/* Geometric patterns */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full"
        style={{ y: y3 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-32 w-1 h-1 bg-primary/40 rounded-full"
        style={{ y: y1 }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/3 w-3 h-3 bg-primary/20 rounded-full"
        style={{ y: y2 }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating lines */}
      <FloatingLines />
    </div>
  )
}

function FloatingLines() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.3, 0.1])

  return (
    <>
      <motion.div
        className="absolute top-0 left-1/5 w-px h-screen bg-gradient-to-b from-transparent via-primary/10 to-transparent"
        style={{ y: y1, opacity }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-px h-screen bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        style={{ y: y2, opacity }}
      />
    </>
  )
}
