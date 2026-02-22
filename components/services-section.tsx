"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Calculator,
  ClipboardCheck,
  Building2,
  Ruler,
  FileText,
  Gavel,
  TrendingUp,
  Users,
  Scale,
  ArrowRight,
} from "lucide-react";

type BrandKey = "solutions" | "projects" | "taxlegal";

interface ServicesSectionProps {
  activeBrand: BrandKey;
  onBrandChange: (brand: BrandKey) => void;
}

/* ── Home (solutions) view: 2 brand highlight cards ── */
const homeCards = [
  {
    brand: "taxlegal" as BrandKey,
    title: "Tax & Legal",
    description:
      "Asesoria en derecho tributario internacional, consultoria para empresas locales, acompanamiento en fiscalizacion y planeacion patrimonial para familias empresarias.",
    logo: "/images/logo-vertical-taxlegal.png",
    color: "#F9105E",
    buttonText: "Conocer mas",
  },
  {
    brand: "projects" as BrandKey,
    title: "Projects",
    description:
      "Servicios especializados de consultoria en arquitectura e ingenieria, desde estudios urbanisticos y presupuestos hasta diseno arquitectonico y control de obra.",
    logo: "/images/logo-vertical-projects.png",
    color: "#00A8FF",
    buttonText: "Conocer mas",
  },
];

/* ── Projects & Tax‑Legal views: service grids based on real practice areas ── */
const servicesContent = {
  projects: {
    title: "Consultoria en Arquitectura e Ingenieria",
    subtitle:
      "Servicios especializados como integradores de los diferentes actores que deben reunirse para la construccion de un proyecto.",
    color: "#00A8FF",
    services: [
      {
        icon: Building2,
        title: "Programas Urbanisticos",
        desc: "Estudios de programas urbanisticos para el desarrollo integral de proyectos de construccion e infraestructura.",
        image: "/images/pj6.jpeg",
      },
      {
        icon: Calculator,
        title: "Presupuestos y Control de Obra",
        desc: "Elaboracion de analisis de precios unitarios, presupuestos, programacion y control de obra para cada etapa del proyecto.",
        image: "/images/pj5.jpeg",
      },
      {
        icon: ClipboardCheck,
        title: "Licitaciones e Interventoria",
        desc: "Asesoria en licitaciones, interventoria tecnica y administrativa de obras para garantizar cumplimiento y calidad.",
        image: "/images/pj4.jpeg",
      },
      {
        icon: TrendingUp,
        title: "Control de Costos de Obra",
        desc: "Seguimiento detallado y optimizacion de costos durante todo el ciclo de vida del proyecto constructivo.",
        image: "/images/pj3.jpeg",
      },
      {
        icon: Ruler,
        title: "Diseno Arquitectonico e Interiores",
        desc: "Diseno arquitectonico y de espacios interiores, diseno de edificaciones, espacios publicos y arquitectura paisajista.",
        image: "/images/pj2.jpeg",
      },
      {
        icon: Building2,
        title: "Supervision de Obra",
        desc: "Supervision tecnica y administrativa de obras para garantizar cumplimiento y calidad.",
        image: "/images/pj1.jpeg",
      },
    ],
  },
  taxlegal: {
    title: "Servicios Juridicos y Tributarios",
    subtitle:
      "Practica centrada en asesoria tributaria internacional, consultoria local, fiscalizacion y planeacion patrimonial.",
    color: "#F9105E",
    services: [
      {
        icon: Scale,
        title: "Derecho Tributario Internacional",
        desc: "Consultoria tributaria para multinacionales: esquemas societarios de expansion internacional, reestructuracion empresarial mediante fusiones, escisiones y adquisiciones, y coordinacion con equipos contables y juridicos.",
        image: "/images/t6.jpeg",
      },
      {
        icon: FileText,
        title: "Asesoria Tributaria Local",
        desc: "Diagnostico tributario para buscar eficiencias, consultoria relacionada con reestructuraciones empresariales y acompanamiento juridico y tributario en las operaciones del dia a dia.",
        image: "/images/t3.jpeg",
      },
      {
        icon: Gavel,
        title: "Procesos de Fiscalizacion",
        desc: "Acompanamiento ante la Autoridad Tributaria, incluyendo la preparacion de recursos y respuestas ante la DIAN y autoridades municipales y departamentales.",
        image: "/images/t4.jpeg",
      },
      {
        icon: Users,
        title: "Asesoria Patrimonial y Sucesoral",
        desc: "Diseno de esquemas patrimoniales y sucesorales que se ajusten a la vision y necesidades de cada familia empresaria.",
        image: "/images/t5.jpeg",
      },
    ],
  },
};

