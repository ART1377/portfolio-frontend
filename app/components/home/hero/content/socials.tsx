import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { HeroData } from "@/app/types/shared/hero/heroData";
import { Button } from "@/app/components/ui/button";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

interface HeroSocialsProps {
  socials: HeroData["socials"];
}

export function HeroSocials({ socials }: HeroSocialsProps) {
  return (
    <motion.div className="flex justify-center gap-6 mb-12" variants={itemVariants}>
      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
        <a href={socials.github} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
        </a>
      </motion.div>
      <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon">
            <Linkedin className="h-5 w-5" />
          </Button>
        </a>
      </motion.div>
      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
        <a href={socials.email}>
          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
          </Button>
        </a>
      </motion.div>
    </motion.div>
  );
}
