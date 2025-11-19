import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Especialista.css';

const Especialista = () => {
  const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);
  const [citasSolicitadas, setCitasSolicitadas] = useState([
    { nombre: 'Ana López', fecha: '2025-11-24', motivo: 'Ansiedad' },
    { nombre: 'Carlos Rojas', fecha: '2025-11-26', motivo: 'Duelo' },
  ]);

  const horariosDisponibles = ['9:00–10:00am', '10:00–11:00am', '2:00–3:00pm', '3:00–4:00pm'];

  const toggleHorario = (horario) => {
    setHorariosSeleccionados((prev) =>
      prev.includes(horario) ? prev.filter(h => h !== horario) : [...prev, horario]
    );
  };

  // formatea Date (local) a YYYY-MM-DD
  const formatDateLocal = (date) => {
    if (!(date instanceof Date)) date = new Date(date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // parsea un string YYYY-MM-DD a Date local (00:00:00 local)
  const parseLocalDate = (dateStr) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  // toggle usando fecha local (evita desplazamiento por zona horaria)
  const toggleFecha = (date) => {
    const fechaStr = formatDateLocal(date);
    setFechasSeleccionadas((prev) =>
      prev.includes(fechaStr) ? prev.filter(f => f !== fechaStr) : [...prev, fechaStr]
    );
  };

  const guardarHorario = async () => {
    const nuevoRegistro = {
      horarios: horariosSeleccionados,
      fechas: fechasSeleccionadas
    };

    try {
      const respuesta = await fetch('http://localhost:3001/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoRegistro)
      });

      if (respuesta.ok) {
        alert('Horarios guardados correctamente en la base de datos');
      } else {
        alert('Error al guardar los horarios');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  const limpiarTodo = () => {
    setHorariosSeleccionados([]);
    setFechasSeleccionadas([]);
  };

  const confirmarCita = (index) => {
    alert(`Cita confirmada con ${citasSolicitadas[index].nombre}`);
  };

  const eliminarCita = (index) => {
    const nuevasCitas = [...citasSolicitadas];
    nuevasCitas.splice(index, 1);
    setCitasSolicitadas(nuevasCitas);
  };

  return (
    <div className="especialista">
      <h2>Panel del Especialista</h2>

      <section className="tarjeta-horarios">
        <h3> Selecciona tus horarios disponibles</h3>
        <div className="botones-horario">
          {horariosDisponibles.map((horario, i) => (
            <button
              key={i}
              className={horariosSeleccionados.includes(horario) ? 'activo' : ''}
              onClick={() => toggleHorario(horario)}
              type="button"
            >
              {horario}
            </button>
          ))}
        </div>
      </section>

      <section className="tarjeta-calendario">
        <h3> Selecciona tus fechas disponibles</h3>
        <Calendar
          onClickDay={toggleFecha}
          locale="es-CR"
          // tileClassName compara usando formatDateLocal para evitar UTC
          tileClassName={({ date }) => {
            const fechaStr = formatDateLocal(date);
            return fechasSeleccionadas.includes(fechaStr) ? 'resaltado' : null;
          }}
          // Para que la selección visual use fechas locales si quieres pasar value:
          // value={fechasSeleccionadas.length ? fechasSeleccionadas.map(parseLocalDate) : null}
        />
        <div className="fechas-seleccionadas">
          <h4>Fechas seleccionadas:</h4>
          <ul>
            {fechasSeleccionadas.map((f, i) => (
              // renderiza con parseLocalDate para asegurar 00:00 local antes de toLocaleDateString
              <li key={i}>{parseLocalDate(f).toLocaleDateString('es-CR')}</li>
            ))}
          </ul>
          <button className="guardar" onClick={guardarHorario} type="button">Guardar horario</button>
        </div>
      </section>

      <section className="citas">
        <h3>Solicitudes de Citas</h3>
        <ul>
          {citasSolicitadas.map((cita, i) => (
            <li key={i}>
              <div className="cita-info">
                <strong>{cita.nombre}</strong> – {cita.fecha} ({cita.motivo})
              </div>
              <div className="cita-botones">
                <button className="confirmar" onClick={() => confirmarCita(i)} type="button">Confirmar</button>
                <button className="eliminar" onClick={() => eliminarCita(i)} type="button">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="tarjeta-acciones">
        <h3>Acciones generales</h3>
        <button className="limpiar" onClick={limpiarTodo} type="button">Limpiar todo</button>
      </section>
    </div>
  );
};

export default Especialista;
