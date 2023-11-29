import axios from "axios";

const BASE_URL = 'http://localhost:3100'

export default axios.create({
    baseURL: BASE_URL
})

export const axiosAuth = axios.create({
    baseURL: BASE_URL
})