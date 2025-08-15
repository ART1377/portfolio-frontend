"use client"

import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent } from "@/app/components/ui/card"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/app/lib/utils/cn/cn"
import { useState } from "react"

interface AboutTextBlockProps {
  description?: string[]
  skills?: string[]
  isInView: boolean
}

export default function AboutTextBlock({ description, skills, isInView }: AboutTextBlockProps) {
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
      initial={{ x: -80, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="group perspective-1000"
    >
      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl hover:shadow-lg transition-shadow"
        )}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <CardContent className="relative p-6 md:p-8">
          <div className="space-y-4 text-foreground">
            {description?.slice(1)?.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {skills && skills.length > 0 && (
            <>
              <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <motion.div
                className="flex flex-wrap gap-2.5"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {skills.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ scale: 0.8, opacity: 0, y: 12 }}
                    animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 12 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.06 }}
                  >
                    <Badge
                      variant="secondary"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary hover:bg-primary-400"
                    >
                      <Check className="h-3.5 w-3.5 opacity-80" />
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
