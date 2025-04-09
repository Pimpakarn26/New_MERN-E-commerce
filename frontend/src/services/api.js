import axios from "axios"
const baseURL = import.meta.env.VITE_BASE_URL || "https://new-mern-e-commerce.onrender.com/api/v1"

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    }
})

export default instance;