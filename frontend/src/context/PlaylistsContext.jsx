import React, { createContext, useState, useEffect, useContext } from "react";
import { getPlaylists } from "../api/api";
import { AuthContext } from "./AuthContext";

export const PlaylistsContext = createContext();

export const PlaylistsProvider = ({ children }) => {
const [playlists, setPlaylists] = useState([]);
const { token } = useContext(AuthContext); 


useEffect(() => {
    if (!token) {
    setPlaylists([]);  
    return;
    }

    (async () => {
    try {
        const data = await getPlaylists();
        console.log(" Playlists cargadas:", data);
        setPlaylists(data);
    } catch (err) {
        console.error(" Error cargando playlists:", err);
    }
    })();
}, [token]);


const addPlaylistToState = (pl) => setPlaylists((p) => [...p, pl]);

const updatePlaylistInState = (updated) =>
    setPlaylists((p) =>
    p.map((pl) => (pl._id === updated._id ? updated : pl))
    );

return (
    <PlaylistsContext.Provider
    value={{ playlists, addPlaylistToState, updatePlaylistInState }}
    >
    {children}
    </PlaylistsContext.Provider>
);
};