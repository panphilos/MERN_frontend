const Alerta = ({alerta}) => {
  return (
    //  Mentre "alerta" tingui la propietat "error", mostrarem el fons vermell
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-s-xl text-white font-bold text-sm mb-10`}>
        {alerta.msg} {/* alerta.msg agafa el valor del valor de la funció "Alerta" */}
    </div>
  )
}

export default Alerta