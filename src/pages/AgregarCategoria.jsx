import { useForm } from "react-hook-form"
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addCategoria, inicializecategorias } from "../features/slices/categorias.slice";
import { useEffect } from "react";

export const AgregarCategoria = () => {

  const {categoria} = useSelector((state) => state.categoria);
  const { register, handleSubmit } = useForm()

  const dispatch = useDispatch();

  useEffect(() => {
      api.get("/categorias")
      .then((res) => {
        dispatch(inicializecategorias(res.data.categorias));
      })
      .catch((err) => {
        console.log(err);
      });

    
  }, [])

  const onSubmit = (data) => {
    api
      .post("/categorias", data)
      .then((res) => {
        dispatch(addCategoria(res.data.categoria))
        alert("Categoría agregada con éxito");
      })
      .catch((err) => {
        alert("Error al agregar la categoría");
      });
  };



  

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("nombre")} placeholder="Nombre de la categoría" style={{border:"1px solid black"}}/>
        <button type="submit">Agregar</button>
      </form><br />
      <div><br />
        <h2>Categorías existentes:</h2>
        <ul>
          {
            categoria?.map((cat) => (
              <li key={cat._id}>{cat.nombre}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
