import React, { useEffect, useContext } from "react";
import { PlaylistsContext } from "../context/PlaylistsContext";
import { Link } from "react-router-dom";


const Playlists = () => {
const { playlists } = useContext(PlaylistsContext);

useEffect(() => {
    console.log("🎵 Playlists cargadas:", playlists);
}, [playlists]);

if (!Array.isArray(playlists) || playlists.length === 0) {
    return (
    <div className="text-center mt-5 text-light">
        <h2 className="fw-bold mb-4">No hay playlists creadas</h2>
        <Link to="/playlists/new" className="btn btn-success btn-lg shadow">
        Crear nueva playlist
        </Link>
    </div>
    );
}

return (
    <div className="container mt-5 text-light">
    <h2 className="fw-bold mb-4">🎧 Tus Playlists</h2>
    <div className="row">
        {playlists.map((pl) => (
        <div key={pl._id} className="col-md-4 mb-4">
            <div className="card bg-dark text-white shadow-lg border-0 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                <h5 className="card-title">{pl.name}</h5>
                <p className="card-text small text-secondary">
                    {pl.songs?.length || 0} canciones
                </p>
                </div>
                <Link
                to={`/playlists/${pl._id}/edit`}
                className="btn btn-outline-info mt-2 w-100"
                >
                Editar
                </Link>
            </div>
            </div>
        </div>
        ))}
    </div>
    </div>
);
};

export default Playlists;
