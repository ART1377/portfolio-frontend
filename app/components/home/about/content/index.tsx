"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import AboutHeader from "./header";
import AboutTextBlock from "./text-block";
import AboutFeatureCards from "./feature-cards";
import { ParallaxContainer } from "@/app/components/parallax/section-parallax";
import { AboutData } from "@/app/types/shared/about/aboutData";

export default function AboutContent({
  description = [],
  skills = [],
  features = [],
}: AboutData) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section id="about" ref={sectionRef} aria-labelledby="about-heading">
      <ParallaxContainer>
        <div className="section-container relative z-10">
          <div className="mx-auto w-full">
            <h2 id="about-heading" className="sr-only">
              About Me
            </h2>
            <AboutHeader description={description} isInView={isInView} />
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-start">
              <AboutTextBlock
                description={description}
                skills={skills}
                isInView={isInView}
              />
              <AboutFeatureCards features={features} isInView={isInView} />
            </div>
          </div>
        </div>
      </ParallaxContainer>
    </section>
  );
}
