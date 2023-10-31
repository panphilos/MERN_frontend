import AdminNav from "../components/AdminNav" 
import Alerta from "../components/Alerta"
import { useState } from "react"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({pwd_actual : '', pwd_nuevo : ''})

    const { guardarPassword } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault();

        //Object.values ens retorna els values de cada propietat de l'objecte       //.some fa el mateix, pero en comptes de cada camp, mira si hi ha algun camp buit.
        const campoVacio = Object.values(password).some( campo => campo === '') ; //every aplica una funció a cada element d'un array. Ens retorna 'true' si els elements estan buits.
                                                                              

        if(campoVacio){
            console.log('dispara alerta')
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        if( password.pwd_nuevo.length < 6 ){
            setAlerta({
                msg: 'El password debe tener como mínimo 6 caracteres',
                error: true
            })

            return
        }

        const guardarPasswordResult = await guardarPassword(password);

        
        setAlerta(guardarPasswordResult);
    }




    const { msg } = alerta

  return (

    <>
        <div className="flexdt justify-center">
                <div className="w-full md:1/2 bg-white shadow rounded-lg p-5">

                    {msg && <Alerta alerta={alerta} /> } {/* Recorda que && retorna el primer valor falsy evaluat */}

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">                         
                                Password actual
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_actual"
                                placeholder="Escribe tu password actual"
                                onChange={ e => setPassword({
                                    ...password,  //Spread operator
                                    [e.target.name] : e.target.value //Es fa un override del que hi ha
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">                         
                                Password nuevo
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_nuevo"
                                placeholder="Escribe tu nuevo password"
                                onChange={ e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />
                    </form>
                </div>
        </div>

    </>
  )
}

export default CambiarPassword