import { Link, useNavigate } from "react-router-dom" //useNavigate és un hooke per redireccionar a l'usuari.
import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth" //Custom hook per a extreure l'estat de Auth de l'estat global.
import clienteAxios from '../components/config/axios'
import Alerta from "../components/Alerta"

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [alerta, setAlerta] = useState('')

    const { setAuth, auth } = useAuth();

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();

        if(!email || email.length < 5){
            setAlerta({
                msg: 'Por favor, introduce tu correo electrónico',
                error: true
            })

            return;
        }

        if(!password){
            setAlerta({
                msg: 'Por favor, introduce tu password',
                error: true
            })

            return;
        }

        try{
            const url = '/veterinarios/login'
            const {data} = await clienteAxios.post(url, {email, password})

            localStorage.setItem('token', data.token);
            console.log('Data:', data);
            
            setAuth(data)
            console.log('from auth, auth', auth)
            
            
            navigate("/admin") //redireccionem (dins de REACT) a la pàgina d'admin

            console.log(data.token)


        }catch (error) {

            console.log(error)
            const msg = error.response.data.msg

            setAlerta({
                msg: msg,
                error: true
            })
        }
        
    }

    const { msg, error } = alerta;


  return (
    <>
        <div>
            <h1 className="text-indigo-600 text font-black text-6xl">Inicia Sesión y Administra tus 
            <span className="text-black">pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-lg bg-white">
          { msg && <Alerta alerta={alerta} /> }
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-700 block  text-xl font-bold">
                        Email
                    </label>
                    <input type="email" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value) } className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-700 block  text-xl font-bold">
                        Password
                    </label>
                    <input type="password" placeholder="Password" value={password} onChange={ e => setPassword(e.target.value) } className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>
                <input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-red-950" />
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/registrar"> ¿No tienes cuenta? Regístrate aquí</Link> {/* importem el component de React "Link", de manera que el temps de càrrega, sigui molt més efficient / ràpid que un link convecional */}
                <Link className="block text-center my-5 text-gray-500" to="/olvide-password"> Olvidé mi password</Link>
            </nav>
        </div>
    
    </>
  )
}

export default Login