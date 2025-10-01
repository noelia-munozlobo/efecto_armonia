import React, { useEffect, useState } from 'react';
import '../styles/cliente.css';
import { getData, postData } from '../services/fetch';

const Cliente = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [eventos, setEventos] = useState([]);
  const [recursos, setRecursos] = useState([]); 
  const [textoMentoria, setTexto] = useState('');

  useEffect(() => {
    async function traerDatos() {
      const usuario = JSON.parse(localStorage.getItem("usuarios"));
      const suscripciones = await getData("suscripciones");
      const recursosData = await getData("recursos");
      const misSuscripciones = suscripciones.filter((u) => u.idUsuario === usuario.id);
      setEventos(misSuscripciones);
      setRecursos(recursosData || []);
    }
    traerDatos();
  }, []);

  const manejarCambioFecha = (e) => {
    setFechaSeleccionada(e.target.value);
  };

  const agendarMentoria = async () => {
    const objMentoria = {
      idUsuario: JSON.parse(localStorage.getItem("usuarios")).id,
      nombreUsuario: JSON.parse(localStorage.getItem("usuarios")).nombre,
      fecha: fechaSeleccionada,
      texto: textoMentoria
    }
    await postData('mentorias', objMentoria);
  };
  const recursosSeguidos = eventos
    .map(ev => recursos.find(r => r.id === ev.idCurso))
    .filter(Boolean);

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

      <input type="text" className="input-Texto" placeholder='Texto mentoria' onChange={(e) => setTexto(e.target.value)} />
      <button className='mentoriaBtn' onClick={agendarMentoria}>Solicitar mentoría</button>

      {!fechaSeleccionada && (
        <div className="resultado-general">
          <h2>Recursos que has seguido</h2>
          <h3>Todos los recursos seguidos:</h3>
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