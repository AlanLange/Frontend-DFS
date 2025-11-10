import { useForm } from "react-hook-form";
import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { addServicio } from "../features/slices/servicios.slice";
import { useDispatch, useSelector } from "react-redux";
import { inicializecategorias } from "../features/slices/categorias.slice";


export const CrearServicio = () => {

  const { register, handleSubmit } = useForm();

  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categoria);

  console.log(categorias);
  useEffect(() => {
      api.get("/categorias")
      .then((res) => {
        console.log(res.data);
        dispatch(inicializecategorias(res.data.categorias));
      })
      .catch((err) => {
        console.log(err);
      });

    
  }, [])


  const onSubmit = (data) => {
    const servicioData = {
      ...data,
      precio: Number(data.precio), 
      ...(!data.createdAt ? { createdAt: new Date().toISOString() } : { createdAt: dateInputToISOStringUTC(data.createdAt) })
    };
    api
      .post("/servicios", servicioData)
      .then((res) => {
        navigate("/ver-servicios");
        dispatch(addServicio(res.data.servicio));
      })
      .catch((err) => {
        if (err.response.data.message == "Límite de servicios alcanzado para el plan Plus") {
          alert("Límite de servicios alcanzado para el plan Plus");
        } else {
          alert("Error al crear el servicio " + err.response.data.message);
          console.log(err.response);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("nombre")} placeholder="Nombre del servicio" /><br />
      <input {...register("descripcion")} placeholder="Descripción del servicio" /><br />
      <input {...register("precio")} placeholder="Precio del servicio" /><br />
      <select {...register("categoria")}>
        <option value="">Seleccione una categoría</option>
        {
          categorias.categoria && categorias.categoria.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
          ))
        }
      </select><br />
      <input {...register("duracion")} placeholder="Duración del servicio" /><br />
      <input type="date" {...register("createdAt")} placeholder="fecha" /><br />
      <button type="submit" style={{ backgroundColor: "blue", color: "white", padding: "5px" }}>Crear Servicio</button>
    </form>
  )
}
