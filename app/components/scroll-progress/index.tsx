"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling past hero section
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setPercent(Math.round(v * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-16 h-16">
          {/* Background Circle */}
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-muted-foreground/20"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress,
              }}
              className="drop-shadow-sm"
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage Text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              className="text-xs font-bold text-foreground"
              style={{
                opacity: useSpring(scrollYProgress, {
                  stiffness: 100,
                  damping: 30,
                }),
              }}
            >
              {percent}%
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      {/* Section Progress Dots */}
      <SectionProgress />
    </>
  );
}

function SectionProgress() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: "home", label: "Home", color: "bg-blue-500" },
    { id: "about", label: "About", color: "bg-green-500" },
    { id: "skills", label: "Skills", color: "bg-yellow-500" },
    { id: "projects", label: "Projects", color: "bg-purple-500" },
    { id: "experience", label: "Experience", color: "bg-orange-500" },
    { id: "contact", label: "Contact", color: "bg-pink-500" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.3);

      // Determine active section
      const current = sections.find((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          );
        }
        return false;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
      initial={{ opacity: 0, x: -50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -50,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="relative group cursor-pointer"
            onClick={() => scrollTo(section.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Dot */}
            <motion.div
              className={`w-3 h-3 rounded-full border-2 border-background shadow-lg transition-all duration-300 ${
                activeSection === section.id
                  ? `${section.color} scale-125`
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              }`}
              layoutId={activeSection === section.id ? "activeDot" : undefined}
            />

            {/* Tooltip */}
            <motion.div
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-background border rounded-lg px-3 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              <span className="text-sm font-medium">{section.label}</span>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-background border-l border-b rotate-45" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
