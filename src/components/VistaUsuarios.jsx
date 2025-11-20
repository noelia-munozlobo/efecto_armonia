import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VistaUsuarios.css";

const VistaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const getUsuarios = async () => {
        try {
            const resp = await fetch("http://127.0.0.1:8000/usuarios/usuarios/");
            const data = await resp.json();
            setUsuarios(data);
            setCargando(false);
        } catch (error) {
            console.log("Error al obtener usuarios:", error);
            setCargando(false);
        }
    };

    const eliminarUsuario = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

        try {
            const resp = await fetch(`http://127.0.0.1:8000/usuarios/usuario/${id}/`, {
                method: "DELETE",
            });

            if (resp.status === 204) {
                setUsuarios(usuarios.filter((u) => u.id !== id));
            } else {
                alert("No se pudo eliminar este usuario.");
            }
        } catch (error) {
            console.log("Error al eliminar:", error);
        }
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    if (cargando) return <p className="cargando">Cargando usuarios...</p>;

    return (
        <div className="pagina-usuarios">
            <div className="usuarios-container">
                <h2>Lista de Usuarios</h2>

                <div className="grid-usuarios">
                    {usuarios.map((u) => (
                        <div key={u.id} className="card-usuario">
                            <h3>{u.first_name} {u.last_name1} {u.last_name2}</h3>

                            <p><strong>Usuario:</strong> {u.username}</p>
                            <p><strong>Nombre:</strong> {u.first_name}</p>
                            <p><strong>Apellidos: </strong>{u.last_name}</p>
                            <p><strong>Correo:</strong> {u.email}</p>
                            <p><strong>Rol:</strong> {u.rol}</p>
                            <p><strong>Teléfono:</strong> {u.telefono}</p>
                            <p><strong>ID:</strong> {u.id}</p>

                            <div className="acciones">
                                <button
                                    className="btn-editar"
                                    onClick={() => navigate(`/editar-usuario/${u.id}`)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn-eliminar"
                                    onClick={() => eliminarUsuario(u.id)}
                                >
                                    Eliminar
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VistaUsuarios;

