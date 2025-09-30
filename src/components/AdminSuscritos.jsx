import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import '../styles/AdminSuscritos.css';

const ListaSuscritos = () => {
  const [suscritos, setSuscritos] = useState([]);

  useEffect(() => {
    const fetchSuscritos = async () => {
      const data = await getData('suscripciones');
      setSuscritos(data || []);
    };
    fetchSuscritos();
  }, []);

  return (
    <div className="lista-suscritos-admin">
      <h3>Suscritos</h3>
      {suscritos.length === 0 ? (
        <div className="sin-suscritos">No hay suscripciones registradas.</div>
      ) : (
        <ul>
          {suscritos.map(s => (
            <li key={s.id}>
              <span>Usuario: <b>{s.idUsuario}</b></span>
              <span>Curso: <b>{s.nombreCurso}</b></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaSuscritos;