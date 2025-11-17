// ===============================
// PETICIONES GENERALES JSON
// ===============================

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
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: "PUT",
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

// ===============================
// 🚀 ENVÍO DE RECURSOS (SOPORTA FORM DATA E IMÁGENES)
// ===============================

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

// ===============================
// OBTENER MENTORIAS
// ===============================

async function obtenerMentorias() {
  try {
    const respuesta = await fetch(`http://127.0.0.1:8000/mentorias/`, {
      method: "GET"
    });

    const resultado = await respuesta.json();
    console.log("Mentorías obtenidas:", resultado);
    return resultado;

  } catch (error) {
    console.error("Error al obtener las mentorías:", error);
  }
}

// ===============================
// LOGIN USUARIO
// ===============================

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

// ===============================
// EXPORTS
// ===============================

export {
  postData,
  getData,
  putData,
  deleteData,
  enviarRecurso,
  obtenerMentorias,
  loginUsuario
};
