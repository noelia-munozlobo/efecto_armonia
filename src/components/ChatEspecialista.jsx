import React, { useState, useEffect, useRef } from "react";
import { getData, postData } from "../services/fetch";
import "../styles/ChatEspecialista.css";

function ChatEspecialista() {

    // obtener datos del especialista desde localstorage
    const usuarioData = JSON.parse(localStorage.getItem("usuario"));
    const especialistaId = usuarioData?.id;

    // estados principales del chat
    const [conversaciones, setConversaciones] = useState([]); 
    const [conversacionSeleccionada, setConversacionSeleccionada] = useState(null); 
    const [mensajes, setMensajes] = useState([]); 
    const [nuevoMensaje, setNuevoMensaje] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    // eliminar toda una conversación
    const limpiarConversacion = async () => {
        if (!conversacionSeleccionada) return;

        try {
            await fetch(
                `http://127.0.0.1:8000/chat/chat/borrar-conversacion/${conversacionSeleccionada.pacienteId}/${especialistaId}/`,
                { method: "DELETE", headers: { "Content-Type": "application/json" } }
            );

            // actualizar interfaz al borrar la conversación
            setNuevoMensaje("");
            setMensajes([]);
            setConversaciones(prev =>
                prev.filter(conv => conv.pacienteId !== conversacionSeleccionada.pacienteId)
            );
            setConversacionSeleccionada(null);
        } catch {
            setError("no se pudo borrar la conversación");
        }
    };

    // obtener info del paciente para mostrar nombre en el panel izquierdo
    const obtenerInfoPaciente = async (pacienteId) => {
        try {
            const paciente = await getData(`usuarios/usuario/${pacienteId}`);
            return {
                id: pacienteId,
                nombre: `${paciente.first_name} ${paciente.last_name}`,
                username: paciente.username,
            };
        } catch {
            return {
                id: pacienteId,
                nombre: `paciente ${pacienteId}`,
                username: `user_${pacienteId}`,
            };
        }
    };

    // cargar conversaciones recibidas al abrir la vista
    useEffect(() => {
        if (!especialistaId) return;

        const cargarConversaciones = async () => {
            try {
                const mensajesRecibidos = await getData(`chat/chat/recibidos/${especialistaId}`);
                const conversacionesMap = new Map();

                // agrupar mensajes por paciente y obtener el más reciente
                mensajesRecibidos.forEach(msg => {
                    const id = msg.remitente;

                    if (!conversacionesMap.has(id)) {
                        conversacionesMap.set(id, {
                            pacienteId: id,
                            ultimoMensaje: msg.contenido,
                            fechaUltimoMensaje: msg.fecha_envio,
                        });
                    }

                    const conv = conversacionesMap.get(id);
                    if (new Date(msg.fecha_envio) > new Date(conv.fechaUltimoMensaje)) {
                        conv.ultimoMensaje = msg.contenido;
                        conv.fechaUltimoMensaje = msg.fecha_envio;
                    }
                });

                // ordenar por fecha y agregar nombre del paciente
                const listaOrdenada = Array.from(conversacionesMap.values())
                    .sort((a, b) => new Date(b.fechaUltimoMensaje) - new Date(a.fechaUltimoMensaje));

                const listaConNombres = await Promise.all(
                    listaOrdenada.map(async conv => ({
                        ...conv,
                        ...(await obtenerInfoPaciente(conv.pacienteId))
                    }))
                );

                setConversaciones(listaConNombres);
            } catch {
                setError("no se pudieron cargar las conversaciones");
            }
        };

        cargarConversaciones();
    }, [especialistaId]);

    // cargar mensajes del paciente seleccionado
    useEffect(() => {
        if (!conversacionSeleccionada) return;

        const cargarConversacion = async () => {
            try {
                const datos = await getData(
                    `chat/chat/conversacion/${especialistaId}/${conversacionSeleccionada.pacienteId}`
                );
                setMensajes(Array.isArray(datos) ? datos : []);
            } catch {
                setMensajes([]);
                setError("error al cargar los mensajes");
            }
        };

        cargarConversacion();
    }, [conversacionSeleccionada, especialistaId]);

    // enviar mensaje al paciente
    const enviarMensaje = async () => {
        if (!nuevoMensaje.trim() || !conversacionSeleccionada) return;

        const payload = {
            remitente: especialistaId,
            destinatario: conversacionSeleccionada.pacienteId,
            contenido: nuevoMensaje,
        };

        setLoading(true);
        setError(null);

        try {
            const data = await postData("chat/chat/", payload);

            // agregar mensaje al chat sin recargar la conversación
            if (data?.id) {
                setMensajes(prev => [...prev, data]);
                setNuevoMensaje("");
            }
        } catch {
            setError("error al enviar el mensaje");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            enviarMensaje();
        }
    };
}