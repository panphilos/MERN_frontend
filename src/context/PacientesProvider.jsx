import {createContext, useState, useEffect } from 'react'
import clienteAxios from '../components/config/axios'
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {  //Ficant l'export així ho fem més curt (més directe)

    const [ pacientes, setPacientes ] = useState([])
    const [ paciente, setPaciente ] = useState({})
    const { auth } = useAuth(); //Agafem el useAuth.

    useEffect(() => {
        const obtenerPacientes = async () =>{

            try{
                console.log('test')
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config) //En Axios, la consulta per defecte, és GET
                setPacientes(data);
                console.log('OBTENIM PACIENTS',data)

            }catch(error){
                console.log(error)
            }
        }

        obtenerPacientes();

    }, [auth]) //Fiquem auth com a dependencia. Si no especifiquem dependencia, el useEffect s'executarà una sola vegada (normalment a l'inici). Si un usuari es deslogueja, i torna a iniciar seessió amb un altre, "obtenerPacientes()" ja s'hauria executat en la sessió anterior, fent que no es mostressin els pacients de la última sessió loguejada.

    const guardarPaciente = async (paciente) => {

        console.log('Tenim id?', paciente)

        const token = localStorage.getItem('token');
               // console.log(token)
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

         
        if(paciente.id){  //Si l'objecte "paciente" ja te id, vol dir que estem editant un pacient.
            console.log('REGISTRE EDITAT',paciente.id)

             try{
                    const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                    console.log('data',data);
                    console.log('data_id', data._id)

                    const pacientesActualizado = pacientes.map ( pacienteState => pacienteState._id == data._id ? data : pacienteState )

                    setPacientes(pacientesActualizado)
                    console.log('Pacientes actualizado',pacientesActualizado)
                    

             }catch (error){   
                console.log(error)      
             }   

            }else{   //Si l'objecte "paciente" no te id:
                console.log('NOU REGISTRE AFEGIT')

                try{
                
                    const { data } = await clienteAxios.post('/pacientes', paciente, config)
        
                    console.log(data);
        
                    //Treiem dades de la db que son de Moongose
                    const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;  // Amb el "Spread operator" (...) (tipus "Rest operator")Filtrem elements que no ens interessen i els fiquem en un nou array "pacienteAlmacenado"
        
                    console.log(pacienteAlmacenado)
        
                    setPacientes([pacienteAlmacenado, ...pacientes]) //Afegim dades a l'state. (primer el pacient que s'ha afegit en el formulari, seguit de tots els pacients)
                    console.log(pacientes);
                
                }catch(error){
                    console.log(error.response.data)
                }
            }
        } 

        const setEdicion = (paciente) => {    //No es un "setEdicion" de un state.

        setPaciente(paciente);

        console.log('editando paciente ', paciente)
    }

    const eliminarPaciente = async paciente =>{
        console.log(paciente)

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        //Confirmem que el pacient vol esborrar el pacient
        const confirmar = confirm(`¿Confirmas que deseas Eliminar el paciente ${paciente.nombre} ?`)

        if(confirmar){
            try{
                const { data } = await clienteAxios.delete(`/pacientes/${paciente._id}`,config);
                console.log(data);

                const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== paciente._id );
                
                setPacientes(pacientesActualizado);

            }catch(error){
                console.log(error);
            }
        }

    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}  //Es obligatori passar un prop (com que no tenim res a passar, el deiem buit)
        >

            {children}
            
        </PacientesContext.Provider>

    )

}

export default PacientesContext; //A diferència del AuthProvider, en aquest cas hem creat el Context en el mateix arxiu.