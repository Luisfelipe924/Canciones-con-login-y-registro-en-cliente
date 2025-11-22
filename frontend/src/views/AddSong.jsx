import React, { useState } from "react";
import { createSong } from "../api/api"; 
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const AddSong = () => {
const [form, setForm] = useState({ title: "", artist: "", genre: "", album: "" });
const navigate = useNavigate();

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await createSong(form);
    navigate("/library");
    } catch (err) {
    console.error(err);
    alert("Error al agregar canción");
    }
};

return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
    <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px", backgroundColor: "#121212", border: "1px solid #2b2b2b" }}>
        <h2 className="text-center mb-4 text-success fw-bold">🎶 Add New Song</h2>
        <form onSubmit={handleSubmit}>
        {["title", "artist", "genre", "album"].map((field) => (
            <div className="mb-3" key={field}>
            <label className="form-label text-capitalize text-light">{field}</label>
            <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
            />
            </div>
        ))}
        <button type="submit" className="btn btn-success w-100 fw-bold">
            Add Song
        </button>
        </form>
    </div>
    </div>
);
};

export default AddSong;