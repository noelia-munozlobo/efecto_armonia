import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';

//Header con barra e navegacion
const Header = () => {
  return (
    <header className="barra-navegacion">
      <div className="logo">
        <img src={logo} alt="Logo Efecto Armonía" />
        <div className="texto-logo">
          <h1>Efecto Armonía</h1>
          <p>Bienestar emocional en comunidad</p>
        </div>
      </div>
      <nav className="menu">
        <Link to="/">Inicio</Link>
        <span>|</span>
        <Link to="/recursos">Recursos</Link>
        <span>|</span>
         <Link to="PagPsicologos">Especialistas</Link>
        <span>|</span>
        <Link to="/contacto">Contacto</Link>
        <span>|</span>
        {localStorage.getItem('usuarios') && (
          <>
            <Link to="/PagCliente">Mi Perfil</Link>
            <span>|</span>
          </>
        )}
        <Link to="/registro">Registro</Link>
        <span>|</span>
        <Link to="/sesion">Inicio de sesión</Link>
        <span>|</span>
        <Link to="/" onClick={() => {
          localStorage.clear()
        }}>Cerrar Sesion</Link>
      </nav>
    </header>
  );
};

export default Header;
