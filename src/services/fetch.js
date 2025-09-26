async function postData(endpoint,obj) {
   try {
     const peticion = await fetch(`http://localhost:3001/${endpoint}`,{
         method: 'POST',
         headers:{
             "Content-Type": "application/json"
         },
         body: JSON.stringify(obj)
     })
     const respuesta = await peticion.json()
     console.log(respuesta);
     return respuesta
   } catch (error) {
        console.error(error);
   }
}
async function getData(endpoint) {
   try {
     const peticion = await fetch(`http://localhost:3001/${endpoint}`,{
         method: 'GET',
         headers:{
             "Content-Type": "application/json"
         }
             })
     const respuesta = await peticion.json()
     console.log(respuesta);
     return respuesta
   } catch (error) {
        console.error(error);
   }
}

async function enviarRecurso(recurso, nuevoRecurso) {
  try {
    const respuesta = await fetch(`http://localhost:3001/${recurso}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoRecurso)
    });

    const resultado = await respuesta.json();
    console.log("Recurso guardado:", resultado);
    return resultado;
  } catch (error) {
    console.error("Error al guardar el recurso:", error);
  }
}



export {postData,getData,enviarRecurso}