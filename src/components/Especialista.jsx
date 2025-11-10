
import '../styles/Especialista.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

  const toggleFecha = (date) => {
    const fechaStr = date.toISOString().split('T')[0];
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

      <section className="horarios">
        <h3>Selecciona tus horarios disponibles</h3>
        <div className="botones-horario">
          {horariosDisponibles.map((horario, i) => (
            <button
              key={i}
              className={horariosSeleccionados.includes(horario) ? 'activo' : ''}
              onClick={() => toggleHorario(horario)}
            >
              {horario}
            </button>
          ))}
        </div>
      </section>

      <section className="calendario">
        <h3>Selecciona tus fechas disponibles</h3>
        <Calendar
          onClickDay={toggleFecha}
          value={null}
          locale="es-CR"
          tileClassName={({ date }) => {
            const fechaStr = date.toISOString().split('T')[0];
            return fechasSeleccionadas.includes(fechaStr) ? 'resaltado' : null;
          }}
        />
        <div className="fechas-seleccionadas">
          <h4>Fechas seleccionadas:</h4>
          <ul>
            {fechasSeleccionadas.map((f, i) => (
              <li key={i}>{new Date(f).toLocaleDateString('es-CR')}</li>
            ))}
          </ul>
          <button className="guardar" onClick={guardarHorario}>Guardar horario</button>
        </div>
      </section>

      <section className="citas">
        <h3>Solicitudes de Citas</h3>
        <ul>
          {citasSolicitadas.map((cita, i) => (
            <li key={i}>
              <strong>{cita.nombre}</strong> – {cita.fecha} ({cita.motivo})<br />
              <button className="confirmar" onClick={() => confirmarCita(i)}>Confirmar</button>
              <button className="eliminar" onClick={() => eliminarCita(i)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <button className="limpiar" onClick={limpiarTodo}>Limpiar todo</button>
      </section>
    </div>
  );
};

export default Especialista;
