import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getSongs } from "../api/api";
import { PlaylistsContext } from "../context/PlaylistsContext";

const library = () => {
    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState("");
    const { playlists } = useContext(PlaylistsContext);

    useEffect(() => {
        (async () => {
            try {
                const data = await getSongs();
                setSongs(data);
            } catch (err) {
                console.error(err);
            }
        }) ();
    }, []);

    console.log("Songs data:", songs);

    const filtered = Array.isArray(songs)
    ? songs.filter((s) =>
        `${s.title} ${s.artist} ${s.genre}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    : [];

const addToplaylist = async (songId, playlistId) => {
    const res = await fetch(`/api/playlists/${playlistId}/add`, {
        method: "POST",
        headers: { "content-Type": "application/json"},
        body: JSON.stringify({ songId })
    });
    if (!res.ok) return alert("Error agregando a la playlist");
    alert("Agregado a la playlist");
};

return (
    <div className="container mt-5">
    <h1 className="text-center mb-4 fw-bold">All Songs</h1>
    <input
        className="form-control mb-4"
        placeholder="Search songs by name, artist, or genre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
    />

    <div className="list-group">
        {filtered.map((song) => (
        <div key={song._id} className="list-group-item mb-3 shadow-sm rounded">
            <div className="d-flex justify-content-between align-items-center">
            <div>
                <Link
                to={`/song/${song._id}`}
                className="fw-bold text-decoration-none text-primary"
                >
                {song.title}
                </Link>{" "}
                by {song.artist} <em>({song.genre})</em>

                <Link to={`/song/${song._id}/edit`} className="btn btn-warning btn-sm mt-2">
                Editar
                </Link>
            </div>
            <div className="d-flex align-items-center gap-2">
                <label className="form-label mb-0 me-2">Add to playlist:</label>
                <select
                className="form-select"
                onChange={(e) => addToPlaylist(song._id, e.target.value)}
                >
                <option value="">Select...</option>
                {playlists.map((pl) => (
                    <option key={pl._id} value={pl._id}>
                    {pl.name}
                    </option>
                ))}
                </select>
            </div>
            </div>
        </div>
        ))}
    </div>
    </div>
);
};



export default library;