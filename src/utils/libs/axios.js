import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    widhtcredentials: false,
})

export default axiosInstance