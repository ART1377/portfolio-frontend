// HeroContent.tsx
"use client";

import { motion } from "framer-motion";
import { ParallaxHero } from "@/app/components/parallax/parallax-hero";
import { HeroData } from "@/app/types/shared/hero/heroData";
import { HeroIntro } from "./intro";
import { HeroActions } from "./action-buttons";
import { HeroSocials } from "./socials";
import { HeroScrollArrow } from "./scroll-arrow";

interface HeroContentProps {
  hero: HeroData;
}

export function HeroContent({ hero }: HeroContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative"
    >
      <ParallaxHero />
      <motion.div
        className="section-container text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroIntro hero={hero} />
        <HeroActions />
        <HeroSocials socials={hero.socials} />
        <HeroScrollArrow />
      </motion.div>
    </section>
  );
}
