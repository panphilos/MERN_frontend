import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import Login from './paginas/login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';
import AdministrarPacientes from './paginas/administrarPacientes';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/cambiarPassword';

import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

function App() {

  console.log(import.meta.env.VITE_BACKEND_URL) //Així accedim a les variables d'entorn de VITE (que estan en l'arxiu .env del frontend). Per al frontend només.
                                                // Les variables d'entorn de VITE han d'iniciar sempre amb el prefix "VITE_"
  console.log(import.meta.env.IMAGENES_URL)

  return (
    <BrowserRouter>
        <AuthProvider> {/* Fem disponibles les dades d'Auth en tots els components */}
          <PacientesProvider>
            <Routes>
                <Route path="/" element={<AuthLayout />}>  {/* En el path "/" carrega el component AuthLayout, el qual és un component del layout pare  */}
                  <Route index element={<Login />} /> {/* Es un component fill del layout pare. Afegir "index", en cas que sigui el primer component */}
                  <Route path="registrar" element={ <Registrar/> } />
                  <Route path="olvide-password" element={ <OlvidePassword/> } />
                  <Route path="olvide-password/:token" element={ <NuevoPassword/> } />
                  <Route path="confirmar/:id" element={ <ConfirmarCuenta/> } />
                </Route> 

                <Route path="/admin" element={<RutaProtegida />}>  {/* En el path "/" carrega el component AuthLayout, el qual és un component del layout pare  */}
                  <Route index element={<AdministrarPacientes />} /> {/* Es un component fill del layout pare. Afegir "index", en cas que sigui el primer component */}
                  <Route path="perfil" element={<EditarPerfil />} />
                  <Route path="cambiar-password" element={<CambiarPassword />} />
                </Route>            
            </Routes>
          </PacientesProvider>
        </AuthProvider>
    </BrowserRouter>

    )
}

export default App


//1. Abans de tot, instal·lem tailwind, postcss i autoprefixer: "npm i --save-dev -g tailwindcss postcss autoprefixer "
//2. npx tailwindcss init -p 
//3. Instalem una llibreria de routing: "npm i react-router-dom"