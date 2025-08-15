import { motion } from "framer-motion";
import { HeroData } from "@/app/types/shared/hero/heroData";
import Typewriter from "@/app/components/type-writer";
import { useTranslation } from "react-i18next";
import { useLang } from "@/app/context/langContext";

interface HeroIntroProps {
  hero: HeroData;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export function HeroIntro({ hero }: HeroIntroProps) {
  const { t } = useTranslation("hero");
  const { lang } = useLang();

  <motion.h1
    className="text-4xl md:text-6xl font-bold mb-4"
    variants={itemVariants}
  >
    {t("intro")} <span className="text-primary">{hero.name}</span>
  </motion.h1>;

  return (
    <motion.div className="mb-8" variants={itemVariants}>
      <motion.div
        className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {hero.initials}
      </motion.div>
      <motion.h1
        className="text-5xl md:text-5xl lg:text-6xl font-bold mb-4"
        variants={itemVariants}
      >
        {/* Hi, I'm <span className="text-primary">{hero.name}</span> */}
        {t("intro")} <span className="text-primary">{hero.name}</span>
        {lang === "fa" && <span> هستم </span>}
      </motion.h1>
      <motion.div
        className="text-muted-foreground mb-8"
        variants={itemVariants}
      >
        <Typewriter
          words={hero.roles}
          typingSpeed={100}
          deletingSpeed={50}
          pauseTime={1000}
          postDeletePause={200}
          loop
          className="text-primary text-xl md:text-2xl font-medium"
        />
      </motion.div>
      <motion.p
        className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
        variants={itemVariants}
      >
        {hero.bio}
      </motion.p>
    </motion.div>
  );
}
