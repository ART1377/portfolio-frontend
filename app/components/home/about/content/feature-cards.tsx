"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Code, Palette, Zap, type LucideIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { cn } from "@/app/lib/utils/cn/cn"

type Feature = {
  icon: "Code" | "Palette" | "Zap"
  title: string
  description: string
}

interface AboutFeatureCardsProps {
  features?: Feature[]
  isInView: boolean
}

const iconMap: Record<Feature["icon"], LucideIcon> = {
  Code,
  Palette,
  Zap,
}

export default function AboutFeatureCards({ features = [], isInView }: AboutFeatureCardsProps) {
  return (
    <motion.div
      className="grid gap-5 md:gap-6"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {features.map((item, index) => (
        <FeatureCard key={index} feature={item} index={index} />
      ))}
    </motion.div>
  )
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = useMemo(() => iconMap[feature.icon], [feature.icon])
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, t: "0,0,0" })

  function handleMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const ry = (px - 0.5) * 10 // rotateY
    const rx = (0.5 - py) * 10 // rotateX
    setTilt({ rx, ry, t: `${(px - 0.5) * 12}px, ${(py - 0.5) * 12}px, 0` })
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0, t: "0,0,0" })
  }

  return (
    <motion.div
      variants={{
        hidden: { x: 0, y: 20, opacity: 0 },
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "easeOut", delay: 0.05 * index },
        },
      }}
      className="group perspective-1000"
    >
      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl hover:shadow-lg transition-shadow",
        )}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >     
        <CardContent className="relative p-6 md:p-7">
          <motion.div
            className="mb-4 flex items-center"
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="me-3 grid h-10 w-10 place-items-center rounded-xl border border-primary/20 bg-primary/15 text-primary">
              <Icon className="h-5.5 w-5.5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground md:text-xl">{feature.title}</h3>
          </motion.div>
          <p className="text-sm leading-relaxed text-muted-foreground/90 md:text-base">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
