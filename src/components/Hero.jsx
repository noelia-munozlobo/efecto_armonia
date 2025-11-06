import React from 'react';
import '../styles/Hero.css';
import Fondo from '../img/Fondo.jpeg';

const Hero = () => (
  <section className="imagen-fondo">
    <img src={Fondo} alt="Fondo Efecto Armonía" className="fondo-img" />
    <div className="texto-superpuesto">
      <h1>Bienvenido</h1>
      <h1>A EFECTO ARMONIA</h1>
      <p>Tu espacio seguro para crecer emocionalmente.</p>
    </div>
  </section>
);

export default Hero;

