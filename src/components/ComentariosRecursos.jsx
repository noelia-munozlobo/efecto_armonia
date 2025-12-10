
import React, { useEffect, useState } from 'react';
import { getData, } from "../services/fetch";
import '../styles/ComentariosRecursos.css';

function ComentariosRecursos() {
  // Estado para el texto del comentario
  const [descripcion, setDescripcion] = useState('');
  // Estado para mostrar errores de validación
  const [error, setError] = useState('');
  // Estado para almacenar lista de comentarios
  const [comentarios, setComentarios] = useState([]);
  // Obtener usuario autenticado desde localStorage
  const usuario = JSON.parse(localStorage.getItem("authUser"));

  // Función para cargar comentarios desde la API
  const cargarComentarios = async () => {
    try {
      
      const data = await getData('comentarios');
      // Guardar comentarios en el estado
      setComentarios(data || []);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  // Al montar el componente, cargar comentarios
  useEffect(() => {
    cargarComentarios();
  }, []);

  // Función para enviar un nuevo comentario
  const enviarComentario = async () => {
    // Validación: no permitir comentarios vacíos
    if (!descripcion.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }
    try {
      // Crear objeto con datos del comentario
      const nuevoComentario = {
        descripcion,
        autor: usuario?.email || "Anónimo" // Si no hay usuario, se marca como "Anónimo"
      };
      // Enviar comentario a la API
      await Services.postDatos('comentarios', nuevoComentario);
      // Limpiar formulario y errores
      setDescripcion('');
      setError('');
      // Recargar lista de comentarios inmediatamente
      cargarComentarios();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="comentarios-recursos">
      <h2 className="comentarios-titulo">Comparte tu reflexión o experiencia</h2>

      {/* Formulario para escribir comentario */}
      <div className="comentario-formulario">
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className={`form-input form-textarea ${error ? 'is-invalid' : ''}`}
          placeholder="Escribe tu comentario sobre la charla"
        />
        {/* Mostrar error si existe */}
        {error && <p className="error">{error}</p>}
        
        {/* Mensaje según si el usuario está autenticado */}
        <p className={`${usuario ? "inactivo" : "activo"}`}>
          Inicia sesión para agregar un comentario
        </p>
        
        {/* Botón para enviar comentario */}
        <button
          className={`btn-submit ${usuario ? "activo" : "inactivo"}`}
          onClick={enviarComentario}
        >
          Enviar
        </button>
      </div>

      {/* Lista de comentarios */}
      <div className="comentarios-ver">
        <h3>Comentarios de la comunidad</h3>
        {comentarios.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          <ul className="comentarios-lista">
            {comentarios.map((comentario, index) => (
              <li key={index} className="comentario-item">
                <p><strong>Autor:</strong> {comentario.autor}</p>
                <p>{comentario.descripcion}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ComentariosRecursos;
