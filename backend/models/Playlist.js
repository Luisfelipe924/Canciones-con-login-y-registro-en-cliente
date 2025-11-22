import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, " El nombre de la playlist es obligatorio"],
    },
    descripcion: {
        type: String,
    },
    canciones: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cancion", 
        },
    ],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true });

const playlist = mongoose.model("Playlist", playlistSchema);

export default playlist;