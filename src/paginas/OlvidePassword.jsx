import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../components/config/axios"
import useAuth from "../hooks/useAuth"

const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta ] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if(email == '' && email.length > 6){
            setAlerta({msg: 'El email es obligatorio', error: true})
            return
        }

        try{
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email }) //Hem de passar l'email

            console.log(data);

            setAlerta({msg: data.msg})

        }catch (error) { 
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

  return (
    <>
        <div>
            <h1 className="text-indigo-600 text font-black text-6xl">Recupera acceso y no pierdas a {" "} 
                <span className="text-black">tus pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-lg bg-white">
            { msg && <Alerta alerta={alerta} /> } {/* Mostrem el missatge d'alerta en cas que el correu estigui buit */}
            <form
                onSubmit={handleSubmit}    
            >
                <div className="my-5">
                <label className="uppercase text-gray-700 block  text-xl font-bold">
                    Email
                </label>
                <input 
                    type="email" 
                    placeholder="Email de Registro" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                    />
                </div>
                <input type="submit" value="Enviar instrucciones" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-red-950" />
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/"> ¿Ya tienes cuenta? Inicia sesión</Link> {/* importem el component de react "Link", de manera que el temps de càrrega, sigui molt més efficient / ràpid */}
            </nav>    
        </div>
    </>

    )
}

export default OlvidePassword