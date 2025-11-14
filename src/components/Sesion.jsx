import React, { useState } from 'react';
import '../styles/Sesion.css';
import { getData } from '../services/fetch';
import { useNavigate } from 'react-router-dom';

const Sesion = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const getUsers = async () => {
    const usuarios = await getData("usuarios");

    const usuarioCliente = usuarios.find(
      (usuario) => usuario.email === correo && usuario.password === contraseña && usuario.rol === "cliente"
    );

    const usuarioAdmin = usuarios.find(
      (usuario) => usuario.email === correo && usuario.password === contraseña && usuario.rol === "admin"
    );

    if (usuarioCliente) {
      navigate("/PagCliente");
      localStorage.setItem("usuarios", JSON.stringify(usuarioCliente));
      return;
    }

    if (usuarioAdmin) {
      navigate("/PagAdmin");
      localStorage.setItem("usuarios", JSON.stringify(usuarioAdmin));
      return;
    }

    alert("Credenciales incorrectas");
  };

  return (
    <div className="pagina-sesion">  
      <div className="sesion-box">  
        <h2 className="sesion-titulo">Inicio de Sesión</h2>
        <form className="sesion-form">
          <div className="sesion-campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              required
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="sesion-campo">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              required
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          <button type="button" onClick={getUsers} className="sesion-boton">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sesion;
