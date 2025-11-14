import React, { useState } from 'react';
import '../styles/Sesion.css';
import { loginUsuario } from '../services/fetch';
import { useNavigate } from 'react-router-dom';

const Sesion = () => {
  const [username, setUsername] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const iniciarSesion = async () => {

    const respuesta = await loginUsuario(username, contraseña);

    if (respuesta.token) {
      // Guardar token
      localStorage.setItem("token", respuesta.token);

      // Guardar info usuario
      localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));

      if (respuesta.usuario.rol === "cliente") {
        navigate("/PagCliente");
      } else if (respuesta.usuario.rol === "admin") {
        navigate("/PagAdmin");
      }

    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="pagina-sesion">  
      <div className="sesion-container">  
        <h2>Inicio de Sesión</h2>

        <form>
          <div className="campo">
            <label>Nombre de usuario</label>
            <input
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Contraseña</label>
            <input
              type="password"
              required
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          <button type="button" onClick={iniciarSesion} className="boton-registro">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sesion;
