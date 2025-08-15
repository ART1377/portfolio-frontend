import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { ArrowDown } from "lucide-react";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export function HeroScrollArrow() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      variants={itemVariants}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={scrollToAbout}
        className="animate-bounce"
      >
        <ArrowDown className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}
