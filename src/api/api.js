import axios from 'axios';

const api = axios.create({
    baseURL: 'https://obligatorio-desarollo-full-stack.vercel.app/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
 (config) => {
 // Agregar headers requeridos siempre
config.headers["Content-type"] = "application/json; charset=UTF-8";
 // Evitar añadir token en login/registro
 if (config.skipAuth) return config;
 const token = localStorage.getItem("token");
 if (token) {
 config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
 },
 (error) => Promise.reject(error)
);



export default api;