"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactInfo } from "@/app/types/shared/contact/contactInfo";
import { useTranslation } from "react-i18next";

type Props = {
  contactInfoData: ContactInfo;
  isInView: boolean;
};

export function ContactDetails({ contactInfoData, isInView }: Props) {
  const { t } = useTranslation("contact");

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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">{t("contactInfoTitle")}</h3>
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {[
          { icon: Mail, text: contactInfoData.email },
          { icon: Phone, text: contactInfoData.phone },
          { icon: MapPin, text: contactInfoData.location },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-x-3"
            variants={itemVariants as any}
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <item.icon className="h-5 w-5 text-primary" />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
