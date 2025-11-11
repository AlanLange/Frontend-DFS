import axios from 'axios';

const api = axios.create({
  baseURL: 'https://obligatorio-desarollo-full-stack.vercel.app/v1',
  timeout: 10000,
  // 👇 NO seteamos Content-Type aquí, lo decidimos en el interceptor
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

api.interceptors.request.use(
  (config) => {
    const isFormData = config.data instanceof FormData;

    if (isFormData) {
      // 👇 Para FormData: NO tocamos Content-Type.
      // Dejamos que el navegador ponga multipart/form-data con boundary.
      if (config.headers && config.headers['Content-Type']) {
        delete config.headers['Content-Type'];
      }
    } else {
      // 👇 Para JSON normal:
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    }

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
