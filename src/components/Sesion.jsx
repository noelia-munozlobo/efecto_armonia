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
    console.log(respuesta);
    
    if (respuesta.token) {
      // Guardar token
      localStorage.setItem("token", respuesta.token);

      // Guardar info usuario
      localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
      localStorage.setItem("usuarioId", respuesta.id);
      if (respuesta.rol === "cliente") {
        navigate("/PagCliente");
      } else if (respuesta.rol === "admin") {
        navigate("/PagAdmin");
      }

    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="armonía-pagina">
  <div className="armonía-caja">
    <form className="armonía-formulario">
      <h2 className="armonía-titulo">Inicio de Sesión</h2>

      <div className="armonía-campo">
        <label className="armonía-etiqueta">Nombre de usuario</label>
        <input
          type="text"
          required
          className="armonía-input"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="armonía-campo">
        <label className="armonía-etiqueta">Contraseña</label>
        <input
          type="password"
          required
          className="armonía-input"
          onChange={(e) => setContraseña(e.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={iniciarSesion}
        className="armonía-boton"
      >
        Iniciar Sesión
      </button>
    </form>
  </div>
</div>
)
}
 ;

export default Sesion;
