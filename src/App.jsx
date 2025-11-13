
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoEncontrado from './components/NoEncontrado'
import ProtectedRoute from './components/ProtectedRoute'
import { AgregarBarberia } from './pages/AgregarBarberia'
import { AgregarCategoria } from './pages/AgregarCategoria'
import { CrearServicio } from './pages/CrearServicio'
import { VerServicios } from './pages/VerServicios'
import { Contenedor } from './pages/Contenedor'
import { Dashboard } from './pages/Dashboard'
import  Login  from './pages/Login'
import  Registro from './pages/Registro'
import { EditarServicios } from './pages/EditarServicios'
import { InformeUso } from './pages/InformeUso'
import { CambiarPlan } from './pages/CambiarPlan'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initAuth } from './auth/initAuth'
import Landing from './pages/Landing'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initAuth(dispatch);
  }, [dispatch]);

  
  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route element={<ProtectedRoute />}> 
        <Route element={<Contenedor />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agregar-barberia" element={<AgregarBarberia />} />
          <Route path="/agregar-categoria" element={<AgregarCategoria />} />
          <Route path="/crear-servicio" element={<CrearServicio />} />
          <Route path="/ver-servicios" element={<VerServicios />} />
          <Route path="/editar-servicios/:id" element={<EditarServicios />} />
          <Route path="/informe-uso" element={<InformeUso />} />
          <Route path="/cambiar-plan" element={<CambiarPlan />} />
        </Route>
      </Route> 

      <Route path="*" element={<NoEncontrado />} />

      </Routes>
      </BrowserRouter>
    </>
  )
 }

export default App