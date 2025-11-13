// src/components/Upload.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import api from "../api/api";

const schema = Joi.object({
  image: Joi.any()
    .required()
    .custom((value, helpers) => {
      if (!value || value.length === 0) {
        return helpers.error("any.required");
      }
      const file = value[0];
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        return helpers.error("any.invalid");
      }
      if (file.size > 2 * 1024 * 1024) {
        return helpers.error("any.max");
      }
      return value;
    })
    .messages({
      "any.required": "La imagen es obligatoria",
      "any.invalid": "Solo se permiten JPG, PNG o WEBP",
      "any.max": "La imagen no puede superar los 2MB",
    }),
});

const Upload = ({ onUploaded }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError("");
      setUrl("");

      const file = data.image[0];
      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("/upload", formData);

      const uploadedUrl = res.data.url;
      setUrl(uploadedUrl);

      if (onUploaded) onUploaded(uploadedUrl);

      reset();
    } catch (err) {
      console.error("Error al subir imagen:", err);
      const msg = err.response?.data?.message || "Error al subir la imagen";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-slate-100 mb-2">
        Imagen del servicio
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Formatos permitidos: JPG, PNG, WEBP. Tamaño máximo: 2MB.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <label
          className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-600 rounded-xl bg-slate-900/70 hover:border-sky-500 transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium text-slate-200">
            {url ? "Imagen subida" : "Haz clic para seleccionar una imagen"}
          </span>
          <span className="text-xs text-slate-400 mt-1">
            o arrástrala aquí
          </span>
          <input
            type="file"
            {...register("image")}
            className="hidden"
            accept="image/*"
          />
        </label>

        {errors.image && (
          <p className="text-xs text-red-400">{errors.image.message}</p>
        )}

        {serverError && (
          <p className="text-xs text-red-400">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium shadow-md shadow-sky-500/30 transition-colors"
        >
          {loading ? "Subiendo..." : "Subir imagen"}
        </button>
      </form>

      {url && (
        <div className="mt-4">
          <p className="text-xs text-slate-300 mb-2">
            Imagen subida correctamente:
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/80">
            <img
              src={url.replace(
                "/upload/",
                "/upload/c_scale,w_400/f_auto/q_auto/"
              )}
              alt="Preview servicio"
              className="w-full h-52 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
