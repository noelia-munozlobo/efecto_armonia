import React, { useState } from 'react';
import '../styles/Sesion.css';
import { getData } from '../services/fetch';
import { useNavigate } from 'react-router-dom';
const Sesion = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate()
  const getUsers = async () => {
    const usuarios = await getData("usuarios");

    const usuarioValido = usuarios.find(
      (usuario) => usuario.nombre === nombre && usuario.contraseña === contraseña && usuario.tipoUsuario == "usuario"
    );
    const usuarioValidoAdmin = usuarios.find(
      (usuario) => usuario.nombre === nombre && usuario.contraseña === contraseña && usuario.tipoUsuario == "admin"
    );
    if (usuarioValido) {
      navigate("/")
      return
    }
     if (usuarioValidoAdmin) {
      navigate("/PagAdmin")
      return
    }
  };


  return (
    <div className="registro-container">
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

        <button type="button" onClick={getUsers} className="boton-registro">Iniciar Sesión</button>
      </form>
    </div>
  );
}
export default Sesion;

