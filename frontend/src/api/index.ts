import axios from "axios";

export const baseURL = import.meta.env.VITE_API_BASE_URL;
export const clientURL = import.meta.env.VITE_APP_CLIENT_URL;

//Creating an axios instance with custom configration
const api = axios.create({
    baseURL,
    withCredentials: true, //includes cookies or HTTP authentication in requests
    headers: {
        "Content-Type": "application/json",
    }
})

export default api;