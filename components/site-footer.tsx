"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

type BrandKey = "solutions" | "projects" | "taxlegal";

interface FooterProps {
  activeBrand: BrandKey;
}

const brandColors = {
  solutions: "#1D1D1B",
  projects: "#00A8FF",
  taxlegal: "#F9105E",
};

const brandLogos = {
  solutions: "/images/logocompleto-horizontal-solutions-20-26-20consulting-color.png",
  projects: "/images/logocompleto-horizontal-projects-color.png",
  taxlegal: "/images/logocompleto-horizontal-tax-20-26-20legal-color.png",
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.5 },
  }),
};

export default function SiteFooter({ activeBrand }: FooterProps) {
  const color = brandColors[activeBrand];
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} className="relative bg-[#1D1D1B] text-white overflow-hidden">
      {/* Top accent line */}
      <motion.div
        key={`footer-accent-${activeBrand}`}
        className="h-1 w-full"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03]"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Brand */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerItem}
            custom={0}
          >
            <motion.img
              key={activeBrand}
              src={brandLogos[activeBrand]}
              alt="SYN3RGIA Logo"
              className="h-10 w-auto mb-6 brightness-0 invert"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-sm leading-relaxed text-white/60 max-w-sm">
              Tres mentes, tres enfoques, un solo proposito. Asesoramiento integral
              para transformar tu negocio con confianza y excelencia.
            </p>

            {/* Social-like badges */}
            <div className="mt-6 flex items-center gap-3">
              {["S", "P", "T"].map((letter, i) => (
                <motion.div
                  key={letter}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold border border-white/10"
                  style={{
                    backgroundColor:
                      i === 0 ? "#1D1D1B" : i === 1 ? "#00A8FF" : "#F9105E",
                    color: "#fff",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", bounce: 0.5 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerItem}
            custom={1}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color }}>
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, text: "contacto@syn3rgia.com", href: "mailto:contacto@syn3rgia.com" },
                { icon: Phone, text: "+57 318 123 4567", href: "tel:+573181234567" },
                { icon: MapPin, text: "Ibague, Tolima, Colombia", href: null },
              ].map((item, i) => {
                const Icon = item.icon;
                const El = item.href ? motion.a : motion.div;
                return (
                  <El
                    key={item.text}
                    {...(item.href ? { href: item.href } : {})}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white group"
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    whileHover={{ x: 4 }}
                  >
                    <motion.span
                      whileHover={{ rotate: 10, scale: 1.2 }}
                    >
                      <Icon size={16} style={{ color }} />
                    </motion.span>
                    {item.text}
                  </El>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerItem}
            custom={2}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color }}>
              Enlaces
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Inicio", href: "#" },
                { label: "Nosotros", href: "#about" },
                { label: "Servicios", href: "#services" },
                { label: "Contacto", href: "#contacto" },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white flex items-center gap-1 group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 6 }}
                >
                  {link.label}
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight size={12} style={{ color }} />
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Unidades */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerItem}
            custom={3}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color }}>
              Unidades de Negocio
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { name: "Solutions & Consulting", c: "#1D1D1B" },
                { name: "Projects", c: "#00A8FF" },
                { name: "Tax & Legal", c: "#F9105E" },
              ].map((unit, i) => (
                <motion.div
                  key={unit.name}
                  className="flex items-center gap-2 text-sm text-white/60"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: unit.c }} />
                  {unit.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-white/40">
            {"2026 SYN3RGIA. Todos los derechos reservados."}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">
              Aviso de Privacidad
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">
              Terminos y Condiciones
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
