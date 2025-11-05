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
import { Login } from './pages/Login'
import { Register } from './pages/Register'


function App() {
  return(
    <>
    {/* <Provider store={store}> */}

      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<Contenedor />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agregar-barberia" element={<AgregarBarberia />} />
          <Route path="/agregar-categoria" element={<AgregarCategoria />} />
          <Route path="/crear-servicio" element={<CrearServicio />} />
          <Route path="/ver-servicios" element={<VerServicios />} />
        </Route>
      {/* </Route> */}

      <Route path="*" element={<NoEncontrado />} />

      </Routes>
      </BrowserRouter>

    {/* </Provider> */}
    </>
  )
 }

export default App
