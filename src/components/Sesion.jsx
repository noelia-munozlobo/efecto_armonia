import React from 'react';
import '../styles/Sesion.css';

const Sesion = () => {
  const submit = (e) => {
    e.preventDefault();
    alert('Sesión Iniciada');
  };

  return (
    <div className="Sesion-container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={submit}>
        <div className="campoNombre">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" required />
        </div>

        <div className="campoContraseña">
          <label htmlFor="contraseña">Contraseña</label>
          <input type="password" id="contraseña" name="contraseña" required />
        </div>

        <button type="submit" className="boton-Inicio">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Sesion;