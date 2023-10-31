import { useContext } from 'react' //useContext serveix per extreure les dades del contexte global.
import PacientesContext from '../context/PacientesProvider';


const usePacientes = () => {

    return useContext(PacientesContext); //useContext serveix per a fer disponible els valors del provider (AuthProvider.jsx).
}

//Sempre que volguem accedir a la informació del Auth Provider (la variable "auth"), ho haurem de fer des de aquest arxiu.

export default usePacientes;