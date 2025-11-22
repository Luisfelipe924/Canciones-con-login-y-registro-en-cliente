import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSong } from "../api/api";

const EditSong = () => {
const { id } = useParams();
const navigate = useNavigate();

const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "",
    album: "",
});

const [error, setError] = useState("");
const [loading, setLoading] = useState(true);

useEffect(() => {
    (async () => {
    try {
        const data = await getSong(id);
        setForm(data);
    } catch (err) {
        console.error(err);
        setError("No se pudo cargar la canción.");
    } finally {
        setLoading(false);
    }
    })();
}, [id]);

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
    const res = await fetch(`http://localhost:4000/api/canciones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });

    if (!res.ok) {
        const data = await res.json();
        if (data.error?.errors) {
        const mensajes = Object.values(data.error.errors)
            .map((err) => err.message)
            .join(", ");
        setError(mensajes);
        } else {
        setError(data.message || "Error al actualizar la canción");
        }
        return;
    }

    navigate("/library");
    } catch (err) {
    console.error(err);
    setError("Error al conectar con el servidor");
    }
};

if (loading) return <p>Cargando canción...</p>;

return (
    <div className="container mt-5">
    <h2>🎵 Editar Canción</h2>

    {error && <div className="alert alert-danger">{error}</div>}

    <form onSubmit={handleSubmit}>
        {["title", "artist", "genre", "album"].map((field) => (
        <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
            type="text"
            className="form-control"
            name={field}
            value={form[field]}
            onChange={handleChange}
            required={["title", "artist", "genre"].includes(field)}
            />
        </div>
        ))}

        <button type="submit" className="btn btn-success w-100">
        Guardar Cambios
        </button>

        <button
        type="button"
        className="btn btn-secondary w-100 mt-2"
        onClick={() => navigate("/library")}
        >
        Cancelar
        </button>
    </form>
    </div>
);
};

export default EditSong;