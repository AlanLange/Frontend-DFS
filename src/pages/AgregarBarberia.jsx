import { useForm } from "react-hook-form";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { addBarberia } from "../features/slices/barberia.slice";

export const AgregarBarberia = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    api
      .post("/barberia", data)
      .then((res) => {
        dispatch(addBarberia(res.data.barberia));
        alert("Barbería agregada con éxito");
      })
      .catch((err) => {
        console.log(err);
        alert("Error al agregar la barbería, probablemente ya exista una");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("nombre")} placeholder="Nombre de la barberia" />
        <br />
        <input
          {...register("direccion")}
          placeholder="Direccion de la barberia"
        />
        <br />
        <input
          {...register("telefono")}
          placeholder="Telefono de la barberia"
        />
        <br />
        <button
          style={{ backgroundColor: "blue", color: "white", padding: "5px" }}
          type="submit"
        >
          Agregar
        </button>
      </form>
    </>
  );
};
