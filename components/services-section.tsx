"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

type BrandKey = "solutions" | "projects" | "taxlegal";

interface ServicesSectionProps {
  activeBrand: BrandKey;
  onBrandChange: (brand: BrandKey) => void;
}

const brandColors: Record<BrandKey, string> = {
  solutions: "#1D1D1B",
  projects: "#00A8FF",
  taxlegal: "#F9105E",
};

const serviceCards = [
  {
    brand: "taxlegal" as BrandKey,
    title: "Tax & Legal",
    description:
      "Proteccion juridica y optimizacion fiscal a tu medida. Asesoria integral en materia tributaria, corporativa y laboral.",
    logo: "/images/logo-vertical-taxlegal.png",
    color: "#F9105E",
    buttonText: "Conocer mas",
  },
  {
    brand: "projects" as BrandKey,
    title: "Projects",
    description:
      "Gestion integral de proyectos de ingenieria con precision y excelencia tecnica, desde la planeacion hasta la entrega.",
    logo: "/images/logo-vertical-projects.png",
    color: "#00A8FF",
    buttonText: "Conocer mas",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export default function ServicesSection({
  activeBrand,
  onBrandChange,
}: ServicesSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const accentColor = brandColors[activeBrand];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleNavigate = (brand: BrandKey) => {
    onBrandChange(brand);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      id="services"
      style={{ backgroundColor: `${accentColor}04` }}
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${accentColor} 0, ${accentColor} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "30px 30px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "30px 30px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Decorative circles */}
      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
        style={{ backgroundColor: accentColor, opacity: 0.03 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full"
        style={{ backgroundColor: accentColor, opacity: 0.04 }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-8 h-1 rounded-full"
              style={{ backgroundColor: accentColor }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Servicios
            </span>
            <motion.div
              className="w-8 h-1 rounded-full"
              style={{ backgroundColor: accentColor }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>

          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-balance"
            style={{ color: "#1D1D1B" }}
          >
            Nuestros Servicios
          </h2>
          <motion.p
            className="mt-4 text-lg max-w-2xl mx-auto text-pretty"
            style={{ color: "#959696" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Soluciones especializadas para cada necesidad de tu negocio.
          </motion.p>
        </motion.div>

        {/* Two Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {serviceCards.map((card, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={card.brand}
                className="group relative rounded-2xl bg-white border overflow-hidden cursor-pointer flex flex-col items-center text-center"
                style={{
                  borderColor: isHovered ? card.color : `${card.color}20`,
                  boxShadow: isHovered
                    ? `0 20px 60px ${card.color}15`
                    : "0 4px 24px rgba(0,0,0,0.04)",
                }}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl z-20"
                  style={{ backgroundColor: card.color }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ backgroundColor: card.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 0.03 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Card Content */}
                <div className="relative z-10 p-8 md:p-10 flex flex-col items-center flex-1">
                  {/* Logo */}
                  <motion.div
                    className="w-32 h-32 md:w-40 md:h-40 mb-6 flex items-center justify-center"
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={card.logo}
                      alt={`SYN3RGIA ${card.title} Logo`}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="text-xl md:text-2xl font-bold mb-3"
                    style={{ color: "#1D1D1B" }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base leading-relaxed mb-8 text-pretty" style={{ color: "#666" }}>
                    {card.description}
                  </p>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() => handleNavigate(card.brand)}
                    className="mt-auto inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-white transition-shadow"
                    style={{ backgroundColor: card.color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {card.buttonText}
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
