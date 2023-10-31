import { useEffect, useState } from "react"
import Alerta from "../components/Alerta"
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {

const [nombre, setNombre] = useState('')
const [propietario, setPropietario] = useState('')
const [email, setEmail] = useState('')
const [fecha, setFecha] = useState('')
const [sintomas, setSintomas] = useState('')
const [id, setId] = useState(null)

const [alerta, setAlerta] = useState('')

const { paciente, guardarPaciente, setPaciente } = usePacientes()


useEffect(()=>{
    if(paciente?.nombre){ //?. Optional chaining. Si la propietat de l'objecte no existeix, retorna "Undefined" en comptes d'un error.
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario);
        setEmail(paciente.email);
        setFecha(paciente.fecha);
        setSintomas(paciente.sintomas);
        setId(paciente._id)
    }

},[paciente]) //Utilitzem un useffect per exectuar "setNombre" cada vegada que l'objecte paciente canvii. (rebut via usePaciente)

const handleSubmit = e => {
    e.preventDefault()

    if([nombre, propietario, email, fecha, sintomas].includes('')){
        setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        })
        return;
    }

    setAlerta({}) //En pic passa la validació, buidem l'state de l'alerta.
    guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
  
    setNombre(''); //Tornem a settejar els states dels inputs del formulari després de fer una inserció (o edició).
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId(null)

    setAlerta({
        msg: 'Paciente guardado',
        error: false
    })

}


const { msg } = alerta


  return (
    <> {/* El fragment es necessari per fica +1 elements HTML */}
  <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
                <p className="text-xl mt-5 mb-10 text-center">
                    Añade a tus pacientes y {''}
                    <span className="text-indigo-600 font-bold">adminístralos</span>
                </p>
    
    
    <form className="bg-white py-10 px-5 mb-10 lg:mb0 shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-5">
            <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
            <input id="nombre" type="text" placeholder="Nombre de la Mascota" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" defaultValue={nombre} onChange={e => setNombre(e.target.value) } />
        </div>

        <div className="mb-5">
            <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
            <input id="propietario" type="text" placeholder="Nombre de la Mascota" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" defaultValue={propietario} onChange={e => setPropietario(e.target.value) } />
        </div>

        <div className="mb-5">
            <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email propietario</label>
            <input id="email" type="text" placeholder="Nombre de la Mascota" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" defaultValue={email} onChange={e => setEmail(e.target.value) } />
        </div>

        <div className="mb-5">
            <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha alta</label>
            <input id="fecha" type="date" placeholder="Nombre de la Mascota" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" defaultValue={fecha} onChange={e => setFecha(e.target.value) } />
        </div>

        <div className="mb-5">
            <label htmlFor="Síntomas" className="text-gray-700 uppercase font-bold">Síntomas</label>
            <textarea id="Síntomas" placeholder="Describe los síntomas" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" defaultValue={sintomas} onChange={e => setSintomas(e.target.value) } />
        </div>

        <input type="Submit"  className="bg-indigo-600 text-white uppercase w-full p-3 font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-md"  defaultValue={id ? 'Guardar paciente' : 'Agregar paciente'} />
    </form>

    {msg && <Alerta alerta={alerta} /> }

    </>

  )
}

export default Formulario