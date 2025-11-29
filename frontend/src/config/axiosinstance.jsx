import axios from "axios";

export const axiosinstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})