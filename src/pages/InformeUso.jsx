import { useEffect, useState } from "react"
import { TogglePlan } from "./TogglePlan"
import { useDispatch, useSelector } from "react-redux";
import { inicializecategorias } from "../features/slices/categorias.slice";
import api from "../api/api";
import { inicializeServicios } from "../features/slices/servicios.slice";

export const InformeUso = () => {

const plan = useSelector(state => state.user.plan);

const barberias = useSelector(state => state.barberia.barberia);
const {categoria} = useSelector((state) => state.categoria);
const servicios = useSelector(state => state.servicio.servicio);

const dispatch = useDispatch();

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
        <h3>Cantidad de categorías: {categoria?.length}</h3><br />
        <h3>Cantidad de servicios: {servicios?.length}</h3><br />

    </div>
  )
}
