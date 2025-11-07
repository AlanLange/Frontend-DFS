import { useForm } from "react-hook-form";
import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { addServicio } from "../features/slices/servicios.slice";
import { useDispatch } from "react-redux";

export const CrearServicio = () => {

  const { register, handleSubmit } = useForm();
  const [categorias, setCategorias] = useState([]);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
      api.get("/categorias")
      .then((res) => {
        console.log(res.data);
        setCategorias(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    
  }, [])


  const onSubmit = (data) => {
    api
      .post("/servicios", data)
      .then((res) => {
        navigate("/ver-servicios");
        dispatch(addServicio(res.data));
      })
      .catch((err) => {
        console.log(err);
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
          categorias.categorias && categorias.categorias.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
          ))
        }
      </select><br />
      <input {...register("duracion")} placeholder="Duración del servicio" /><br />
      <button type="submit" style={{ backgroundColor: "blue", color: "white", padding: "5px" }}>Crear Servicio</button>
    </form>
  )
}
