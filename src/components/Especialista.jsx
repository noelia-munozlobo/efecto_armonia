import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Especialista.css';

const Especialista = () => {
  const [horariosPorFecha, setHorariosPorFecha] = useState({});
  const [fechaActiva, setFechaActiva] = useState(null);

  const [citasSolicitadas, setCitasSolicitadas] = useState([
    { nombre: 'Ana López', fecha: '2025-11-24', motivo: 'Ansiedad' },
    { nombre: 'Carlos Rojas', fecha: '2025-11-26', motivo: 'Duelo' },
  ]);

  const horariosDisponibles = [
    '9:00–10:00am',
    '10:00–11:00am',
    '2:00–3:00pm',
    '3:00–4:00pm'
  ];

  const formatDateLocal = (date) => {
    if (!(date instanceof Date)) date = new Date(date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const parseLocalDate = (dateStr) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const toggleFecha = (date) => {
    const fechaStr = formatDateLocal(date);
    setFechaActiva(fechaStr);
    setHorariosPorFecha((prev) => ({
      ...prev,
      [fechaStr]: prev[fechaStr] || []
    }));
  };

  const toggleHorario = (horario) => {
    if (!fechaActiva) return;
    setHorariosPorFecha((prev) => {
      const horarios = prev[fechaActiva] || [];
      const nuevosHorarios = horarios.includes(horario)
        ? horarios.filter(h => h !== horario)
        : [...horarios, horario];
      return { ...prev, [fechaActiva]: nuevosHorarios };
    });
  };

  const guardarHorario = async () => {
    try {
      const respuesta = await fetch('horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(horariosPorFecha)
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
    setHorariosPorFecha({});
    setFechaActiva(null);
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

      {/* 🔹 Calendario y horarios en la misma tarjeta */}
      <section className="tarjeta-calendario">
        <h3>Selecciona tus fechas y horarios disponibles</h3>
        
        <Calendar
          onClickDay={toggleFecha}
          locale="es-CR"
          tileClassName={({ date }) => {
            const fechaStr = formatDateLocal(date);
            return horariosPorFecha[fechaStr] ? 'resaltado' : null;
          }}
        />

        {fechaActiva ? (
          <div className="botones-horario">
            {horariosDisponibles.map((horario, i) => (
              <button
                key={i}
                className={horariosPorFecha[fechaActiva]?.includes(horario) ? 'activo' : ''}
                onClick={() => toggleHorario(horario)}
                type="button"
              >
                {horario}
              </button>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Primero selecciona una fecha en el calendario
          </p>
        )}

        <div className="fechas-seleccionadas">
          <h4>Fechas seleccionadas:</h4>
          <ul>
            {Object.entries(horariosPorFecha).map(([fecha, horarios]) => (
              <li key={fecha}>
                {parseLocalDate(fecha).toLocaleDateString('es-CR')} → {horarios.join(', ') || 'Sin horarios'}
              </li>
            ))}
          </ul>
          <button className="guardar" onClick={guardarHorario} type="button">Guardar horarios</button>
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
