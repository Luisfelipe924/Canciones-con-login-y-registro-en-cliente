import React, { useState, useContext } from "react";
import { PlaylistsContext } from "../context/PlaylistsContext";
import { createPlaylist } from "../api/api";
import { useNavigate } from "react-router-dom";

const PlaylistEditor = () => {
const [name, setName] = useState("");
const { playlists, songs } = useContext(PlaylistsContext);
const [selectedSongs, setSelectedSongs] = useState([]);
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    await createPlaylist({ name, songs: selectedSongs });
    navigate("/playlists");
};

const toggleSong = (id) => {
    setSelectedSongs((prev) =>
    prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
};

return (
    <div className="container text-white mt-5">
    <h2 className="mb-4">🎧 Crear Nueva Playlist</h2>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label className="form-label">Nombre de la playlist</label>
        <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Rock Clásico"
        />
        </div>

        <h5>Seleccionar canciones:</h5>
        <div className="list-group">
        {songs && songs.length > 0 ? (
            songs.map((song) => (
            <label key={song._id} className="list-group-item bg-dark text-light">
                <input
                type="checkbox"
                value={song._id}
                onChange={() => toggleSong(song._id)}
                />{" "}
                {song.title} - {song.artist}
            </label>
            ))
        ) : (
            <p>No hay canciones disponibles</p>
        )}
        </div>

        <button type="submit" className="btn btn-success mt-4 w-100">
        Crear Playlist
        </button>
    </form>
    </div>
);
};

export default PlaylistEditor;
