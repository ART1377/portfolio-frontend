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
    <motion.div
      className="flex justify-center gap-6 mb-12"
      variants={itemVariants}
      aria-label="Social links"
      role="list"
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        role="listitem"
      >
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub profile"
          title="GitHub"
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github className="h-5 w-5" aria-hidden="true" focusable="false" />
          </Button>
        </a>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.2, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        role="listitem"
      >
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect with me on LinkedIn"
          title="LinkedIn"
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Linkedin
              className="h-5 w-5"
              aria-hidden="true"
              focusable="false"
            />
          </Button>
        </a>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        role="listitem"
      >
        <a
          href={`mailto:${socials.email}`}
          aria-label="Send me an email"
          title="Email"
        >
          <Button variant="ghost" size="icon" aria-label="Email" title="Email">
            <Mail className="h-5 w-5" aria-hidden="true" focusable="false" />
          </Button>
        </a>
      </motion.div>
    </motion.div>
  );
}
