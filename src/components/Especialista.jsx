import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Especialista.css";

async function enviarRecurso(endpoint, data, isFormData = false) {
  try {
    let options = {
      method: "POST",
      body: data,
    };

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

const Especialista = () => {
  const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
  const [horaInicio, setHoraInicio] = useState("09:00");
  const [horaFin, setHoraFin] = useState("10:00");

  const formatDateLocal = (date) => {
    if (!(date instanceof Date)) date = new Date(date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const parseLocalDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const toggleFecha = (date) => {
    const fechaStr = formatDateLocal(date);

    if (!horaInicio || !horaFin) {
      alert("Selecciona hora de inicio y fin primero");
      return;
    }

    if (horaInicio >= horaFin) {
      alert("La hora de fin debe ser posterior a la de inicio");
      return;
    }

    const indiceExistente = horariosSeleccionados.findIndex(
      (h) => h.fecha === fechaStr
    );

    if (indiceExistente !== -1) {
      const nuevos = horariosSeleccionados.filter((_, i) => i !== indiceExistente);
      setHorariosSeleccionados(nuevos);
    } else {
      const nuevoHorario = {
        fecha: fechaStr,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
      };
      setHorariosSeleccionados([...horariosSeleccionados, nuevoHorario]);
    }
  };

  const eliminarHorario = (index) => {
    const nuevos = horariosSeleccionados.filter((_, i) => i !== index);
    setHorariosSeleccionados(nuevos);
  };

const guardarHorario = async () => {
  if (horariosSeleccionados.length === 0) {
    alert("No hay horarios para guardar");
    return;
  }

  const usuarioId = localStorage.getItem("usuarioId");

  if (!usuarioId) {
    alert("No se encontró el ID de usuario");
    return;
  }

  try {
    const promesas = horariosSeleccionados.map((horario) => {
      return enviarRecurso("horarios/crear-horarios/", {
        fecha: horario.fecha,
        hora_inicio: horario.hora_inicio,
        hora_fin: horario.hora_fin,
        usuario: parseInt(usuarioId),
      });
    });

    const resultados = await Promise.all(promesas);

    // 🔥 Validación REAL: detecta si algún campo es un array (DRF errors)
    const fallas = resultados.filter((r) => {
      return r && Object.values(r).some((v) => Array.isArray(v));
    });

    if (fallas.length === 0) {
      alert("Horarios guardados correctamente");
      setHorariosSeleccionados([]);
    } else {
      console.log("Errores:", fallas);
      alert("Algunos horarios no se guardaron. Revisa consola.");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al guardar.");
  }
};


  const limpiarTodo = () => {
    setHorariosSeleccionados([]);
    setHoraInicio("09:00");
    setHoraFin("10:00");
  };

  const formatearFecha = (fechaStr) => {
    return parseLocalDate(fechaStr).toLocaleDateString("es-CR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="especialista">
      <h2>Panel del Especialista</h2>

      <div className="tarjeta-horarios">
        <h3>Selecciona el horario disponible</h3>

        <div className="botones-horario">
          <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
          <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
        </div>
      </div>

      <div className="tarjeta-calendario">
        <h3>Selecciona tus fechas disponibles</h3>
        <Calendar onClickDay={toggleFecha} locale="es-CR" className="react-calendar" />
      </div>

      {horariosSeleccionados.length > 0 && (
        <div className="fechas-seleccionadas">
          <h4>Horarios Seleccionados ({horariosSeleccionados.length})</h4>

          <ul>
            {horariosSeleccionados
              .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
              .map((h, i) => (
                <li key={i}>
                  {formatearFecha(h.fecha)} — {h.hora_inicio} a {h.hora_fin}
                  <button className="eliminar" onClick={() => eliminarHorario(i)}>
                    Eliminar
                  </button>
                </li>
              ))}
          </ul>

          <button className="guardar" onClick={guardarHorario}>Guardar Horarios</button>
          <button className="limpiar" onClick={limpiarTodo}>Limpiar Todo</button>
        </div>
      )}
    </div>
  );
};

export default Especialista;
