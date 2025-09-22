import React from 'react';
import '../styles/Contacto.css';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h2>Contacto</h2>
      <p>¿Querés comunicarte con nosotros? ¡Estamos para acompañarte!</p>

      <div className="info-contacto">
        <p><strong>📞 Teléfono:</strong> <a href="tel:+50688407373">+506 8840-7373</a></p>
        <p><strong>📸 Instagram:</strong> <a href="https://www.instagram.com/efectoarmonia" target="_blank" rel="noopener noreferrer">@efectoarmonia</a></p>
        <p><strong>📘 Facebook:</strong> <a href="https://www.facebook.com/EfectoArmonia" target="_blank" rel="noopener noreferrer">Efecto Armonia</a></p>
      </div>

      <p className="mensaje-final">Gracias por formar parte de esta comunidad de bienestar emocional 💚</p>
    </div>
  );
};

export default Contacto;
