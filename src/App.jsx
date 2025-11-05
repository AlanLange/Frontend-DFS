import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter, Routes, Route } from 'react-router'
import NoEncontrado from './components/NoEncontrado'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return(
    <>
    <Provider store={store}>

      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NoEncontrado />} />

      </Routes>
      </BrowserRouter>

    </Provider>
    </>
  )
 }

export default App
