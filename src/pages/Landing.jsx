import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Scissors,
  CalendarClock,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Menu,
  X,
  Clock,
  TrendingUp,
  Smartphone,
  ChevronDown,
  PlayCircle,
  Zap,
  Heart,
} from "lucide-react";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Turnos gestionados", value: "15,000+", icon: CalendarClock },
    { label: "Barberías activas", value: "320+", icon: Users },
    { label: "Tiempo ahorrado", value: "12h/sem", icon: Clock },
    { label: "Satisfacción", value: "98%", icon: Heart },
  ];

  const features = [
    {
      icon: CalendarClock,
      title: "Agenda Inteligente",
      description: "Sistema avanzado de turnos con detección de conflictos, lista de espera automática y notificaciones smart.",
      details: ["Sincronización en tiempo real", "Recordatorios automáticos", "Lista de espera inteligente"]
    },
    {
      icon: Users,
      title: "CRM Completo",
      description: "Base de datos de clientes con historial, preferencias, fotografías de cortes y fidelización automática.",
      details: ["Historial completo", "Fotos de cortes", "Sistema de puntos"]
    },
    {
      icon: BarChart3,
      title: "Analytics Avanzado",
      description: "Dashboard con métricas en tiempo real, predicciones de demanda y reportes financieros automáticos.",
      details: ["Métricas en vivo", "Predicciones IA", "Reportes PDF"]
    },
    {
      icon: ShieldCheck,
      title: "Seguridad Enterprise",
      description: "Cifrado de extremo a extremo, backup automático en múltiples ubicaciones y compliance GDPR.",
      details: ["Cifrado E2E", "Backup automático", "Compliance total"]
    },
    {
      icon: Smartphone,
      title: "App Móvil Nativa",
      description: "Aplicación móvil completa para barberos y clientes con modo offline y sincronización automática.",
      details: ["Modo offline", "Push notifications", "Geolocalización"]
    },
    {
      icon: Zap,
      title: "Automatización Total",
      description: "Flujos automáticos para confirmaciones, cobros, marketing y seguimiento post-servicio.",
      details: ["Cobros automáticos", "Marketing automático", "Follow-up inteligente"]
    },
  ];

  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Dueño de 'Estilo Urbano'",
      content: "Pasé de perder 3 horas diarias organizando turnos a enfocarme 100% en cortar. El ROI fue inmediato.",
      rating: 5,
      location: "Montevideo, Uruguay"
    },
    {
      name: "Roberto Silva",
      role: "Barbero Independiente",
      content: "Mis clientes ahora reservan online y yo veo mi semana organizada. Aumenté 40% mis ingresos en 6 meses.",
      rating: 5,
      location: "Buenos Aires, Argentina"
    },
    {
      name: "Marina López",
      role: "Gerente 'Barbería Premium'",
      content: "Manejo 5 barberos y 200+ turnos semanales sin estrés. El dashboard es adictivo, veo todo en tiempo real.",
      rating: 5,
      location: "Santiago, Chile"
    }
  ];

  const faqs = [
    {
      q: "¿Realmente es gratis el plan Plus?",
      a: "Sí, completamente gratis. Sin trucos, sin tarjeta de crédito, sin límite de tiempo. Perfecto para barberías que están empezando o quieren probar el sistema."
    },
    {
      q: "¿Qué pasa con mis datos si cancelo?",
      a: "Tus datos son tuyos para siempre. Puedes exportar toda la información en cualquier momento y nosotros eliminamos todo de nuestros servidores cuando lo solicites."
    },
    {
      q: "¿Funciona sin internet?",
      a: "La app móvil funciona offline para operaciones básicas como ver turnos y marcar asistencias. Se sincroniza automáticamente cuando vuelve la conexión."
    },
    {
      q: "¿Puedo personalizar los servicios y precios?",
      a: "Totalmente. Servicios ilimitados, precios variables, promociones, paquetes, descuentos por cliente frecuente... Todo se adapta a tu negocio."
    }
  ];

  const plans = [
    {
      name: "Plan Plus",
      highlight: "Perfecto para empezar",
      description: "Todo lo esencial para digitalizar tu barbería sin invertir un peso.",
      price: "Gratis",
      originalPrice: null,
      features: [
        "Hasta 50 turnos/mes",
        "1 barbero principal",
        "Cliente básico",
        "Soporte por email",
        "Reportes básicos"
      ],
      cta: "Empezar gratis",
      to: "/register",
      featured: false,
      badge: null
    },
    {
      name: "Plan Premium",
      highlight: "Para barberías serias",
      description: "La suite completa para escalar tu negocio y dominar el mercado local.",
      price: "$2,990",
      originalPrice: "$4,990",
      features: [
        "Turnos y servicios ilimitados",
        "Barberos ilimitados",
        "CRM completo con fotos",
        "Analytics avanzado",
        "App móvil incluida",
        "Soporte prioritario 24/7",
        "Automatizaciones completas",
        "API para integraciones"
      ],
      cta: "Upgrade a Premium",
      to: "/login",
      featured: true,
      badge: "70% OFF"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          style={{ y }}
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
          className="absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div className="absolute bottom-0 left-1/2 h-96 w-[60rem] -translate-x-1/2 bg-gradient-to-t from-sky-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600 blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600">
                <Scissors className="h-5 w-5 text-slate-950 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold tracking-wider text-emerald-400 uppercase">
                Barbería
              </div>
              <div className="text-lg font-bold text-slate-50 -mt-1">
                Fullstack
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {["Características", "Testimonios", "Precios", "FAQ"].map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-slate-300 hover:text-emerald-400 transition-colors group"
              >
                {item}
                <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition-all hover:border-emerald-500 hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
            >
              Empezar gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col gap-4 px-4 py-6">
                {["Características", "Testimonios", "Precios", "FAQ"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <Link
                  to="/login"
                  className="mt-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Iniciar sesión
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-4 py-20 lg:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Más de 15,000 turnos gestionados este mes</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                  La barbería del{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      futuro
                    </span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 to-blue-500 origin-left rounded-full"
                    />
                  </span>
                  <br />
                  es hoy
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-slate-300 max-w-2xl leading-relaxed"
                >
                  Olvídate de cuadernos, WhatsApps desordenados y clientes perdidos. 
                  Barbería Fullstack es el único sistema que necesitás para profesionalizar 
                  tu negocio y triplicar tu eficiencia en menos de 30 días.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/registro"
                    className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 px-8 py-4 text-lg font-semibold text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
                  >
                    Empezar gratis ahora
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="group flex items-center justify-center gap-3 rounded-full border-2 border-slate-600 px-8 py-4 text-lg font-medium text-slate-200 transition-all hover:border-emerald-500 hover:bg-emerald-500/10">
                    <PlayCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Ver demo (2 min)
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center gap-6 pt-4"
                >
                  {["Sin tarjeta de crédito", "Setup en 5 minutos", "Soporte en español"].map((feature, i) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Interactive Dashboard Preview */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-3xl rounded-3xl" />
                <div className="relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
                  {/* Dashboard Header */}
                  <div className="border-b border-slate-800/50 bg-slate-950/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-medium text-slate-200">Dashboard en vivo</span>
                      </div>
                      <div className="text-xs text-slate-400">Actualizado hace 1 min</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {stats.slice(0, 4).map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="rounded-2xl border border-slate-800/50 bg-slate-900/50 p-4"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="h-4 w-4 text-emerald-400" />
                              <span className="text-xs text-slate-400">{stat.label}</span>
                            </div>
                            <div className="text-xl font-bold text-slate-50">{stat.value}</div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Recent appointments */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-slate-200">Próximos turnos</div>
                      {[
                        { time: "14:30", client: "Carlos M.", service: "Corte + Barba", status: "confirmed" },
                        { time: "15:00", client: "Roberto S.", service: "Degradé", status: "pending" },
                        { time: "15:30", client: "Juan P.", service: "Corte clásico", status: "confirmed" },
                      ].map((appointment, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          className="flex items-center justify-between rounded-xl border border-slate-800/30 bg-slate-800/30 px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full ${appointment.status === 'confirmed' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                            <div>
                              <div className="text-sm font-medium text-slate-200">{appointment.client}</div>
                              <div className="text-xs text-slate-400">{appointment.service}</div>
                            </div>
                          </div>
                          <div className="text-sm font-mono text-emerald-400">{appointment.time}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="relative py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10" />
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center group"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 group-hover:from-emerald-500/30 group-hover:to-blue-500/30 transition-colors">
                        <Icon className="h-8 w-8 text-emerald-400" />
                      </div>
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-slate-50 mb-2">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="características" className="py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
                Todas las herramientas que necesitás
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-600 bg-clip-text text-transparent">
                  en un solo lugar
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Desde la gestión básica hasta analytics avanzado, tenemos todo cubierto para que te enfoques en lo que mejor sabés hacer.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/50 p-8 hover:border-emerald-500/50 transition-all duration-500 hover:bg-slate-900/70"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7 text-emerald-400" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-slate-50 mb-3 group-hover:text-emerald-300 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-slate-300 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                            <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonios" className="py-20 lg:py-32 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
                Más de 300 barberías
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-600 bg-clip-text text-transparent">
                  ya confiaron en nosotros
                </span>
              </h2>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl lg:text-2xl text-slate-200 mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>
                  
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-slate-50">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-emerald-400 text-sm">
                      {testimonials[activeTestimonial].role}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {testimonials[activeTestimonial].location}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex justify-center gap-3 mt-12">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-3 w-3 rounded-full transition-all ${
                      i === activeTestimonial 
                        ? "bg-emerald-400 w-8" 
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="precios" className="py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
                Precio justo para cada etapa
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-600 bg-clip-text text-transparent">
                  de tu barbería
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Empezá gratis y escalá cuando estés listo. Sin sorpresas, sin letra chica.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-500 ${
                    plan.featured
                      ? "border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 scale-105 lg:scale-110 shadow-2xl shadow-emerald-500/20"
                      : "border border-slate-800/50 bg-slate-900/50 hover:border-slate-700/50"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-emerald-400 to-blue-600 px-12 py-2 text-xs font-bold text-slate-950">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-medium text-emerald-400 mb-2">
                        {plan.highlight}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-50">
                        {plan.name}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-slate-50">
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-lg text-slate-400 line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                      {plan.price !== "Gratis" && (
                        <span className="text-slate-400">/mes</span>
                      )}
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      {plan.description}
                    </p>

                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                          <span className="text-slate-200">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={plan.to}
                      className={`block w-full text-center rounded-2xl px-6 py-4 font-semibold transition-all ${
                        plan.featured
                          ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-slate-950 shadow-xl hover:shadow-2xl hover:scale-105"
                          : "border-2 border-slate-700 text-slate-200 hover:border-emerald-500 hover:bg-emerald-500/10"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 lg:py-32 bg-slate-900/30">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
                Preguntas frecuentes
              </h2>
              <p className="text-xl text-slate-300">
                Todo lo que necesitás saber antes de empezar
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/50"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-800/30"
                  >
                    <span className="text-lg font-medium text-slate-50">{faq.q}</span>
                    <ChevronDown 
                      className={`h-5 w-5 text-slate-400 transition-transform ${
                        activeFaq === i ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-slate-300 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 lg:py-32">
          <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
                ¿Listo para revolucionar
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-600 bg-clip-text text-transparent">
                  tu barbería?
                </span>
              </h2>
              
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Más de 300 barberías ya triplicaron su eficiencia. Tu turno es ahora.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/registro"
                  className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 px-8 py-4 text-lg font-semibold text-slate-950 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all"
                >
                  Empezar gratis en 30 segundos
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-sm text-slate-400">
                  Sin tarjeta • Sin compromiso • Cancelás cuando quieras
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950/80 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600">
                  <Scissors className="h-5 w-5 text-slate-950" />
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-400">BARBERÍA</div>
                  <div className="text-lg font-bold text-slate-50 -mt-1">Fullstack</div>
                </div>
              </Link>
              <p className="text-slate-400 max-w-md mb-6">
                La plataforma más completa para gestionar tu barbería. Hecha por desarrolladores, pensada para barberos.
              </p>
              <div className="text-xs text-slate-500">
                © 2025 Barbería Fullstack. Proyecto académico - ORT Universidad.
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-50 mb-4">Producto</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#características" className="hover:text-emerald-400 transition-colors">Características</a></li>
                <li><a href="#precios" className="hover:text-emerald-400 transition-colors">Precios</a></li>
                <li><a href="/login" className="hover:text-emerald-400 transition-colors">Iniciar sesión</a></li>
                <li><a href="/registro" className="hover:text-emerald-400 transition-colors">Crear cuenta</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-50 mb-4">Soporte</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                <li><a href="mailto:soporte@barberiafullstack.com" className="hover:text-emerald-400 transition-colors">Contacto</a></li>
                <li><span>+598 99 123 456</span></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
