import axios from "axios"; //conectar front com back

export const server = axios.create({
    baseURL: "http://localhost:3333"
})