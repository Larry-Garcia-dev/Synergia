"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

type BrandKey = "solutions" | "projects" | "taxlegal";

interface NavbarProps {
  activeBrand: BrandKey;
  onBrandChange: (brand: BrandKey) => void;
}

const brandConfig = {
  solutions: {
    label: "Solutions & Consulting",
    color: "#1D1D1B",
    logo: "/images/logocompleto-horizontal-solutions-20-26-20consulting-color.png",
  },
  taxlegal: {
    label: "Tax & Legal",
    color: "#F9105E",
    logo: "/images/logocompleto-horizontal-tax-20-26-20legal-color.png",
  },
  projects: {
    label: "Projects",
    color: "#00A8FF",
    logo: "/images/logocompleto-horizontal-projects-color.png",
  },
};

export default function Navbar({ activeBrand, onBrandChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const current = brandConfig[activeBrand];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottomColor: `${current.color}${scrolled ? "30" : "15"}`,
        borderBottomWidth: 1,
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.06)" : "none",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo with smooth transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrand}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <img
              src={current.logo || "/placeholder.svg"}
              alt={`SYN3RGIA ${current.label}`}
              className="h-10 md:h-12 w-auto"
            />
          </motion.div>
        </AnimatePresence>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-4 mr-4">
          {[
            { label: "Inicio", href: "#" },
            { label: "Nosotros", href: "#about" },
            { label: "Servicios", href: "#services" },
            { label: "Contacto", href: "#contacto" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium transition-colors hover:opacity-80"
              style={{ color: "#666" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-full">
          {(Object.keys(brandConfig) as BrandKey[]).map((key) => {
            const brand = brandConfig[key];
            const isActive = activeBrand === key;
            return (
              <button
                key={key}
                onClick={() => onBrandChange(key)}
                className="relative px-5 py-2 text-sm font-medium transition-colors rounded-full"
                style={{
                  color: isActive ? "#fff" : "#666",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full shadow-md"
                    style={{ backgroundColor: brand.color }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{brand.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg"
          style={{ color: current.color }}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t bg-white px-6 py-4 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {(Object.keys(brandConfig) as BrandKey[]).map((key, i) => {
                const brand = brandConfig[key];
                const isActive = activeBrand === key;
                return (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    onClick={() => {
                      onBrandChange(key);
                      setMobileOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg text-left text-sm font-medium transition-all"
                    style={{
                      color: isActive ? "#fff" : "#1D1D1B",
                      backgroundColor: isActive ? brand.color : "#f5f5f5",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {brand.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
