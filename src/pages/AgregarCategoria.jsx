import { useForm } from "react-hook-form"
import api from "../api/api";

export const AgregarCategoria = () => {


  const { register, handleSubmit } = useForm()


  const onSubmit = (data) => {
    console.log(data);
    api
      .post("/categorias", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("nombre")} placeholder="Nombre de la categoría" />
        <button type="submit">Agregar</button>
      </form>
    </>
  )
}
