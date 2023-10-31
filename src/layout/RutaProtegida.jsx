import useAuth from "../hooks/useAuth" //Recordem que useAuth és un Custom hook
import { Outlet, Navigate } from "react-router-dom" //Sino afegim l'Outlet, no mostrarà res :/
import Footer from "../components/Footer";
import Header from "../components/Header";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    console.log('auth des de RutaProtegida',auth)

    if(auth?._id){
        console.log('Hi ha auth');
    }else{ console.log('No hi ha auth')}

    console.log('cargando:', cargando);
    console.log(auth);
    

    if(cargando) return 'cargando...' //Afegim el return per a fer un break i que no arribi a direccionar-se la pagina. Quan la petició de l'Auth arriba, la variable "cargando" canvia de manera que seguim l'execució del codi. 
        


    console.log('Aquest missatge no shauria dexecutar fins que hagi carregat tot');


  return (
    <>
        <Header />
            {  auth?._id ? (
            <main className='container mx-auto mt-20'>
                <Outlet />
            </main> ) : <Navigate to="/" /> }
        <Footer />
    </>
  )
}

export default RutaProtegida