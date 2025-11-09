import React from 'react'
import { Link } from 'react-router-dom'

const NoEncontrado = () => {
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')
  const isLoggedIn = !!(username && token)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-700 rounded-2xl shadow-xl px-8 py-10 backdrop-blur-sm">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white tracking-tight">404</h1>
          <p className="mt-2 text-slate-300 text-sm">
            Página no encontrada
          </p>
        </div>

        <p className="text-sm text-slate-400 text-center mb-8">
          La ruta que intentaste visitar no existe o fue movida.
        </p>
        {isLoggedIn ? (
          <div className="flex flex-col gap-3">
            <Link
              to="/dashboard"
              className="w-full inline-flex items-center justify-center rounded-lg py-2.5 text-sm font-medium
                         bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              Ir al dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="w-full inline-flex items-center justify-center rounded-lg py-2.5 text-sm font-medium
                         bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              Ir al login
            </Link>

            <Link
              to="/registro"
              className="w-full inline-flex items-center justify-center rounded-lg py-2.5 text-sm font-medium
                         border border-slate-600 text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default NoEncontrado
