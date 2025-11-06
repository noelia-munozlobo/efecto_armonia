import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import '../styles/AdminSuscritos.css';

const ListaSuscritos = () => {
  const [suscritos, setSuscritos] = useState([]);

  // se obtienen las suscripciones 
  useEffect(() => {
    const fetchSuscritos = async () => {
      const data = await getData('suscripciones');
      setSuscritos(data || []);
    };
    fetchSuscritos();
  }, []);

  return (
<div>
  
</div>
  );
};

export default ListaSuscritos;
