"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Target, Shield, Building2, Scale, Briefcase, Check } from "lucide-react";

type BrandKey = "solutions" | "projects" | "taxlegal";

interface AboutSectionProps {
  activeBrand: BrandKey;
}

const aboutContent = {
  solutions: {
    title: "Quienes Somos",
    text: "Somos una empresa familiar, esto habla de nuestros valores mas profundos de lo que somos como firma y del proposito que tenemos al velar por los intereses de nuestros clientes. Nos esforzamos por entender la cultura y la vision de nuestros clientes, lo que, junto con el respeto por la confianza depositada, nos permite convertirnos en sus asesores integrales en todas las areas de conocimiento de nuestra firma.",
    color: "#1D1D1B",
    icon: Users,
    highlights: [
      { icon: Users, label: "Empresa Familiar", desc: "Valores profundos y proposito claro" },
      { icon: Target, label: "Vision Integral", desc: "Asesores en todas las areas de conocimiento" },
      { icon: Shield, label: "Confianza", desc: "Respeto por la confianza depositada" },
    ],
    image: "/images/solutions-team.png",
    bulletPoints: [
      "Asesoria integral de negocios",
      "Cultura de valores familiares",
      "Vision estrategica a largo plazo",
    ],
  },
  projects: {
    title: "Nuestro Enfoque",
    text: "Actuamos esencialmente como integradores de los diferentes actores que deben reunirse para realizar la construccion de un proyecto. Prestamos servicios especializados de consultoria en arquitectura e ingenieria, abarcando desde estudios urbanisticos hasta el diseno arquitectonico y el control de costos de obra.",
    color: "#00A8FF",
    icon: Building2,
    highlights: [
      { icon: Building2, label: "Integradores", desc: "Reunimos los actores clave de cada proyecto" },
      { icon: Target, label: "Consultoria Especializada", desc: "Arquitectura e ingenieria integral" },
      { icon: Shield, label: "Control Total", desc: "Presupuestos, programacion y costos de obra" },
    ],
    image: "/images/project-engineer-2.png",
    bulletPoints: [
      "Integracion de actores del proyecto",
      "Consultoria en arquitectura e ingenieria",
      "Control de costos y programacion de obra",
    ],
  },
  taxlegal: {
    title: "Nuestra Practica",
    text: "Nuestra practica se centra en asesoria de derecho tributario internacional para multinacionales, consultoria tributaria para empresas locales, acompanamiento en procesos de fiscalizacion ante la DIAN y autoridades territoriales, y asesoria patrimonial y sucesoral disenada a la medida de cada familia empresaria.",
    color: "#F9105E",
    icon: Scale,
    highlights: [
      { icon: Scale, label: "Tributario Internacional", desc: "Expansion, fusiones y adquisiciones" },
      { icon: Briefcase, label: "Consultoria Local", desc: "Diagnostico y eficiencias tributarias" },
      { icon: Shield, label: "Asesoria Patrimonial", desc: "Esquemas a medida para familias empresarias" },
    ],
    image: "/images/task-woman.png",
    bulletPoints: [
      "Derecho tributario internacional y local",
      "Acompanamiento en fiscalizacion ante la DIAN",
      "Asesoria patrimonial y sucesoral",
    ],
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 },
  },
};

export default function AboutSection({ activeBrand }: AboutSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const content = aboutContent[activeBrand];

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden" id="about">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full opacity-[0.03]"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${content.color}, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`about-${activeBrand}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Section header */}
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={0}
            >
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.div
                  className="w-8 h-1 rounded-full"
                  style={{ backgroundColor: content.color }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: content.color }}>
                  {activeBrand === "solutions" ? "Nosotros" : activeBrand === "projects" ? "Enfoque" : "Mision"}
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
            </motion.div>

            {/* Content grid */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Image side - now first on desktop for visual interest */}
              <motion.div
                className="flex-1 order-2 lg:order-1"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={slideInLeft}
              >
                <div className="relative">
                  {/* Animated border frame */}
                  <motion.div
                    className="absolute -inset-3 rounded-2xl border-2"
                    style={{ borderColor: `${content.color}30` }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />

                  {/* Glow */}
                  <motion.div
                    className="absolute -inset-4 rounded-2xl blur-2xl"
                    style={{ backgroundColor: content.color, opacity: 0.08 }}
                    animate={{
                      opacity: [0.05, 0.12, 0.05],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <img
                    src={content.image || "/placeholder.svg"}
                    alt={
                      activeBrand === "solutions"
                        ? "Equipo SYN3RGIA"
                        : activeBrand === "projects"
                          ? "Ingeniero revisando planos"
                          : "Profesional de Tax & Legal trabajando"
                    }
                    className="relative rounded-2xl w-full max-w-md mx-auto object-cover shadow-xl"
                    style={{ aspectRatio: "4/5" }}
                  />

                  {/* Decorative elements on image */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 rounded-xl"
                    style={{ backgroundColor: `${content.color}15`, border: `2px solid ${content.color}30` }}
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -bottom-3 -left-3 w-14 h-14 rounded-full"
                    style={{ backgroundColor: content.color }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>

              {/* Text + Highlights */}
              <motion.div
                className="flex-1 order-1 lg:order-2"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={slideInRight}
              >
                <p
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: "#555" }}
                >
                  {content.text}
                </p>

                {/* Bullet points with animation */}
                <div className="mb-8 flex flex-col gap-3">
                  {content.bulletPoints.map((point, i) => (
                    <motion.div
                      key={point}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: content.color }}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.6 + i * 0.15, type: "spring", bounce: 0.5 }}
                      >
                        <Check size={14} className="text-white" />
                      </motion.div>
                      <span className="text-sm font-medium" style={{ color: "#444" }}>{point}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Highlight cards */}
                <div className="flex flex-col gap-4">
                  {content.highlights.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        className="flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer"
                        style={{ backgroundColor: `${content.color}06` }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 + i * 0.15 }}
                        whileHover={{
                          x: 10,
                          backgroundColor: `${content.color}12`,
                          boxShadow: `0 4px 20px ${content.color}15`,
                        }}
                      >
                        <motion.div
                          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${content.color}15` }}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          <Icon size={22} style={{ color: content.color }} />
                        </motion.div>
                        <div>
                          <h3
                            className="text-base font-semibold"
                            style={{ color: "#1D1D1B" }}
                          >
                            {item.label}
                          </h3>
                          <p className="text-sm" style={{ color: "#959696" }}>
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
