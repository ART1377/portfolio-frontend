// ContactContent.tsx
"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ContactInfo } from "@/app/types/shared/contact/contactInfo";
import { ContactForm } from "./form";
import { ContactDetails } from "./details";
import { ContactSocials } from "./socials";
import { ContactCTA } from "./cta";
import ContactContentHeader from "./header";

interface Props {
  contactInfoData: ContactInfo;
}

export function ContactContent({ contactInfoData }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20" ref={ref}>
      <div className="section-container">
        <ContactContentHeader isInView={isInView} />

        <div className="grid lg:grid-cols-2 gap-12">
          <ContactForm isInView={isInView} />
          <div className="space-y-8">
            <ContactDetails
              contactInfoData={contactInfoData}
              isInView={isInView}
            />
            <ContactSocials
              contactInfoData={contactInfoData}
              isInView={isInView}
            />
            <ContactCTA isInView={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}
