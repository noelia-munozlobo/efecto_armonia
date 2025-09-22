import React from 'react';
import '../styles/Registro.css';

const Registro = () => {
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
          <input type="text" id="nombre" name="nombre" required />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo electrónico</label>
          <input type="email" id="correo" name="correo" required />
        </div>

        <div className="campo">
          <label htmlFor="contraseña">Contraseña</label>
          <input type="password" id="contraseña" name="contraseña" required />
        </div>

        <button type="submit" className="boton-registro">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
