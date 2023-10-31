import { useEffect, useState} from "react";
import AdminNav from "../components/AdminNav" 
import useAuth from "../hooks/useAuth"  //Importem les dades de l'usauri des de l'State i les carreguem en el formulari.
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    const {auth, actualizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)

    },[])

    console.log(perfil)

    const handleSubmit = async e => {
        e.preventDefault()

        const { nombre, email } = perfil
        
        //Fem validació de formulari
        if([nombre, email].includes('')){
            setAlerta({
                msg: 'El nombre y el email tienen que ser rellenados',
                error: true
            })

            return
        }

        const ActualizarPerfilResult = await actualizarPerfil(perfil);

        console.log('Update perfil result', ActualizarPerfilResult)

        setAlerta(ActualizarPerfilResult) //Mostrem alerta amb el msg retornat per l'API, (tan si es true com false)

    }

    const { msg } = alerta;


    return (
        <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
            <span className="text-indigo-600 font-bold">información aquí</span>
        </p>

        <div className="flexdt justify-center">
            <div className="w-full md:1/2 bg-white shadow rounded-lg p-5">

                {msg && <Alerta alerta={alerta} /> } {/* Recorda que && retorna el primer valor falsy evaluat */}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">{/* "my" vold dir margin top i bottom de 3 */}
                        <label className="uppercase font-bold text-gray-600">                         
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nombre"
                            value={perfil.nombre || ''} //Hem de ficar el OR, perque quan carrega la pàgina, "perfil.nombre" encara no te valor asignat (carrega més tard), de manera que en aquest primer moment, dona error.
                            
                            //Agafem l'objecte nombre:value i l'afegim a l'state "perfil" (que és un objecte)
                            onChange={e => setPerfil({...perfil,[e.target.name] : e.target.value})}  //El que fem aquí, és aixo: https://www.geeksforgeeks.org/how-to-create-object-properties-in-javascript/#:~:text=let%20variablename1%20%3D%20%5B...value%5D%3B-,Example%3A%20In%20this%20example%2C%20we%20are%20using%20the%20above%2Dexplained%20approach.,-Javascript
                        />
                    </div>

                    <div className="my-3">{/* "my" vold dir margin top i bottom de 3 */}
                        <label className="uppercase font-bold text-gray-600">                         
                            Sitio web
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="web"
                            value={perfil.web || ''}
                            onChange={e => setPerfil({...perfil,[e.target.name] : e.target.value})}  
                        />
                    </div>

                    <div className="my-3">{/* "my" vold dir margin top i bottom de 3 */}
                        <label className="uppercase font-bold text-gray-600">                         
                            Teléfono
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil({...perfil,[e.target.name] : e.target.value})} 
                        />
                    </div>

                    <div className="my-3">{/* "my" vold dir margin top i bottom de 3 */}
                        <label className="uppercase font-bold text-gray-600">                         
                            Email
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="email"
                            value={perfil.email || ''}
                            onChange={e => setPerfil({...perfil,[e.target.name] : e.target.value})} 
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
  
  export default EditarPerfil