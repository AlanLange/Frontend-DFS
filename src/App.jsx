import { Provider } from 'react-redux'
// import { store } from './store/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoEncontrado from './components/NoEncontrado'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Dashboard from './pages/Dashboard'

function App() {
  return(
    <>
    {/* <Provider store={store}> */}

      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/agregar-barberia" element={<AgregarBarberia />} />
        <Route path="/agregar-categoria" element={<AgregarCategoria />} />
        <Route path="/crear-servicio" element={<CrearServicio />} />
        <Route path="/ver-servicios" element={<VerServicios />} /> */}
      </Route>

      <Route path="*" element={<NoEncontrado />} />

      </Routes>
      </BrowserRouter>

    {/* </Provider> */}
    </>
  )
 }

export default App
