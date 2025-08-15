"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useTranslation("footer");

  return (
    <section className="section-container">
      <motion.footer
        ref={ref}
        className="mt-20 pt-8 border-t text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>{t("copyright")}</p>{" "}
      </motion.footer>
    </section>
  );
};

export default Footer;
