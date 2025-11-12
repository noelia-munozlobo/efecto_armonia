import React from 'react';
import '../styles/Contacto.css';

function Contacto() {
  return (
//informacion de contacto
<div className="pagina-contacto">
  <div className="contacto-container">
    <h2>Contacto</h2>
    <p>¿Quieres comunicarte con nosotros? ¡Estamos para acompañarte!</p>

    <div className="info-contacto">
      <p>📞 Teléfono: <a href="tel:+50684047373">+506 8404-7373</a></p>
      <p>📷 Instagram: <a href="https://instagram.com/efectoarmonia" target="_blank">@efectoarmonia</a></p>
      <p>📘 Facebook: <a href="https://facebook.com/efectoarmonia" target="_blank">Efecto Armonía</a></p>
    </div>

    <p className="mensaje-final">Gracias por formar parte de esta comunidad de bienestar emocional 💚</p>
  </div>
</div>
  )
}
export default Contacto