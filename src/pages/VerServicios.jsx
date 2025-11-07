import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../features/slices/servicios.slice";

export const VerServicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    api
      .get("/servicios")
      .then((res) => {
        setServicios(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setServicios([]);
    };
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/servicios/${id}`)
      .then((res) => {
        setServicios(
          servicios.servicios.filter((servicio) => servicio._id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };


const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEdit = (id) => {
    navigate(`/editar-servicios/`);
    dispatch(setId(id));
  };



  return (
    <div>
      <h1>Servicios</h1>
      {servicios.servicios &&
        servicios.servicios.map((servicio) => (
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
              <h2>Nombre: {servicio.nombre}</h2>
              <p>Descripcion:{servicio.descripcion}</p>
              <p>Precio: {servicio.precio}</p>
              <p>Categoría: {servicio.categoria}</p>
              <p>Duración: {servicio.duracion}</p>
            </div>
            <div>
              <button
                style={{ paddingLeft: "20px", cursor: "pointer" }}
                onClick={() => handleDelete(servicio._id)}
              >
                borrar
              </button>
              <button
                style={{ paddingLeft: "20px", cursor: "pointer" }}
                onClick={() => handleEdit(servicio._id)}
              >
                editar
              </button>
              <br />
            </div>
          </div>
        ))}
    </div>
  );
};
