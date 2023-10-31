import { useState } from 'react'
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../components/config/axios'

const Registrar = () => { //Fem anar un useState, que és un hook de React
    const [nombre, setNombre] = useState('') //Donem per defecte un estat buit als diferents camps del forulari
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta, setAlerta] = useState({})

    {/* Validem el forumlari */}
    const handleSubmit = async e =>{
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({msg: 'Hay campos vacios', error: true })
            return;
        }

        if(password !==  repetirPassword){
            setAlerta({msg: 'Los passwords no son iguales', error: true })
            return;
        }

        if(password.length <= 6){
            setAlerta({msg: 'El password es muy corto', error: true })
            return;
        }

        console.log('Todo bien!')

        setAlerta({}); {/* Un cop està el formulari correctament emplenat, tornem ficar l'objecte en blanc */}

        //CREAR L'USUARI EN LA API
        //npm i axios
        //importem axios
        //Hem de donar permís per a que el servidor de frontend, pugui fer requests al servidor de backend. Hem de tocar el CORS policies:
        //En el directory "backend", instalem "npm i cors"
        //Importem cors en el index.js de backend

        try{
            const url = '/veterinarios' //La resta de la url, la importem de "clienteAxios" en l'arxiu ../config/axios.jsx
            await clienteAxios.post(url, {nombre, email, password})
            setAlerta({ 
                msg: 'Creado Correctamente, revisa tu email!', 
                error: false 
            })
        }catch (error) {
            console.log(error.response) //afegim el response per a que passi l'error que retorna la API
            setAlerta({ 
                msg: error.response.data.msg, 
                error: true 
            })   
        }
    }

    const { msg, error } = alerta; //Destructuring del msg d'alerta.

  return (
    <>
        <div>
            <h1 className="text-indigo-600 text font-black text-6xl">Crea tu cuenta y Administra {" "} 
                <span className="text-black">tus pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-lg bg-white">

            { msg && <Alerta alerta={ alerta } /> } {/* Si hi ha algo en el msg, mostrem el component d'Alerta */}

            <form onSubmit={handleSubmit}> {/* Cada vegada que premem el submit, s'executarà aquesta funció */}
                <div className="my-5">
                    <label className="uppercase text-gray-700 block  text-xl font-bold">
                        Nombre
                    </label>
                    <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-700 block  text-xl font-bold">
                        Email
                    </label>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-700 block  text-xl font-bold">
                        Password
                    </label>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>
                
                <div className="my-5">
                    <label className="uppercase text-gray-700 block  text-xl font-bold">
                     Repite tu password
                    </label>
                    <input type="password" placeholder="Password" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>

                <input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-red-950" />

            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/"> ¿Ya tienes cuenta? Inicia sesión</Link> {/* importem el component de react "Link", de manera que el temps de càrrega, sigui molt més efficient / ràpid */}
            </nav>
        </div>
    </> 

    )
}

export default Registrar