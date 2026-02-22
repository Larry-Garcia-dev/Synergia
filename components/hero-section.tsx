"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

type BrandKey = "solutions" | "projects" | "taxlegal";

interface HeroSectionProps {
  activeBrand: BrandKey;
}

const heroContent = {
  solutions: {
    tagline: "CONEXIÓN, CONTROL Y CONFIANZA.",
    subtitle:
      "Somos una empresa familiar con valores profundos. Nos esforzamos por entender la cultura y la vision de nuestros clientes, convirtiéndonos en sus asesores integrales.",
    color: "#1D1D1B",
    bgAccent: "#f5f5f5",
    image: "/images/logo-vertical-solutions-negro.png",
    bgImage: "url('/images/main2.jpg')",
  },
  projects: {
    tagline: "Integramos talento para construir tus proyectos.",
    subtitle:
      "Actuamos como integradores de los diferentes actores que deben reunirse para la construccion de un proyecto, con servicios especializados de consultoria en arquitectura e ingenieria.",
    color: "#00A8FF",
    bgAccent: "#e8f7ff",
    image: "/images/logo-vertical-projects.png",
    // bgImage: "url('/images/hero-bg-projects.jpg')",
  },
  taxlegal: {
    tagline: "Estrategia tributaria y proteccion juridica integral.",
    subtitle:
      "El éxito no solo depende de la innovación y la expansión, sino también de una gestión eficiente de los recursos, especialmente cuando se trata de impuestos. La clave paralograrlo es la planificación fiscal estratégica",
    color: "#F9105E",
    bgAccent: "#fff0f5",
    image: "/images/logo-vertical-taxlegal.png",
    // bgImage: "url('/images/hero-bg-taxlegal.jpg')"
  },
};



const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};



const floatingVariants = {
  float: {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HeroSection({ activeBrand }: HeroSectionProps) {
  const content = heroContent[activeBrand];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${activeBrand}`}
          className="absolute inset-0"
          style={{
            backgroundColor: content.bgAccent,
            backgroundImage: content.bgImage
              ? `linear-gradient(rgba(255, 255, 255, 0.42), rgba(0, 0, 0, 0.03)), ${content.bgImage}`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${activeBrand}-${i}`}
            className="absolute rounded-full"
            style={{
              width: 4 + i * 3,
              height: 4 + i * 3,
              backgroundColor: content.color,
              opacity: 0.08,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Decorative diagonal accent */}
      <motion.div
        key={`accent-${activeBrand}`}
        className="absolute top-0 right-0 w-1/3 h-full opacity-10"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${content.color} 100%)`,
        }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.08, x: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Grid pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(${content.color} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
            <motion.div
              key={`hero-text-${activeBrand}`}
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                className="inline-block mb-6 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
                style={{
                  backgroundColor: `${content.color}15`,
                  color: content.color,
                  border: `1px solid ${content.color}25`,
                }}
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", bounce: 0.4 }}
              >
                SYN3RGIA{" "}
                {activeBrand === "solutions"
                  ? "Solutions & Consulting"
                  : activeBrand === "projects"
                    ? "Projects"
                    : "Tax & Legal"}
              </motion.div>

              {/* Animated heading - word by word */}
              <motion.h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance"
                style={{ color: "#1D1D1B" }}
              >
                {content.tagline
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((word, i, arr) => (
                    <motion.span
                      key={`${activeBrand}-word-${i}`}
                      custom={i}
                      variants={wordVariants}
                      initial="hidden"
                      animate="visible"
                      style={{ display: "inline-block", whiteSpace: "nowrap" }}
                    >
                      {word}
                      {i < arr.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                  ))}
              </motion.h1>

              <motion.p
                className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl text-pretty"
                style={{ color: "#000000", wordBreak: "keep-all", overflowWrap: "normal" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {content.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4 items-center lg:items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.a
                  href="#about"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white shadow-lg cursor-pointer"
                  style={{ backgroundColor: content.color }}
                  whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${content.color}40` }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Conocer mas
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </motion.a>
                <motion.a
                  href="#contacto"
                  className="px-8 py-3.5 rounded-full text-sm font-semibold border-2 bg-transparent cursor-pointer"
                  style={{
                    borderColor: content.color,
                    color: content.color,
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `${content.color}10`,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contactanos
                </motion.a>
              </motion.div>

            </motion.div>

          {/* Image side */}
            <motion.div
              key={`hero-img-${activeBrand}`}
              className="flex-1 relative"
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <motion.div className="relative" variants={floatingVariants} animate="float">
                {/* Glow background */}
                <motion.div
                  className="absolute -inset-6 rounded-2xl blur-3xl"
                  style={{ backgroundColor: content.color, opacity: 0.12 }}
                  animate={{
                    opacity: [0.08, 0.15, 0.08],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                <img
                  src={content.image || "/placeholder.svg"}
                  alt={
                    activeBrand === "solutions"
                      ? "SYN3RGIA Solutions & Consulting Logo"
                      : activeBrand === "projects"
                        ? "SYN3RGIA Projects Logo"
                        : "SYN3RGIA Tax & Legal Logo"
                  }
                  className="relative w-full max-w-sm md:max-w-md mx-auto object-contain drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {/* <span className="text-xs font-medium" style={{ color: "#959696" }}>
            Descubre mas
          </span> */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} style={{ color: content.color }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
