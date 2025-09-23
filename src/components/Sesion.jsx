import React, { useState } from 'react';
import '../styles/Sesion.css';

const Sesion = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');

  const getUsuarios = async (e) => {
    e.preventDefault();

    
    const getData = async () => {
      return [
        { nombre: 'Fede', contraseña: '123' },,
        
      ];
    };

    const usuarios = await getData();

   
    const usuarioValido = usuarios.find(
      (usuario) => usuario.nombre === nombre && usuario.contraseña === contraseña
    );

   
    if (usuarioValido) {
      alert('Inicio de sesión exitoso');
     
    } else {
      alert('Nombre o contraseña incorrectos');
    }
  };

  return (
    <div className="registro-container">
      <h2>Inicio de Sesión</h2>
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
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            required
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        <button type="submit" className="boton-registro">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Sesion;

