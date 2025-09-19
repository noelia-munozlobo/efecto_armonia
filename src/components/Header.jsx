import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';

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
        <Link to="/mentorias">Mentorías</Link>
        <span>|</span>
        <Link to="/cursos">Cursos</Link>
        <span>|</span>
        <Link to="/charlas">Charlas</Link>
        <span>|</span>
        <Link to="/recursos">Recursos</Link>
        <span>|</span>
        <Link to="/contacto">Contacto</Link>
      </nav>
    </header>
  );
};

export default Header;
