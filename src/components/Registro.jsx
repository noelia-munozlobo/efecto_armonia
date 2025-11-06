import React, { useState } from 'react';
import '../styles/Registro.css';
import { postData } from '../services/fetch';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  // Estados para capturar los datos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  // Envía los datos del nuevo usuario y redirige a la página de sesión
  const agregarUsuario = async (e) => {
    e.preventDefault();
    const obj = {
      nombre,
      correo,
      contraseña,
      tipoUsuario: "usuario"
    };

    try {
      const respuesta = await postData("usuarios", obj);
      console.log('Respuesta del servidor:', respuesta);
      navigate("/sesion"); // Redirección tras registro 
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un problema al enviar el registro');
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      <form>
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
        <button type="button" onClick={agregarUsuario} className="boton-registro">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
