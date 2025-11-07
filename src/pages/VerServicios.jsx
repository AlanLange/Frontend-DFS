import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { inicializeServicios, removeServicio } from "../features/slices/servicios.slice";

export const VerServicios = () => {
  const servicios = useSelector((state) => state.servicio);
  const dispatch = useDispatch();
  const [categorias, setCategorias] = useState([]);

  console.log(servicios);

  useEffect(() => {
    api
      .get("/servicios")
      .then((res) => {
        dispatch(inicializeServicios(res.data.servicios));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  
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

  const handleDelete = (id) => {
    api
      .delete(`/servicios/${id}`)
      .then((res) => {
        dispatch(removeServicio(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };


const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/editar-servicios/${id}`);
  }



  return (
    <div>
      <h1>Servicios</h1>
      {servicios.servicio &&
        servicios.servicio.map((servicio) => (
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
              <p>Categoría: {categorias.categorias.find(categoria => categoria._id === servicio.categoria)?.nombre}</p>
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
