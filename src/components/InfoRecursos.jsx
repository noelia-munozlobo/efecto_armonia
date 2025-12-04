
import React, { useEffect, useState } from 'react';
import "../styles/InfoRecursos.css"
import { getData } from '../services/fetch';


function InfoRecursos() {
  const [infoRecurso,setInfoRecurso] = useState([])

  useEffect(()=>{
      async function traerInfo() {
        const peticion = await getData(`recursos/recurso/${localStorage.getItem("id_recurso")}`);
        setInfoRecurso(peticion[0]);
        console.log(peticion);
        
      }
      traerInfo();
  },[])

  return (
    <div className="info-container">
     
    </div>
  );
}

export default InfoRecursos;
