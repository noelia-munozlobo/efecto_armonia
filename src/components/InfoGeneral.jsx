import React from 'react';
import '../styles/InfoGeneral.css';
import Pilar from '../assets/Pilar.png'; 

const InfoGeneral = () => (
  <section className="info-general">
    <div className="perfil-pilar">
      <img src={Pilar} alt="Pilar Lobo - Psicóloga" />
      <div className="texto-pilar">
        <h2>¿Quién soy?</h2>
        <p>
          Soy Pilar Lobo, psicóloga con 20 años de experiencia acompañando a personas y comunidades en sus procesos
          de transformación. Mi pasión es crear un espacio cálido y cercano donde cada consultante se sienta seguro
          de aprender a regular sus emociones, descubrir fortalezas y cultivar una vida con sentido. A través de la
          psicología cognitivo-conductual, la programación neurolingüística y el mindfulness, brindo herramientas
          prácticas y sencillas que se adaptan al día a día, para que cada persona pueda sentirse más en calma,
          más auténtica y más conectada consigo misma.
        </p>
      </div>
    </div>
    <h2>¿Qué es Efecto Armonía?</h2>
    <p>
      Efecto Armonía es una plataforma en línea dedicada a ofrecer mentorías, cursos y charlas de índole psicológica,
      pensada para acompañar a las personas en su camino hacia el bienestar emocional y el crecimiento personal.
      Nuestro objetivo es brindar un espacio accesible, seguro y confiable donde los usuarios puedan aprender,
      compartir y encontrar recursos prácticos para fortalecer su equilibrio emocional y mejorar su calidad de vida.
    </p>
  </section>
);

export default InfoGeneral;
