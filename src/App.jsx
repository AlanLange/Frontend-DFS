import { Provider } from 'react-redux'
// import { store } from './store/store'
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
import { store } from './store/store'
import { EditarServicios } from './pages/EditarServicios'


function App() {
  return(
    <>
    {/* <Provider store={store}> */}
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<Contenedor />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agregar-barberia" element={<AgregarBarberia />} />
          <Route path="/agregar-categoria" element={<AgregarCategoria />} />
          <Route path="/crear-servicio" element={<CrearServicio />} />
          <Route path="/ver-servicios" element={<VerServicios />} />
          <Route path="/editar-servicios/:id" element={<EditarServicios />} />
        </Route>
      {/* </Route> */}

      <Route path="*" element={<NoEncontrado />} />

      </Routes>
      </BrowserRouter>
      </Provider>
    {/* </Provider> */}
    </>
  )
 }

export default App
