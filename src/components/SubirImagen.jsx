import { useState } from "react";

const SubirImagen = ({ setImagen }) => {
  const [preview, setPreview] = useState(null);

  const manejarCambio = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Previsualización local
    setPreview(URL.createObjectURL(file));

    // Subir a Cloudinary
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "imagenes"); // OJO CAMBIAR
    data.append("cloud_name", "dgc8icxxw");       // OJO CAMBIAR

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgc8icxxw/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();

    // Guardar URL en estado del form principal
    setImagen(json.secure_url);
  };

  return (
    <div>
      <label>Imagen del recurso</label>
      <input type="file" accept="image/*" onChange={manejarCambio} />

      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          style={{ width: "150px", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default SubirImagen;
