"use client";

import React from "react"
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle, MapPin, Phone, Mail, Loader2 } from "lucide-react";

type BrandKey = "solutions" | "projects" | "taxlegal";

interface ContactSectionProps {
  activeBrand: BrandKey;
}

const brandData = {
  solutions: {
    color: "#1D1D1B",
    colorLight: "#1D1D1B10",
    label: "Solutions & Consulting",
    logo: "/images/logo-vertical-solutions-negro.png",
    tagline: "Cuéntanos sobre tu proyecto y te asesoramos integralmente.",
  },
  projects: {
    color: "#00A8FF",
    colorLight: "#00A8FF10",
    label: "Projects",
    logo: "/images/logo-vertical-projects.png",
    tagline: "Descríbenos tu proyecto de ingeniería y lo hacemos realidad.",
  },
  taxlegal: {
    color: "#F9105E",
    colorLight: "#F9105E10",
    label: "Tax & Legal",
    logo: "/images/logo-vertical-taxlegal.png",
    tagline: "Consúltanos tu caso y protegemos tus intereses.",
  },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function ContactSection({ activeBrand }: ContactSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const data = brandData[activeBrand];
  
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Recolectar datos del formulario
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      brand: activeBrand, // Enviamos de qué página viene
      source: "website_form"
    };

    // 2. Enviar a n8n
    try {
      const response = await fetch("https://n8n.magnificapec.com/webhook/7e3e1420-0357-43e4-92e2-17bc91476645", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        e.currentTarget.reset(); // Limpia el formulario
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert("Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error enviando el webhook:", error);
      alert("Perfecto, tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      id="contacto"
    >
      {/* Background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(${data.color} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.02 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Decorative blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.04]"
        style={{ backgroundColor: data.color }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-[0.03]"
        style={{ backgroundColor: data.color }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
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
              style={{ backgroundColor: data.color }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: data.color }}
            >
              Contacto
            </span>
            <motion.div
              className="w-8 h-1 rounded-full"
              style={{ backgroundColor: data.color }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: "#1D1D1B" }}
          >
            Contáctanos
          </h2>
          <motion.p
            className="mt-4 text-lg max-w-2xl mx-auto"
            style={{ color: "#959696" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {data.tagline}
          </motion.p>
        </motion.div>

        {/* Main content: Logo + Form */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Logo side */}
          <motion.div
            className="flex-1 flex flex-col items-center"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <motion.div
              className="relative"
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute -inset-8 rounded-3xl blur-3xl"
                style={{ backgroundColor: data.color, opacity: 0.08 }}
                animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={data.logo || "/placeholder.svg"}
                alt={`SYN3RGIA ${data.label} Logo`}
                className="relative w-64 md:w-80 object-contain"
              />
            </motion.div>

            <motion.div
              className="mt-12 flex flex-col gap-4 w-full max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {[
                { icon: MapPin, text: "BOGOTÁ – IBAGUÉ – EJE CAFETERO" },
                { icon: Phone, text: " +57 3176579037" },
                { icon: Mail, text: "taxlegal.syn3rgia@gmail.com" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: `${data.color}06` }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 6, backgroundColor: `${data.color}12` }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${data.color}15` }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon size={16} style={{ color: data.color }} />
                    </motion.div>
                    <span className="text-sm" style={{ color: "#555" }}>
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Form side */}
          <motion.div
            className="flex-1 w-full max-w-xl"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
          >
            <motion.div
              className="relative p-8 md:p-10 rounded-2xl bg-white shadow-xl border"
              style={{ borderColor: `${data.color}15` }}
              whileHover={{ boxShadow: `0 20px 60px ${data.color}12` }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ backgroundColor: data.color }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle size={56} style={{ color: data.color }} />
                  </motion.div>
                  <h3 className="text-xl font-semibold" style={{ color: "#1D1D1B" }}>
                    Mensaje enviado
                  </h3>
                  <p className="text-sm text-center" style={{ color: "#959696" }}>
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <motion.div custom={0} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={inputVariants}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: focusedField === "name" ? data.color : "#999" }} htmlFor="contact-name">
                      Nombre completo
                    </label>
                    <motion.input
                      id="contact-name"
                      name="name" // IMPORTANTE PARA N8N
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-background outline-none transition-all"
                      style={{ border: `2px solid ${focusedField === "name" ? data.color : "#e5e5e5"}`, color: "#1D1D1B" }}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div custom={1} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={inputVariants}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: focusedField === "email" ? data.color : "#999" }} htmlFor="contact-email">
                      Correo electrónico
                    </label>
                    <motion.input
                      id="contact-email"
                      name="email" // IMPORTANTE PARA N8N
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-background outline-none transition-all"
                      style={{ border: `2px solid ${focusedField === "email" ? data.color : "#e5e5e5"}`, color: "#1D1D1B" }}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.div>

                  {/* Phone */}
                  <motion.div custom={2} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={inputVariants}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: focusedField === "phone" ? data.color : "#999" }} htmlFor="contact-phone">
                      Teléfono
                    </label>
                    <motion.input
                      id="contact-phone"
                      name="phone" // IMPORTANTE PARA N8N
                      type="tel"
                      placeholder="+57 317 657 9037"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-background outline-none transition-all"
                      style={{ border: `2px solid ${focusedField === "phone" ? data.color : "#e5e5e5"}`, color: "#1D1D1B" }}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.div>

                  {/* Service select */}
                  <motion.div custom={3} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={inputVariants}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: focusedField === "service" ? data.color : "#999" }} htmlFor="contact-service">
                      Servicio de interés
                    </label>
                    <motion.select
                      id="contact-service"
                      name="service" // IMPORTANTE PARA N8N
                      className="w-full px-4 py-3 rounded-xl text-sm bg-background outline-none transition-all appearance-none cursor-pointer"
                      style={{ border: `2px solid ${focusedField === "service" ? data.color : "#e5e5e5"}`, color: "#1D1D1B" }}
                      onFocus={() => setFocusedField("service")}
                      onBlur={() => setFocusedField(null)}
                      whileFocus={{ scale: 1.01 }}
                    >
                      <option value="">Selecciona un servicio</option>
                      {activeBrand === "solutions" && (
                        <>
                          <option value="Consultoría Estratégica">Consultoría Estratégica</option>
                          <option value="Planeación Financiera">Planeación Financiera</option>
                          <option value="Crecimiento Empresarial">Crecimiento Empresarial</option>
                          <option value="Capital Humano">Capital Humano</option>
                          <option value="Innovación">Innovación</option>
                          <option value="Auditoría">Auditoría</option>
                        </>
                      )}
                      {activeBrand === "projects" && (
                        <>
                          <option value="Gestión de Proyectos">Gestión de Proyectos</option>
                          <option value="Supervisión de Obra">Supervisión de Obra</option>
                          <option value="Diseño e Ingeniería">Diseño e Ingeniería</option>
                          <option value="Control de Costos">Control de Costos</option>
                          <option value="Seguridad Industrial">Seguridad Industrial</option>
                          <option value="Consultoría Técnica">Consultoría Técnica</option>
                        </>
                      )}
                      {activeBrand === "taxlegal" && (
                        <>
                          <option value="Asesoramiento Fiscal">Asesoramiento Fiscal</option>
                          <option value="Litigio y Defensa">Litigio y Defensa</option>
                          <option value="Compliance">Compliance</option>
                          <option value="Derecho Corporativo">Derecho Corporativo</option>
                          <option value="Derecho Laboral">Derecho Laboral</option>
                          <option value="Contabilidad">Contabilidad</option>
                        </>
                      )}
                    </motion.select>
                  </motion.div>

                  {/* Message */}
                  <motion.div custom={4} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={inputVariants}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: focusedField === "message" ? data.color : "#999" }} htmlFor="contact-message">
                      Mensaje
                    </label>
                    <motion.textarea
                      id="contact-message"
                      name="message" // IMPORTANTE PARA N8N
                      required
                      rows={4}
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      className="w-full px-4 py-3 rounded-xl text-sm bg-background outline-none transition-all resize-none"
                      style={{ border: `2px solid ${focusedField === "message" ? data.color : "#e5e5e5"}`, color: "#1D1D1B" }}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div custom={5} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={inputVariants}>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ backgroundColor: data.color }}
                      whileHover={!isLoading ? { scale: 1.02, boxShadow: `0 12px 35px ${data.color}40` } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {isLoading ? "Enviando..." : "Enviar mensaje"}
                      {!isLoading && (
                        <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                          <Send size={16} />
                        </motion.span>
                      )}
                      {isLoading && <Loader2 size={16} className="animate-spin" />}
                    </motion.button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}