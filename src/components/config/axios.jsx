import axios from "axios";

const clienteAxios = axios.create({

    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`  //Estem creant un prefix que s'aplicarà en les urls d'axios directament
})

export default clienteAxios;