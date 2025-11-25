import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // importar el hook
import '../styles/RecuperarContrasena.css';

const generarContrasena = (longitud = 10) => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let contrasena = "";
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    contrasena += caracteres[indice];
  }
  return contrasena;
};

const RecuperarContrasena = () => {
  const [contrasenaTemporal, setContrasenaTemporal] = useState("");
  const navigate = useNavigate(); // inicializar navigate

  const manejarGenerar = () => {
    const nuevaContrasena = generarContrasena(12);
    setContrasenaTemporal(nuevaContrasena);
  };

  return (
    <div className="recuperar-pagina">
      <div className="recuperar-caja">

        <h2 className="recuperar-titulo">Recuperar Contraseña</h2>

        <p className="recuperar-texto">
          Haz clic en el botón para generar una contraseña temporal que podrás usar de inmediato.
        </p>

        <button className="recuperar-boton" onClick={manejarGenerar}>
          Generar contraseña
        </button>

        {contrasenaTemporal && (
          <div className="resultado">
            <p className="recuperar-texto"><strong>Tu contraseña temporal:</strong></p>
            <div className="contrasena-box">{contrasenaTemporal}</div>
          </div>
        )}

       
        <p className="recuperar-texto">
          ¿Quieres volver al inicio de sesión?{" "}
          <span
            className="recuperar-link"
            onClick={() => navigate("/Sesion")}
          >
            Haz clic aquí
          </span>
        </p>

      </div>
    </div>
  );
};

export default RecuperarContrasena;


