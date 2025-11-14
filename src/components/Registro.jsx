import React, { useState } from 'react';
import '../styles/Registro.css';
import { postData } from '../services/fetch';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telefono, setTelefono] = useState('');

  const navigate = useNavigate();

  const agregarUsuario = async (e) => {
    e.preventDefault();

    const obj = {
      username: nombreUsuario,
      email: correo,
      password: contraseña,
      first_name: firstName,
      last_name: lastName,
      telefono: telefono,
      rol: "cliente"
    };

    try {
      const respuesta = await postData("usuarios/crear-usuario/", obj);
      console.log('Respuesta del servidor:', respuesta);
      navigate("/sesion");
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un problema al enviar el registro');
    }
  };

    return (
  <div className="pagina-registro">
    <div className="registro-container">
      <h2>Registro</h2>
      <form>

        <div className="campo">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            required
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="lastName">Apellidos</label>
          <input
            type="text"
            id="lastName"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            required
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            required
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            required
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        <button type="button" onClick={agregarUsuario} className="boton-registro">
          Registrarse
        </button>
      </form>
    </div>
  </div>
); 
}


export default Registro;

