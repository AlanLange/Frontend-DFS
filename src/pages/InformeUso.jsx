import { useEffect, useMemo, useState } from "react"
import { TogglePlan } from "./TogglePlan"
import { useDispatch, useSelector } from "react-redux";
import { inicializecategorias } from "../features/slices/categorias.slice";
import api from "../api/api";
import { inicializeServicios } from "../features/slices/servicios.slice";
import { initializeBarberia } from "../features/slices/barberia.slice";
import ProgressBar from "../components/ProgressBar";

export const InformeUso = () => {

const plan = useSelector(state => state.user.plan);


const barberias = useSelector(state => state.barberia.barberia);
const {categoria} = useSelector((state) => state.categoria);
const servicios = useSelector(state => state.servicio.servicio);

const dispatch = useDispatch();


  const [filter, setFilter] = useState("todos");
  
  const serviciosFiltradosSemana = useMemo(() => {
    if (!servicios) return [];
    
    const now = new Date();
    return servicios.filter(serv => {
      
      const createdAt = new Date(serv.createdAt);
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return createdAt >= weekAgo;
    });
  }, [servicios, filter]);

  const serviciosFiltradosMes = useMemo(() => {
    if (!servicios) return [];
    
    const now = new Date();
    return servicios.filter(serv => {
      const createdAt = new Date(serv.createdAt);
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return createdAt >= monthAgo;
      
    });
  }, [servicios, filter]);


useEffect(() => {
      api.get("/categorias")
      .then((res) => {
        dispatch(inicializecategorias(res.data.categorias));
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

useEffect(() => {
    api
      .get("/barberia")
      .then((res) => {
        dispatch(initializeBarberia(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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


  return (
    <div style={{width:"80%"}}>
        
        <hr />
        <h1>Informe de Uso para tu plan {plan}</h1><br />
        <h3>Cantidad de barberías: {barberias && 1}</h3><br />
        <h3>Cantidad de categorías: {categoria?.length} </h3><br />
        <div style={{display:"flex"}}>
        <h3 style={{paddingRight:"20px"}}>Cantidad de servicios totales: {servicios?.length} </h3>{plan == "Plus" && <ProgressBar progressValue={servicios?.length + "0"} />}
        </div><br />
        <h3>Cantidad servicios ultima semana: {serviciosFiltradosSemana.length}</h3><br />
        <h3>Cantidad servicios ultimo mes: {serviciosFiltradosMes.length}</h3>
    </div>
  )
}
