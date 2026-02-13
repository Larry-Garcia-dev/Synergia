"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";
import SiteFooter from "@/components/site-footer";

type BrandKey = "solutions" | "projects" | "taxlegal";

export default function Page() {
  const [activeBrand, setActiveBrand] = useState<BrandKey>("solutions");

  return (
    <main className="min-h-screen bg-white">
      <Navbar activeBrand={activeBrand} onBrandChange={setActiveBrand} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeBrand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HeroSection activeBrand={activeBrand} />
          <AboutSection activeBrand={activeBrand} />
          <ServicesSection activeBrand={activeBrand} />
          <ContactSection activeBrand={activeBrand} />
        </motion.div>
      </AnimatePresence>

      <SiteFooter activeBrand={activeBrand} />
    </main>
  );
}
