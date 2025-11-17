import React, { useEffect, useState } from 'react';
import '../styles/cliente.css';
import { getData, postData } from '../services/fetch';

const Cliente = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [eventos, setEventos] = useState([]);
  const [recursos, setRecursos] = useState([]); 
  const [textoMentoria, setTexto] = useState('');

  //  Es para obtener las suscripciones del usuario y los recursos disponibles
  useEffect(() => {
    async function traerDatos() {
      const usuario = JSON.parse(localStorage.getItem("usuarios"));
      const recursosData = await getData("recursos/crear-recurso");
      setRecursos(recursosData || []);
    }
    traerDatos();
  }, []);

  const manejarCambioFecha = (e) => {
    setFechaSeleccionada(e.target.value);
  };

  // Envía una solicitud de mentoría con la fecha y el texto ingresado
  const agendarMentoria = async () => {
    const objMentoria = {
      idUsuario: JSON.parse(localStorage.getItem("usuarios")).id,
      nombreUsuario: JSON.parse(localStorage.getItem("usuarios")).nombre,
      fecha: fechaSeleccionada,
      texto: textoMentoria
    }
    await postData('mentorias', objMentoria);
  };

  // Obtiene los recursos que el usuario ha seguido según sus suscripciones
  const recursosSeguidos = eventos
    .map(ev => recursos.find(r => r.id === ev.idCurso))
    .filter(Boolean);

  // Filtra los eventos que coinciden con la fecha seleccionada
  const eventosDelDia = eventos.filter((evento) => {
    if (!evento.fecha || !fechaSeleccionada) return false;
    const fechaEvento = new Date(evento.fecha).toISOString().split('T')[0];
    return fechaEvento === fechaSeleccionada;
  });

  return (
    <div className="pagina-cliente">
      <h2>Calendario de Mentorias</h2>
      <p>Selecciona una fecha para ver espacios disponibles:</p>

      <div className="calendario-contenedor">
        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={fechaSeleccionada}
          onChange={manejarCambioFecha}
        />
      </div>
      {fechaSeleccionada && (
        <div className="resultado-fecha">
          <p>Has seleccionado: <strong>{fechaSeleccionada}</strong></p>
          {eventosDelDia.length > 0 ? (
            <ul className="lista-eventos">
              {eventosDelDia.map((evento, index) => (
                <li key={index} className="evento">
                  <strong>{evento.nombreCurso}</strong> <span>({evento.tipo || 'sin tipo'})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="sin-eventos">No hay eventos registrados para esta fecha.</p>
          )}
        </div>
      )}

      {/* Formulario para solicitar mentoría */}
      <input type="text" className="input-Texto" placeholder='Texto mentoria' onChange={(e) => setTexto(e.target.value)} />
      <button className='mentoriaBtn' onClick={agendarMentoria}>Solicitar mentoría</button>

      {/* Muestra todos los recursos si no hay fecha seleccionada */}
      {!fechaSeleccionada && (
        <div className="resultado-general">
          <h2>Recursos</h2>
          <h3>Recursos que has leído:</h3>
          {recursosSeguidos.length > 0 ? (
            <ul className="lista-eventos">
              {recursosSeguidos.map((recurso, index) => (
                <li key={index} className="evento">
                  <strong>{recurso.nombre}</strong> <br />
                  <span>{recurso.descripcion}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="sin-eventos">Aún no has seguido ningún recurso.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cliente;
