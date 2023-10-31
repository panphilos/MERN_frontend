import { Outlet } from "react-router-dom"   //Afegir el outlet.

const AuthLayout = () => {
  return (
    <> 

        <main className="container mx-auto md:grid grid-cols-2 mt-12 gap-12 p-5 items-center">
             <Outlet/> {/* El outlet significa que aquí s'injectarà contingut d'altres components fills, indicat en l'app.jsx */}
        </main>

    </>
  )
}

export default AuthLayout

//Instal·lant l'extensió "ES7+ React/Redux/React-Native snippets", ens permet automatitzar algunes comandes.
// Type "rafce" per automatitzar la sintaxis d'un component.

//<> </> es diu "Fragment" i no genera codi HTML

