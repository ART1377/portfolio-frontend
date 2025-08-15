import { motion } from "framer-motion";
import React from "react";

type Props = {
  title: string;
};

const SectionHeader = ({ title }: Props) => {
  return (
    <>
      <motion.h2
        className="mt-4 bg-gradient-to-b from-neutral-700 to-neutral-500 dark:from-neutral-50 dark:to-neutral-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl pb-0.5"
        variants={{
          hidden: { y: 28, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        {title}
        <motion.div
          className="mx-auto mt-4 h-[2px] w-32 rounded-full bg-gradient-to-r from-primary/80 via-primary/50 to-transparent"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          style={{ transformOrigin: "left" }}
        />
      </motion.h2>
    </>
  );
};

export default SectionHeader;
