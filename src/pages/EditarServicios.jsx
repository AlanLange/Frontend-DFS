import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";


export const EditarServicios = () => {
  

  const { id } = useSelector((state) => state.servicio.servicio);

  const [servicio , setServicio] = useState(null);

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/servicios/${id}`)
      .then((res) => {
        setServicio(res.data.servicio);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


    const onSubmit = (data) => {
      api
        .patch(`/servicios/${id}`, data)
        .then((res) => {
          console.log(res);
          navigate("/ver-servicios");
        })
        .catch((err) => {
          alert("Error al editar el servicio");
        });
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Edicion de Servicios</h1>
      {servicio && (
          <div
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div key={servicio._id}>
              <label>Nombre: </label>
              <input style={{border:"1px solid black"}} type="text" defaultValue={servicio.nombre} {...register("nombre")} /><br />
              <label>Descripcion: </label>
              <input style={{border:"1px solid black"}}  type="text" defaultValue={servicio.descripcion} {...register("descripcion")} /><br />
              <label>Precio: </label>
              <input style={{border:"1px solid black"}}  type="text" defaultValue={servicio.precio} {...register("precio")} /><br />
              <label>Categoría: </label>
              <input style={{border:"1px solid black"}}  type="text" defaultValue={servicio.categoria} {...register("categoria")} /><br />
              <label>Duración: </label>
              <input style={{border:"1px solid black"}}  type="text" defaultValue={servicio.duracion} {...register("duracion")} /><br />
            </div>
            <div>
              <button
              style={{cursor:"pointer", backgroundColor: "orange", color: "white", padding: "5px"}}
               type="submit"
              >
                editar
              </button>
              <br />
            </div>
          </div>
        )
        }
    </form>
  );
};
