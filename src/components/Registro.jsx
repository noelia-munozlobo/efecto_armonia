import React, { useState } from 'react';
import '../styles/Registro.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const submit = (e) => {
    e.preventDefault();
    alert('¡Registro enviado!');
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      <form onSubmit={submit}>
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            required
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            required
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        <button type="submit" className="boton-registro">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;

