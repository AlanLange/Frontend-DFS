import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { inicializeServicios, removeServicio } from "../features/slices/servicios.slice";
import { inicializecategorias } from "../features/slices/categorias.slice";

export const VerServicios = () => {
  const categorias = useSelector((state) => state.categoria);
  const dispatch = useDispatch();
  
  const [filter, setFilter] = useState("todos");
  
  const servicios = useSelector((state) => state.servicio.servicio);
  
  const serviciosFiltrados = useMemo(() => {
    if (!servicios) return [];
    
    const now = new Date();
    return servicios.filter(serv => {
      const createdAt = new Date(serv.createdAt);
      
      if (filter === "todos") return true;
      if (filter === "semana") {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return createdAt >= weekAgo;
      }
      if (filter === "mes") {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return createdAt >= monthAgo;
      }
      return false;
    });
  }, [servicios, filter]);

  useEffect(() => {
    api
      .get("/servicios")
      .then((res) => {
        dispatch(inicializeServicios(res.data.servicios));
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
    localStorage.setItem("servicioId", id);
    navigate(`/editar-servicios/${id}`);
  }



  return (
    <div>
      <h1>Servicios</h1>
      <p>Cantidad de servicios: {serviciosFiltrados?.length}</p>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="todos">Todos</option>
        <option value="semana">Últimos 7 días</option>
        <option value="mes">Últimos 30 días</option>
      </select>
      <br />
      <br />
      {serviciosFiltrados?.map((servicio) => (
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
            <div key={servicio._id} style={{display:"flex"}}>
              <div>
              <h2>Nombre: {servicio.nombre}</h2>
              <p>Descripcion:{servicio.descripcion}</p>
              <p>Precio: {servicio.precio}</p>
              <p>Categoría: {categorias.categoria && categorias.categoria.find(categoria => categoria._id === servicio.categoria)?.nombre}</p>
              <p>Duración: {servicio.duracion}</p>
              <p>Fecha de creación: {new Date(servicio.createdAt).toLocaleDateString()}</p>
              </div>
              <img style={{width:"150px", marginLeft:"10px"}} src={"https://obligatorio-desarollo-full-stack.vercel.app/"+servicio.urlImage} alt="imagen" />
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
