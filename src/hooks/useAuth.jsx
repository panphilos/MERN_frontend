//Pel que fa al nom d'aquest axriu, per convenció, els teus propis hooks es recomana afegir-hi el terme "use" al davant
import { useContext } from 'react' //useContext serveix per extreure les dades del contexte global.
import AuthContext from '../context/AuthProvider'

const useAuth = () => {

    return useContext(AuthContext); //useContext serveix per a fer disponible els valors del provider (AuthProvider.jsx).
}

//Sempre que volguem accedir a la informació del Auth Provider (la variable "auth"), ho haurem de fer des de aquest arxiu.

export default useAuth;