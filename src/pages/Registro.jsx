import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // o "react-router-dom"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { User, Mail, Lock, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import api from "../api/api";
import { loguear } from "../features/slices/user.slice";
import { cambiarPlan } from "../features/slices/user.slice";
const Registro = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("error"); // 'success' | 'error'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch =
    !!password && !!confirmPassword && password === confirmPassword;

  const onSubmit = async (formData) => {
    const { username, password, email, confirmPassword } = formData;
    const data = { username, password, email,confirmPassword};

    try {
      const response = await api.post("auth/register", data, { skipAuth: true });

      if (response.status === 201) {
       const { token } = response.data;

      localStorage.setItem("token", token);
      dispatch(loguear());
      dispatch(cambiarPlan("Plus"));

        setTipoMensaje("success");
        setMensaje(t("auth.register.success")); // Registro exitoso

        navigate("/dashboard");
      } else {
        setTipoMensaje("error");
        setMensaje(response.data?.message || t("auth.register.error"));
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      const backendMsg = error.response?.data?.message;
      setTipoMensaje("error");
      setMensaje(backendMsg || t("auth.register.error"));
    }
  };

  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4">
      {/* Fondos animados */}
      <motion.div
        className="pointer-events-none absolute -top-40 -left-40 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.1 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Badge + selector idioma */}
        <div className="mb-4 flex items-center justify-between">
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-1 text-xs font-medium text-slate-200 shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>{t("auth.register.badge")}</span>
            </span>
          </motion.div>

          <select
            value={i18n.language}
            onChange={handleChangeLanguage}
            className="text-xs rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl px-6 py-7 sm:px-8 shadow-[0_18px_60px_rgba(0,0,0,0.7)]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-50">
              {t("auth.register.title")}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {t("auth.register.subtitle")}
            </p>
          </div>

          {/* USERNAME */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1"
            >
              {t("auth.fields.username")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <User className="h-4 w-4 text-slate-500" />
              </span>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-900/60 pl-9 pr-3 py-2 text-sm text-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                {...register("username", {
                  required: "El nombre de usuario es obligatorio",
                })}
              />
            </div>
            {errors.username && (
              <p className="text-red-400 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1"
            >
              {t("auth.fields.email")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Mail className="h-4 w-4 text-slate-500" />
              </span>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-900/60 pl-9 pr-3 py-2 text-sm text-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo electrónico inválido",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1"
            >
              {t("auth.fields.password")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Lock className="h-4 w-4 text-slate-500" />
              </span>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-900/60 pl-9 pr-3 py-2 text-sm text-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">
              {t("auth.helpers.password")}
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1"
            >
              {t("auth.fields.confirmPassword")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Lock className="h-4 w-4 text-slate-500" />
              </span>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-900/60 pl-9 pr-3 py-2 text-sm text-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                {...register("confirmPassword", {
                  required: "Debes repetir la contraseña",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            {!errors.confirmPassword && password && confirmPassword && (
              <p className="text-emerald-400 text-[11px] mt-1">
                ✅ {t("auth.helpers.passwordsMatch")}
              </p>
            )}
          </div>

          {/* BOTÓN REGISTRARSE */}
          <motion.button
            type="submit"
            disabled={!isValid || !passwordsMatch || isSubmitting}
            whileHover={
              !isSubmitting && isValid && passwordsMatch ? { scale: 1.02 } : {}
            }
            whileTap={
              !isSubmitting && isValid && passwordsMatch ? { scale: 0.98 } : {}
            }
            className={`
              w-full inline-flex justify-center items-center
              rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
              px-4 py-2.5 text-sm font-semibold text-white shadow-lg
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              transition
              disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none
            `}
          >
            {isSubmitting
              ? t("auth.register.submitting")
              : t("auth.register.button")}
          </motion.button>

          {/* MENSAJE DE RESPUESTA */}
          {mensaje && (
            <motion.p
              id="txtMensaje"
              className={`mt-3 text-center text-sm ${
                tipoMensaje === "success" ? "text-emerald-400" : "text-red-400"
              }`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {mensaje}
            </motion.p>
          )}

          {/* LINK LOGIN */}
          <p className="mt-6 text-center text-xs text-slate-400">
            {t("auth.register.haveAccount")}{" "}
            <Link
              to="/"
              className="font-semibold text-blue-400 hover:text-blue-300 hover:underline transition"
            >
              {t("auth.register.goLogin")}
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Registro;
