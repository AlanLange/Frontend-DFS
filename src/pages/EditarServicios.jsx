import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { inicializecategorias } from "../features/slices/categorias.slice";

export const EditarServicios = () => {
  const { id } = useParams();

  const [servicio, setServicio] = useState(null);
  const categorias = useSelector((state) => state.categoria);

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  useEffect(() => {
      api.get("/categorias")
      .then((res) => {
        dispatch(inicializecategorias(res.data.categorias));
      })
      .catch((err) => {
        console.log(err);
      });



  }, []);

  const onSubmit = (data) => {
    // Convert date (from input yyyy-mm-dd) to ISO before sending if present
    if (data.fecha) {
      try {
        data.fecha = new Date(data.fecha).toISOString();
      } catch (e) {
        // if conversion fails, keep the original value
        console.log("Fecha conversion error", e);
      }
    }

    api
      .patch(`/servicios/${id}`, data)
      .then((res) => {
        console.log(res);
        navigate("/ver-servicios");
      })
      .catch((err) => {
        alert("Error al editar el servicio");
        console.log(err);
      });
  };

  console.log(categorias);

  return (
    <>
    {
      !servicio ? (<h2>Previamente debe de seleccionarse un servicio a editar</h2>
      ) : (
        
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
            <input
              style={{ border: "1px solid black" }}
              type="text"
              defaultValue={servicio.nombre}
              {...register("nombre")}
            />
            <br />
            <label>Descripcion: </label>
            <input
              style={{ border: "1px solid black" }}
              type="text"
              defaultValue={servicio.descripcion}
              {...register("descripcion")}
            />
            <br />
            <label>Precio: </label>
            <input
              style={{ border: "1px solid black" }}
              type="text"
              defaultValue={servicio.precio}
              {...register("precio")}
            />
            <br />
            <label>Categoría: </label>
            <select {...register("categoria")}>
              {
                categorias.categoria && categorias.categoria.find(categoria => categoria._id === servicio.categoria)?.nombre &&
                <option value={servicio.categoria}>
                  {categorias.categoria.find(categoria => categoria._id === servicio.categoria)?.nombre}
                </option>
              }
              {categorias.categoria &&
                categorias.categoria.map((categoria) => (
                  <option key={categoria._id} value={categoria._id}>
                    {categoria.nombre}
                  </option>
                ))}
            </select>
            <br />
            
            <label>Duración: </label>
            <input
              style={{ border: "1px solid black" }}
              type="text"
              defaultValue={servicio.duracion}
              {...register("duracion")}
            />
            <br />
            {/* Fecha: HTML date input expects yyyy-mm-dd */}
            <label>Fecha: </label>
            <input
              style={{ border: "1px solid black" }}
              type="date"
              defaultValue={
                servicio.createdAt
                  ? (() => {
                      try {
                        return new Date(servicio.createdAt).toISOString().slice(0, 10);
                      } catch (e) {
                        return "";
                      }
                    })()
                  : ""
              }
              {...register("createdAt")}
            />
            <br />
          </div>
          <div>
            <button
              style={{
                cursor: "pointer",
                backgroundColor: "orange",
                color: "white",
                padding: "5px",
              }}
              type="submit"
            >
              editar
            </button>
            <br />
          </div>
        </div>
      )}
    </form>
      )
    }
    </>
  );
};
