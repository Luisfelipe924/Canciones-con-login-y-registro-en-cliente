const BASE = "http://localhost:4000/api";


export const getSongs = async () => {
const res = await fetch(`${BASE}/canciones`);
if (!res.ok) throw new Error("Error al obtener canciones");
return res.json();
};

export const getSong = async (id) => {
const res = await fetch(`${BASE}/canciones/${id}`);
if (!res.ok) throw new Error("Error al obtener la canción");
return res.json();
};

export const createSong = async (songData) => {
const res = await fetch(`${BASE}/canciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(songData),
});
if (!res.ok) throw new Error("Error al crear canción");
return res.json();
};

export const getPlaylists = async () => {
const res = await fetch(`${BASE}/playlists`);
if (!res.ok) throw new Error("Error al obtener playlists");
return res.json();
};

export const createPlaylist = async (data) => {
const res = await fetch(`${BASE}/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
});
if (!res.ok) throw new Error("Error al crear playlist");
return res.json();
};

export const updatePlaylist = async (id, data) => {
const res = await fetch(`${BASE}/playlists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
});
if (!res.ok) throw new Error("Error al actualizar playlist");
return res.json();
};


export const updateSong = async (id, data) => {
    const res = await fetch(`${BASE}/canciones/${id}`, {
        method: "PUT",
        headers: { "content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar la cancion");
    return res.json();
};


