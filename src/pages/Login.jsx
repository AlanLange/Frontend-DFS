import React from 'react'
import { Link, useNavigate } from "react-router"
import api from '../api/api'

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = {
            username: form.username.value,
            password: form.password.value
        };
        login(data);
    };
    
    const login = async (data) => {
        console.log(data);
        try {
            const response = await api.post('auth/login', data, { skipAuth: true });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', data.username);
                document.getElementById('txtMensaje').innerText = 'Login exitoso';
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            }
            document.getElementById('txtMensaje').innerText = response.data.message;
        } catch (error) {
            console.error('Error en el login:', error);
            document.getElementById('txtMensaje').innerText = 'Error en el login';
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
                        <input type="text" name="username" id="username" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input type="password" name="password" id="password" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Iniciar sesión</button>
                    <p id="txtMensaje" className="mt-2 text-red-500 text-center"></p>
                    <p className="mt-4 text-center">¿No tienes una cuenta? <Link to="/registro" className="text-blue-500 hover:underline">Regístrate aquí</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;