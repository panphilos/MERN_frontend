import { useParams, Link } from "react-router-dom" //Iportem aquest hook per a llegir els params de la url en REACT
import { useEffect, useState } from "react";
import clienteAxios from "../components/config/axios";
import Alerta from "../components/Alerta";

const confirmarCuenta = () => { 
    
    //Fem anar un useState
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const params = useParams();
    const { id } = params;

    //UseEffect executa el setup code la primera vegada que s'executa. Després, cada vegada que un dels atributs canvia, es torna a executar (en aquest cas el useEffect no te atributs)
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                
                const url = `/veterinarios/confirmar/${id}`
               // console.log(url)

                //Data és el que ens passa axios sempre
                const { data } = await clienteAxios(url) //podriem ficar axios.get(url), però és default, de manera que podem prescindir d'aquest. 

                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg
                })

            }catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }

            setCargando(false); //En aquest punt del codi ja sabem tenim resposta del servidor, sigui bona o un error, de manera que podem modificar l'estat de "cargando"
        }
         confirmarCuenta();   
    },[])


  return (
    <>
        <div>
            <h1 className="text-indigo-600 text font-black text-6xl">Confirma tu cuenta y comienza a administrar tus pacientes {" "} 
                <span className="text-black">tus pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-lg bg-white">
            
            {/* Si ja ha carregat, mostrem la alerta (sigui quin sigui el resultat) */}
            { !cargando && <Alerta alerta={alerta} /> }   

            { cuentaConfirmada && (                
                <Link className="block text-center my-5 text-gray-500" to="/">Inicia sesión</Link> 
            )}

        </div>
    </> 

    )
}

export default confirmarCuenta