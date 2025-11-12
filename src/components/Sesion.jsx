import React, { useState } from 'react';
import '../styles/Sesion.css';
import { getData } from '../services/fetch';
import { useNavigate } from 'react-router-dom';

const Sesion = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  // Verifica si el usuario existe y redirige según su tipo
  const getUsers = async () => {
    const usuarios = await getData("usuarios");

    const usuarioValido = usuarios.find(
      (usuario) => usuario.nombre === nombre && usuario.contraseña === contraseña && usuario.tipoUsuario == "usuario"
    );

    const usuarioValidoAdmin = usuarios.find(
      (usuario) => usuario.nombre === nombre && usuario.contraseña === contraseña && usuario.tipoUsuario == "admin"
    );

    if (usuarioValido) {
      navigate("/PagCliente"); // Redirige a vista cliente
      localStorage.setItem("usuarios", JSON.stringify(usuarioValido));
      return;
    }

    if (usuarioValidoAdmin) {
      navigate("/PagAdmin"); // Redirige a vista admin
      localStorage.setItem("usuarios", JSON.stringify(usuarioValidoAdmin));
      return;
    }
  };

 return (
  <div className="pagina-sesion">  
    <div className="sesion-container">  
      <h2>Inicio de Sesión</h2>

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
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            required
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        <button type="button" onClick={getUsers} className="boton-Inicio">
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
);
};

export default Sesion;


