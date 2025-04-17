import axios from 'axios';
// import { toast } from 'sonner'; // або будь-який toast

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const customError = {
      message: err?.response?.data?.message || 'Something went wrong',
      status: err?.response?.status,
    };

    // toast.error(customError.message); // 🔥 глобальний toast

    return Promise.reject(customError);
  },
);

export default api;
