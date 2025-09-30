import React, { useEffect, useState } from 'react';
import '../styles/cliente.css';
import { getData } from '../services/fetch';


const Cliente = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [eventos,setEventos] = useState([])

  const manejarCambioFecha = (e) => {
    setFechaSeleccionada(e.target.value);
  };

  useEffect(()=>{
    async function traerEventos() {
      const peticion = await getData("suscripciones")
      const filtroEventos = peticion.filter((u)=>u.idUsuario == JSON.parse(localStorage.getItem("usuarios")).id)
      setEventos(filtroEventos)
      console.log(filtroEventos);
      
    }
    traerEventos()
  },[])

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
                  <strong>{evento.titulo}</strong> <span>({evento.tipo})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="sin-eventos">No hay eventos registrados para esta fecha.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cliente;

