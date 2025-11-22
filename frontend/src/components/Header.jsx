import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const { token, logout } = useContext(AuthContext);
return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        🎧 My Music Library
        </Link>

        <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">

            {!token && (
            <> 

            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/playlists">Registro</Link>
            </li>
            </>
            )}

            {token && (
            <>

            <li className="nav-item">
                <Link className="nav-link" to="/library">Songs</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/playlists">Add Playlist</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/add-song">Add Song</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/playlists/new">Add Playlist</Link>
            </li>
            <li className="nav-item">
                <button 
                    className="btn btn-danger ms-3"
                    onClick={logout}
                >
                    Logout
            </button>
            </li>
            </>
            )}

        </ul>
        </div>
    </div>
    </nav>
);
};

export default Header;