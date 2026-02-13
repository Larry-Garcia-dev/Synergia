"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  BarChart3,
  Calculator,
  ClipboardCheck,
  Building2,
  HardHat,
  Ruler,
  FileText,
  Gavel,
  ShieldCheck,
  TrendingUp,
  Users,
  Lightbulb,
  Scale,
  ArrowRight,
} from "lucide-react";

type BrandKey = "solutions" | "projects" | "taxlegal";

interface ServicesSectionProps {
  activeBrand: BrandKey;
}

const servicesContent = {
  solutions: {
    title: "Nuestros Servicios",
    subtitle: "Soluciones estrategicas para cada area de tu negocio.",
    color: "#1D1D1B",
    services: [
      {
        icon: BarChart3,
        title: "Consultoria Estrategica",
        desc: "Analisis integral del negocio para identificar oportunidades de crecimiento y optimizacion de recursos.",
      },
      {
        icon: Calculator,
        title: "Planeacion Financiera",
        desc: "Estructuracion financiera y planeacion fiscal para maximizar la rentabilidad de tu empresa.",
      },
      {
        icon: TrendingUp,
        title: "Crecimiento Empresarial",
        desc: "Estrategias de expansion y desarrollo de mercado adaptadas a tu industria y objetivos.",
      },
      {
        icon: Users,
        title: "Capital Humano",
        desc: "Gestion del talento, politicas laborales y desarrollo organizacional para equipos de alto rendimiento.",
      },
      {
        icon: Lightbulb,
        title: "Innovacion",
        desc: "Transformacion digital y optimizacion de procesos para mantener competitividad en el mercado.",
      },
      {
        icon: ClipboardCheck,
        title: "Auditoria",
        desc: "Revision integral de procesos, finanzas y cumplimiento normativo para tu tranquilidad.",
      },
    ],
  },
  projects: {
    title: "Servicios de Ingenieria",
    subtitle: "Gestion integral de proyectos con precision y excelencia tecnica.",
    color: "#00A8FF",
    services: [
      {
        icon: Building2,
        title: "Gestion de Proyectos",
        desc: "Administracion completa de proyectos de construccion e ingenieria civil desde la planeacion hasta la entrega.",
      },
      {
        icon: HardHat,
        title: "Supervision de Obra",
        desc: "Control de calidad y seguimiento tecnico en cada etapa del proceso constructivo.",
      },
      {
        icon: Ruler,
        title: "Diseno e Ingenieria",
        desc: "Soluciones de diseno estructural, arquitectonico e instalaciones especiales.",
      },
      {
        icon: ClipboardCheck,
        title: "Control de Costos",
        desc: "Presupuestos detallados, control de gastos y optimizacion de recursos para cada proyecto.",
      },
      {
        icon: ShieldCheck,
        title: "Seguridad Industrial",
        desc: "Protocolos de seguridad y normativas para garantizar la integridad de tu equipo de trabajo.",
      },
      {
        icon: TrendingUp,
        title: "Consultoria Tecnica",
        desc: "Asesoria especializada para resolver problemas tecnicos y optimizar procesos constructivos.",
      },
    ],
  },
  taxlegal: {
    title: "Servicios Legales y Fiscales",
    subtitle: "Proteccion juridica y optimizacion fiscal a tu medida.",
    color: "#F9105E",
    services: [
      {
        icon: FileText,
        title: "Asesoramiento Fiscal",
        desc: "Planeacion tributaria estrategica para personas fisicas y morales, maximizando beneficios fiscales.",
      },
      {
        icon: Gavel,
        title: "Litigio y Defensa",
        desc: "Representacion legal en procedimientos administrativos, fiscales y judiciales.",
      },
      {
        icon: ShieldCheck,
        title: "Compliance",
        desc: "Programas de cumplimiento normativo y prevencion de riesgos legales para tu empresa.",
      },
      {
        icon: Scale,
        title: "Derecho Corporativo",
        desc: "Constitucion de sociedades, contratos mercantiles y operaciones corporativas.",
      },
      {
        icon: Users,
        title: "Derecho Laboral",
        desc: "Asesoria en relaciones laborales, contratos de trabajo y procedimientos ante autoridades laborales.",
      },
      {
        icon: Calculator,
        title: "Contabilidad",
        desc: "Servicios contables integrales, dictamenes fiscales y reportes financieros.",
      },
    ],
  },
};

const cardVariants = {
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

export default function ServicesSection({ activeBrand }: ServicesSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const content = servicesContent[activeBrand];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      id="services"
      style={{ backgroundColor: `${content.color}04` }}
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${content.color} 0, ${content.color} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "30px 30px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "30px 30px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Decorative circles */}
      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
        style={{ backgroundColor: content.color, opacity: 0.03 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full"
        style={{ backgroundColor: content.color, opacity: 0.04 }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
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
                  style={{ backgroundColor: content.color }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: content.color }}>
                  Servicios
                </span>
                <motion.div
                  className="w-8 h-1 rounded-full"
                  style={{ backgroundColor: content.color }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </motion.div>

              <h2
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{ color: "#1D1D1B" }}
              >
                {content.title}
              </h2>
              <motion.p
                className="mt-4 text-lg max-w-2xl mx-auto"
                style={{ color: "#959696" }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                {content.subtitle}
              </motion.p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.services.map((service, i) => {
                const Icon = service.icon;
                const isHovered = hoveredIndex === i;
                return (
                  <motion.div
                    key={service.title}
                    className="group relative p-6 rounded-2xl bg-white border overflow-hidden cursor-pointer"
                    style={{ borderColor: isHovered ? content.color : `${content.color}15` }}
                    custom={i}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredIndex(i)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    {/* Top accent line - animates on hover */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ backgroundColor: content.color }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Background glow on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ backgroundColor: content.color }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 0.03 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${content.color}10` }}
                        animate={{
                          rotate: isHovered ? [0, -5, 5, 0] : 0,
                          scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon
                          size={26}
                          style={{ color: content.color }}
                        />
                      </motion.div>

                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{ color: "#1D1D1B" }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "#777" }}
                      >
                        {service.desc}
                      </p>

                      {/* Learn more link - appears on hover */}
                      <motion.a
                        href="#contacto"
                        className="flex items-center gap-1 text-xs font-semibold cursor-pointer"
                        style={{ color: content.color }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        Contactanos
                        <ArrowRight size={12} />
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