const brandColors: Record<BrandKey, string> = {
  solutions: "#1D1D1B",
  projects: "#00A8FF",
  taxlegal: "#F9105E",
};

const homeCardVariants = {
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

const gridCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
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

  const isHome = activeBrand === "solutions";
  const content = !isHome
    ? servicesContent[activeBrand as "projects" | "taxlegal"]
    : null;

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

      <div
        className={`mx-auto px-6 relative z-10 ${isHome ? "max-w-5xl" : "max-w-7xl"}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`services-${activeBrand}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
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
                {isHome ? "Nuestros Servicios" : content!.title}
              </h2>
              <motion.p
                className="mt-4 text-lg max-w-2xl mx-auto text-pretty"
                style={{ color: "#959696" }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                {isHome
                  ? "Soluciones especializadas para cada necesidad de tu negocio."
                  : content!.subtitle}
              </motion.p>
            </motion.div>

            {/* ─── HOME: 2 brand cards ─── */}
            {isHome && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {homeCards.map((card, i) => {
                  const isHovered = hoveredIndex === i;
                  return (
                    <motion.div
                      key={card.brand}
                      className="group relative rounded-2xl bg-white border overflow-hidden cursor-pointer flex flex-col items-center text-center"
                      style={{
                        borderColor: isHovered
                          ? card.color
                          : `${card.color}20`,
                        boxShadow: isHovered
                          ? `0 20px 60px ${card.color}15`
                          : "0 4px 24px rgba(0,0,0,0.04)",
                      }}
                      custom={i}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={homeCardVariants}
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
                          animate={{ scale: isHovered ? 1.05 : 1 }}
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
                        <p
                          className="text-sm md:text-base leading-relaxed mb-8 text-pretty"
                          style={{ color: "#666" }}
                        >
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
            )}

            {/* ─── PROJECTS / TAX‑LEGAL: service card grid ─── */}
            {!isHome && content && (
              <div
                className={`grid grid-cols-1 gap-6 ${
                  content.services.length <= 4
                    ? "md:grid-cols-2 max-w-5xl mx-auto"
                    : "md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {content.services.map((service, i) => {
                  const Icon = service.icon;
                  const isHovered = hoveredIndex === i;
                  return (
                    <motion.div
                      key={service.title}
                      className="group relative rounded-2xl bg-white border overflow-hidden cursor-pointer flex flex-col"
                      style={{
                        borderColor: isHovered
                          ? content.color
                          : `${content.color}15`,
                      }}
                      custom={i}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={gridCardVariants}
                      whileHover={{ y: -8 }}
                      onHoverStart={() => setHoveredIndex(i)}
                      onHoverEnd={() => setHoveredIndex(null)}
                    >
                      {/* Top accent line */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl z-20"
                        style={{ backgroundColor: content.color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Background glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ backgroundColor: content.color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 0.03 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative z-10 p-6 flex-1 flex flex-col">
                        <motion.div
                          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                          style={{ backgroundColor: `${content.color}10` }}
                          animate={{
                            rotate: isHovered ? [0, -5, 5, 0] : 0,
                            scale: isHovered ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon size={26} style={{ color: content.color }} />
                        </motion.div>

                        <h3
                          className="text-lg font-semibold mb-2"
                          style={{ color: "#1D1D1B" }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed mb-4 text-gray-600">
                          {service.desc}
                        </p>

                        <motion.a
                          href="#contacto"
                          className="flex items-center gap-1 text-xs font-semibold cursor-pointer mt-auto"
                          style={{ color: content.color }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Contactanos
                          <ArrowRight size={12} />
                        </motion.a>
                      </div>

                      {/* Image */}
                      {service.image && (
                        <div className="relative w-full h-48 overflow-hidden mt-auto">
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
