"use client";

import { motion } from "framer-motion";
import { Github, Linkedin,Send  } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ContactInfo } from "@/app/types/shared/contact/contactInfo";
import { useTranslation } from "react-i18next";

export function ContactSocials({
  contactInfoData,
  isInView,
}: {
  contactInfoData: ContactInfo;
  isInView: boolean;
}) {
  const { t } = useTranslation("contact");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <h3 className="text-2xl font-semibold mb-6">{t("followMeTitle")}</h3>
      <div className="flex gap-x-4">
        {[
          { icon: Github, link: contactInfoData.social.github },
          { icon: Linkedin, link: contactInfoData.social.linkedin },
          { icon: Send , link: contactInfoData.social.telegram },
        ].map(({ icon: Icon, link }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Icon className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
