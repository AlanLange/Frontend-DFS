import { useEffect } from "react";
import { NoBarberiasCard } from "../components/NoBarberias";
import { useState } from "react";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { initializeBarberia } from "../features/slices/barberia.slice";

export const Dashboard = () => {

  const { barberia } = useSelector(state => state.barberia);


  const dispatch = useDispatch();

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

  return (
    <>
      {!barberia ? (
        <NoBarberiasCard />
      ) : (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>{barberia.nombre}</p>
            <p>{barberia.direccion}</p>
            <p>{barberia.telefono}</p>

        </div>
      )}
    </>
  );
};
