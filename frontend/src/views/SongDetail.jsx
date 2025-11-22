import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SongDetail() {
const { id } = useParams(); // obtiene el id de la URL
const [songDetail, setSongDetail] = useState(null);

useEffect(() => {
    // simulación de fetch, luego conectaremos con la API
    const fakeSong = {
    id,
    title: "Canción de prueba",
    artist: "Artista desconocido",
    genre: "Pop",
    };
    setSongDetail(fakeSong);
}, [id]);

if (!songDetail) return <p>Cargando detalles...</p>;

return (
    <div style={{ padding: "20px" }}>
    <h2>{songDetail.title}</h2>
    <p><strong>Artista:</strong> {songDetail.artist}</p>
    <p><strong>Género:</strong> {songDetail.genre}</p>
    </div>
);
}