import { useState, useEffect, createContext } from "react"; 
import clienteAxios from "../components/config/axios";

//createContext ens permet accedir a l'estat global de l'app en qualsevol moment
//D'aquí neix l'estat global de l'aplicació
//AuthProvider ha de rodejar tota l'aplicació en l'App.js, de manera que els components fills, puguin accedir al context global.

const AuthContext = createContext()

const AuthProvider = ({children}) => { //Això és un Higher Order Component de React. Permet afegir funcionalitat adicional a un component sense que aquest es modifiqui. https://www.freecodecamp.org/news/higher-order-components-in-react/#:~:text=Higher%2Dorder%20components%20(HOCs),that%20wraps%20the%20original%20component. 

    const [ cargando, setCargando ] = useState(true)
    const [ auth, setAuth ] = useState({})

    useEffect(() => { //Utilitzem un useEffect de manera que quan carregui l'app, es comprobi si l'usuari està autenticat o no (des del local Storage)
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token'); //Recollim el token que hem afegit en el "LS" 
       
            if(!token){
                setCargando(false)
                return  //Si NO hi ha token aturem l'execució del codi.
            }

            console.log('Si hay token')

            const config = { //Afegim el header amb el bearer token
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try{       //. Fem el request a l'API "Obtener perfil" (GET). "data" és la resposta que dona axios. Per default el mètode és get, de manera que no cal especificar-ho
                const { data } = await clienteAxios('/veterinarios/perfil', config)
                console.log(data)
                setAuth(data) //Afegim la info que ens retorna la consulta a l'API, en l'STATE de l'aplicació
                

            }catch( error ){
                console.log(error.response.data.msg);
                setAuth({}) //En cas d'error, mostrem un objecte buit
            }

            setCargando(false)

            
        }

        autenticarUsuario()
    },[]) //Deixem el "[]" buit per a que s'executi directament en carregar la pàgina


    const cerrarSesion = () => {

        localStorage.removeItem('token');
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        console.log('datos',datos)

        const token = localStorage.getItem('token'); //Recollim el token que hem afegit en el "LS" 
       
        if(!token){
            setCargando(false)
            return  //Si NO hi ha token aturem l'execució del codi.
        }

        console.log('Si hay token')

        const config = { //Afegim el header amb el bearer token
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        try{
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config)

            console.log(data)

            return{
                msg: 'Almacenado correctamente'
            }

        }catch(error){

            console.log(error)

            return {
                msg: error.response.data.msg,
                error: true
            }
        }

    }


    const guardarPassword = async (datos) => {
        console.log(datos)

        const token = localStorage.getItem('token'); //Recollim el token que hem afegit en el "LS" 
       
        if(!token){
            setCargando(false)
            return  //Si NO hi ha token aturem l'execució del codi.
        }

        const config = { //Afegim el header amb el bearer token
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'

            const { data } = await clienteAxios.put(url, datos, config)    
            
            console.log(data);

            return{
                msg: 'Password almacenado correctamente'
            }

        }catch (error){

            return {
                msg: error.response.data.msg,
                error: true
            }

        }

     }


    return(
        <AuthContext.Provider value={{ //A dins del value, mostrem la informació que volem fer accessible en els diferents components
            auth,
            setAuth,
            cargando,
            cerrarSesion, //Passem la funció de "cerrar sessión" per l'auth provider per tal de fer-la disponible
            actualizarPerfil,
            guardarPassword
        }}>
            {children} {/* El children es refereix a tots els components de dins del <authProvider> en l'arxiu App.jsx */}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;
