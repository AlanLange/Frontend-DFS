import { useEffect } from "react";
import { NoBarberiasCard } from "../components/NoBarberias";
import { useState } from "react";
import api from "../api/api";

export const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/barberia")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setData(err.data);
      });
  }, []);

  return (
    <>
      {!data ? (
        <NoBarberiasCard />
      ) : (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>{data.nombre}</p>
            <p>{data.direccion}</p>
            <p>{data.telefono}</p>

        </div>
      )}
    </>
  );
};
