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
  <div className="armonía-pagina">
  <div className="armonía-caja">
    <h2 className="armonía-titulo">Registro</h2>
    <form className="armonía-formulario" onSubmit={agregarUsuario}>
      <div className="armonía-grid">
        <div className="armonía-campo">
          <label htmlFor="username" className="armonía-etiqueta">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            className="armonía-input"
            required
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>

        <div className="armonía-campo">
          <label htmlFor="firstName" className="armonía-etiqueta">Nombre</label>
          <input
            type="text"
            id="firstName"
            className="armonía-input"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="armonía-campo">
          <label htmlFor="lastName" className="armonía-etiqueta">Apellidos</label>
          <input
            type="text"
            id="lastName"
            className="armonía-input"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="armonía-campo">
          <label htmlFor="telefono" className="armonía-etiqueta">Teléfono</label>
          <input
            type="text"
            id="telefono"
            className="armonía-input"
            required
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div className="armonía-campo">
          <label htmlFor="correo" className="armonía-etiqueta">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            className="armonía-input"
            required
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="armonía-campo">
          <label htmlFor="contraseña" className="armonía-etiqueta">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            className="armonía-input"
            required
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="armonía-boton">
        Registrarse
      </button>
    </form>
  </div>
</div>
    )};
export default Registro;

