import React from 'react'
import { Link, useNavigate } from "react-router"
import api from '../api/api'

const Registro = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = {
            username: form.username.value,
            password: form.password.value,
            confirmPassword: form.confirmPassword.value,
            email: form.email.value
        };
        register(data);
      };
    const register = async (data) => {
        console.log(data);
        try{
            const response = await api.post('auth/register', data,{ skipAuth: true });
            if(response.status ===201){
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', data.username);
                document.getElementById('txtMensaje').innerText = 'Registro exitoso';
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            }
            document.getElementById('txtMensaje').innerText = response.data.message;


        
        }
        catch(error){
            console.error('Error en el registro:', error);
            document.getElementById('txtMensaje').innerText = 'Error en el registro';
        }
    }
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <form 
            onSubmit={handleSubmit} 
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
              <input 
                type="text" 
                name="username" 
                id="username" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
              <input 
                type="password" 
                name="confirmPassword" 
                id="confirmPassword" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Registrarse
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta? <Link to="/" className="text-blue-500 hover:underline">Inicia sesión</Link>
            </p>
            <p id="txtMensaje" className="mt-2 text-center text-red-500"></p>
          </form>
        </div>
      );
}

export default Registro