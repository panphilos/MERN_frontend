import usePacientes from '../hooks/usePacientes'

const Paciente = ({paciente}) => { //El component "paciente.jsx" s'utilitza en el component "ListadoPacientes.jsx" on se li passa la info via props.


   const { setEdicion, pacientes, eliminarPaciente } = usePacientes();

   const {email, fecha, nombre, propietario, sintomas,_id} = paciente; //"paciente" nomes referencia al valor de la funció "Paciente"

   const formatearFecha = () => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'short'}).format(nuevaFecha) //Fem anar la API "Intl" nativa que serveix per a formatejar dates
    }

  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
        <p className="font-bold uppercase text-indigo-600">Nombre:
            <span className='font-normal normal-case text-gray-800'>{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-600">Propietario
            <span className='font-normal normal-case text-gray-800'>{propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-600">Fecha Alta:
            <span className='font-normal normal-case text-gray-800'>{formatearFecha(fecha)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-600">Síntomas:
            <span className='font-normal normal-case text-gray-800'>{sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button
                type="button"
                className='py-2 px-10 text-white bg-indigo-600 rounded-lg hover:bg-indigo-800'
                onClick={() => setEdicion(paciente)} //Aquí passem la info de paciente a l'"estat global" de l'app.
            >
                Editar
            </button>

            <button
                type="button"
                className='py-2 px-10 text-white bg-red-600 rounded-lg hover:bg-red-800'
                onClick={() =>{ eliminarPaciente(paciente) }}
            >
                Eliminar
            </button>
        </div>
    </div>
  )
}

export default Paciente