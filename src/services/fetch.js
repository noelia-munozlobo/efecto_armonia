async function postData(endpoint, obj) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });

    const respuesta = await peticion.json();
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}

async function postDataAutenticado(endpoint, obj) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(obj)
    });

    const respuesta = await peticion.json();
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}
async function getData(endpoint) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/${endpoint}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getData:", error);
    return [];
  }
}

async function putData(endpoint, obj) {
  try {
    const formData = new FormData();

    for (let key in obj) {
      formData.append(key, obj[key]);
    }

    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: "PUT",
      body: formData, 
    });

    const respuesta = await peticion.json();
    console.log("RAW PUT RESPONSE:", respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}


async function deleteData(endpoint) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: "DELETE"
    });

    const respuesta = await peticion.json();
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}

async function enviarRecurso(endpoint, data, isFormData = false) {
  try {
    let options = {
      method: "POST",
      body: data
    };

    // Si NO es FormData, entonces enviamos JSON normal
    if (!isFormData) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(data);
    }

    const respuesta = await fetch(`http://127.0.0.1:8000/${endpoint}`, options);
    const resultado = await respuesta.json();

    console.log("Recurso guardado:", resultado);
    return resultado;

  } catch (error) {
    console.error("Error al guardar el recurso:", error);
  }
}

async function obtenerMentorias() {
  try {
    const respuesta = await fetch(`http://127.0.0.1:8000/mentorias/crear-mentorias/`, {
      method: "GET"
    });

    const resultado = await respuesta.json();
    console.log("Mentorías obtenidas:", resultado);
    return resultado;

  } catch (error) {
    console.error("Error al obtener las mentorías:", error);
  }
}
const loginUsuario = async (username, password) => {
  const response = await fetch("http://127.0.0.1:8000/usuarios/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  return response.json();
};

async function patchData(endpoint, obj) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });

    const respuesta = await peticion.json();
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}

export { postData, getData, putData, deleteData, enviarRecurso, obtenerMentorias, loginUsuario, patchData,postDataAutenticado };