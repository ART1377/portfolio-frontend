"use client"

import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxParticles() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        delay: Math.random() * 5,
      })),
    [],
  )

  const yTransforms = particles.map((particle) => useTransform(scrollYProgress, [0, 1], [0, -200 * particle.speed]))

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, index) => {
        return (
          <motion.div
            key={particle.id}
            className="absolute bg-primary/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              y: yTransforms[index],
            }}
            animate={{
              opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + particle.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        )
      })}
    </div>
  )
}
