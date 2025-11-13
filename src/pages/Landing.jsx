import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  ChevronDown,
  PlayCircle,
  Zap,
  Heart,
  User,
} from "lucide-react";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("token");
    if (logged) {
        navigate ("/dashboard");
    }
  }, []);

  // Stats enfocadas en beneficios que el cliente entiende
  const stats = [
    { label: "Servicios activos en tu menú", value: "25+", icon: Scissors },
    { label: "Categorías ordenadas", value: "6", icon: BarChart3 },
    { label: "Clientes atendidos al mes", value: "120+", icon: Users },
    { label: "Horas de desorden evitadas", value: "20h+", icon: CalendarClock },
  ];

  // Features comerciales (no técnicas) y reales/realistas
  const features = [
    {
      icon: Scissors,
      title: "Servicios claros, precios claros",
      description:
        "Definí qué ofrecés y cuánto cobrás en un solo lugar. Sin tachones, sin confusiones, sin listas viejas pegadas en la pared.",
      details: [
        "Tu lista de servicios siempre actualizada",
        "Precios ordenados y visibles",
        "Menos errores al cobrar",
      ],
    },
    {
      icon: BarChart3,
      title: "Todo tu catálogo bajo control",
      description:
        "Organizá los servicios en categorías (corte, color, barba, combos) y hacé que tu barbería se vea tan profesional como trabaja.",
      details: [
        "Categorías personalizadas",
        "Catálogo más fácil de explicar",
        "Mejor experiencia para el cliente",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Acceso solo para tu equipo",
      description:
        "Cada acción queda detrás de un inicio de sesión. Solo entra quien vos quieras, con usuario y contraseña.",
      details: [
        "Área de administración protegida",
        "Control total de quién entra",
        "Información siempre privada",
      ],
    },
    {
      icon: CalendarClock,
      title: "Panel que te muestra la realidad",
      description:
        "En tu pantalla inicial ves de un vistazo servicios activos, categorías y cómo viene tu mes.",
      details: [
        "Resumen rápido del negocio",
        "Indicadores simples de entender",
        "Sin planillas ni cuentas mentales",
      ],
    },
    {
      icon: Zap,
      title: "Rápido y moderno",
      description:
        "La interfaz es ligera, animada y pensada para usarse todos los días sin volverte loco buscando cosas.",
      details: [
        "Diseño limpio y elegante",
        "Flujo similar al de apps modernas",
        "Funciona bien en computadora y notebook",
      ],
    },
    {
      icon: Heart,
      title: "Listo para crecer con vos",
      description:
        "Pensado para que mañana puedas sumar turnos, barberos y recordatorios sin cambiar de sistema.",
      details: [
        "Base preparada para turnos online",
        "Espacio para sumar barberos",
        "Ideal como primer sistema serio",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Dueño de barbería",
      content:
        "Antes tenía precios en papeles y notas de WhatsApp. Ahora tengo todo en un solo panel y siento el negocio mucho más ordenado.",
      rating: 5,
      location: "Montevideo, Uruguay",
    },
    {
      name: "Roberto Silva",
      role: "Barbero independiente",
      content:
        "Lo que más valoro es que en dos minutos sé qué ofrezco, cuánto cobro y qué cosas quiero agregar después. Me ayudó a pensar mi barbería como un negocio.",
      rating: 5,
      location: "Buenos Aires, Argentina",
    },
    {
      name: "Marina López",
      role: "Gestora de barbería",
      content:
        "Es simple, se ve profesional y me da seguridad mostrarlo como parte de la experiencia de la barbería.",
      rating: 5,
      location: "Santiago, Chile",
    },
  ];

  const faqs = [
    {
      q: "¿Qué gano usando BarberApp?",
      a: "Orden. Tenés tus servicios, categorías y precios en un solo lugar, con una pantalla inicial que te muestra cómo viene tu barbería. Menos improvisación, más control.",
    },
    {
      q: "¿Es seguro?",
      a: "Sí. Tu panel de administración está protegido con usuario y contraseña. Nadie entra a ver ni tocar tus datos sin pasar por el inicio de sesión.",
    },
    {
      q: "¿Es complicado de usar?",
      a: "No. Está pensado para gente que no vive pegada a la computadora. Menús claros, textos simples y todo donde esperás encontrarlo.",
    },
    {
      q: "¿Qué puedo hacer hoy y qué vendrá después?",
      a: "Hoy podés gestionar tus servicios, categorías, planes y ver un dashboard de tu barbería. El sistema está preparado para que mañana puedas sumar turnos online, barberos y más estadísticas.",
    },
  ];

  const plans = [
    {
      name: "Plan Plus",
      highlight: "Ideal para empezar",
      description:
        "Para barberías que quieren dejar el cuaderno y dar el primer paso hacia una gestión más profesional.",
      price: "Gratis",
      originalPrice: null,
      features: [
        "Empezás sin pagar nada",
        "Panel para ver tu barbería de un vistazo",
        "Gestión básica de servicios y categorías",
        "Perfecto para una sola sucursal",
      ],
      cta: "Empezar gratis",
      to: "/register",
      featured: false,
      badge: null,
    },
    {
      name: "Plan Premium",
      highlight: "Para barberías que crecen",
      description:
        "Cuando el negocio despega y necesitás más libertad para cargar, probar y expandir tu catálogo sin pensar en límites.",
      price: "$400/mes",
      originalPrice: "$1350/mes",
      features: [
        "Sin límites prácticos para tu catálogo",
        "Pensado para varios puestos de trabajo",
        "Más espacio para probar nuevos servicios",
        "Base lista para sumar turnos y barberos",
        "Soporte prioritario y evolución del sistema",
      ],
      cta: "Pasar a Premium",
      to: "/login",
      featured: true,
      badge: "70% OFF",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      {/* Fondo animado con la paleta del login (verde + celeste) */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          style={{ y }}
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
          className="absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl"
        />
        <div className="absolute bottom-0 left-1/2 h-96 w-[60rem] -translate-x-1/2 bg-gradient-to-t from-emerald-500/15 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500">
                <Scissors className="h-5 w-5 text-slate-950 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">
                Barber
              </div>
              <div className="text-lg font-bold text-slate-50 -mt-1">
                App
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {["Características", "Testimonios", "Precios", "FAQ"].map((item) => (
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
              className="hidden md:flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition-all hover:border-emerald-400 hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
            >
              Crear cuenta
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
              className="lg:hidden border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-xl"
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
              {/* Texto hero comercial */}
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
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Transformá tu barbería en un negocio ordenado</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                  Menos papel,
                  <br />
                  <span className="relative">
                    <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-sky-500 bg-clip-text text-transparent">
                      más barbería.
                    </span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 to-sky-400 origin-left rounded-full"
                    />
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-slate-300 max-w-2xl leading-relaxed"
                >
                  BarberApp te da un panel claro para ver tus servicios,
                  categorías y cómo viene tu barbería. Sin cuadernos, sin listas
                  sueltas, sin inventos. Todo ordenado, con imagen profesional.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/register"
                    className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-8 py-4 text-lg font-semibold text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
                  >
                    Crear cuenta gratis
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="group flex items-center justify-center gap-3 rounded-full border-2 border-slate-600 px-8 py-4 text-lg font-medium text-slate-200 transition-all hover:border-emerald-400 hover:bg-emerald-400/10">
                    <PlayCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Ver cómo se ve por dentro
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center gap-6 pt-4"
                >
                  {[
                    "Panel pensado para usar todos los días",
                    "Nada de cuadernos ni notas perdidas",
                    "Imagen profesional frente a tus clientes",
                  ].map((feature, i) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-400"
                    >
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Dashboard ilustrativa adaptada a la paleta y al negocio */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/25 to-sky-500/25 blur-3xl rounded-3xl" />
                <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
                  {/* Header del dashboard */}
                  <div className="border-b border-slate-800/70 bg-slate-950/70 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-medium text-slate-200">
                          Dashboard de tu barbería
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        Vista general · Hoy
                      </div>
                    </div>
                  </div>

                  {/* Contenido del dashboard */}
                  <div className="p-6 space-y-6">
                    {/* Stats cards */}
                    <div className="grid grid-cols-2 gap-4">
                      {stats.slice(0, 4).map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="rounded-2xl border border-slate-800/60 bg-slate-900/70 p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-emerald-400" />
                                <span className="text-xs text-slate-400">
                                  {stat.label}
                                </span>
                              </div>
                            </div>
                            <div className="text-lg font-semibold text-slate-50">
                              {stat.value}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Bloque de “Hoy en tu barbería” */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-slate-200">
                        Hoy en tu barbería
                      </div>
                      {[
                        {
                          title: "Revisar lista de servicios",
                          desc: "Asegurate de que todo lo que ofrecés está actualizado.",
                          emphasis: "2 cambios sugeridos",
                        },
                        {
                          title: "Mirar categorías",
                          desc: "Cortes, barbas, color... todo sigue ordenado.",
                          emphasis: "OK",
                        },
                        {
                          title: "Ver cómo viene el mes",
                          desc: "Un vistazo rápido para sentir el negocio bajo control.",
                          emphasis: "Progreso estable",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-900/70 px-4 py-3"
                        >
                          <div>
                            <div className="text-sm font-semibold text-slate-50">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-400">
                              {item.desc}
                            </div>
                          </div>
                          <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs text-emerald-300 border border-emerald-400/40">
                            {item.emphasis}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Banner con la misma paleta */}
        <section className="relative py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-emerald-500/10" />
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
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900/70 border border-slate-800/60 shadow-lg shadow-slate-900/80 group-hover:border-emerald-400/70 transition-colors">
                        <Icon className="h-8 w-8 text-emerald-400" />
                      </div>
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-slate-50 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-300">{stat.label}</div>
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
                Todo lo que necesitás
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                  para gestionar tu barbería sin caos
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Menos tiempo explicando precios, menos dudas sobre qué ofrecés,
                más tiempo haciendo lo que mejor sabés hacer: cortar.
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
                    className="group relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/70 p-8 hover:border-emerald-400/60 transition-all duration-500 hover:bg-slate-900/90"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 to-sky-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-sky-400/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7 text-emerald-300" />
                      </div>

                      <h3 className="text-xl font-semibold text-slate-50 mb-3 group-hover:text-emerald-200 transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-slate-300 mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-slate-400"
                          >
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
        <section id="testimonios" className="py-20 lg:py-32 bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
                Una barbería ordenada
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                  se siente distinta desde el primer día
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
                    {[...Array(testimonials[activeTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-6 w-6 text-yellow-400 fill-current"
                        />
                      )
                    )}
                  </div>

                  <blockquote className="text-xl lg:text-2xl text-slate-200 mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>

                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-slate-50">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-emerald-300 text-sm">
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
                Empezá sin riesgo
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                  y escalá cuando tu barbería lo pida
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Probás con el plan Plus sin pagar nada. Cuando el papel quede
                definitivamente atrás, pasás a Premium y seguís con todo tu
                historial intacto.
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
                      ? "border-2 border-emerald-400/70 bg-gradient-to-br from-emerald-500/15 to-sky-500/15 scale-105 lg:scale-110 shadow-2xl shadow-emerald-500/25"
                      : "border border-slate-800/60 bg-slate-900/70 hover:border-slate-700/70"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-emerald-400 to-sky-400 px-12 py-2 text-xs font-bold text-slate-950">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-medium text-emerald-300 mb-2">
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
                          ? "bg-gradient-to-r from-emerald-400 to-sky-500 text-slate-950 shadow-xl hover:shadow-2xl hover:scale-105"
                          : "border-2 border-slate-700 text-slate-200 hover:border-emerald-400 hover:bg-emerald-400/10"
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
        <section id="faq" className="py-20 lg:py-32 bg-slate-900/40">
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
                Lo que cualquier dueño de barbería quiere saber antes de probar.
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
                  className="overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/70"
                >
                  <button
                    onClick={() =>
                      setActiveFaq(activeFaq === i ? null : i)
                    }
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-900"
                  >
                    <span className="text-lg font-medium text-slate-50">
                      {faq.q}
                    </span>
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
                Tu barbería ya es buena.
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                  ahora hacé que también se vea ordenada.
                </span>
              </h2>

              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Probás gratis, la dejás ordenada y, si te sirve, te acompaña
                mientras tu barbería crece. Sin letra chica, sin complicaciones.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/register"
                  className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-8 py-4 text-lg font-semibold text-slate-950 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all"
                >
                  Crear cuenta en menos de un minuto
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-sm text-slate-400">
                  Plan Plus gratis • Sin compromiso • Podés dejar de usarlo cuando quieras
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950/90 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500">
                  <Scissors className="h-5 w-5 text-slate-950" />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">
                    Barber
                  </div>
                  <div className="text-lg font-bold text-slate-50 -mt-1">
                    App
                  </div>
                </div>
              </Link>
              <p className="text-slate-400 max-w-md mb-6">
                Una plataforma pensada para que tu barbería se vea tan
                profesional como el trabajo que hacés todos los días.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-50 mb-4">Producto</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#características"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Características
                  </a>
                </li>
                <li>
                  <a
                    href="#precios"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Precios
                  </a>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Crear cuenta
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-50 mb-4">Soporte</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#faq"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Preguntas frecuentes
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:soporte@barbershop.com"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Contacto
                  </a>
                </li>
                <li>
                  <span>+598 99 123 456</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
