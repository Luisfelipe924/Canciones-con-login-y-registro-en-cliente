import express from 'express';
import mongoose from 'mongoose';
import { generarPlaylist } from '../utils/generadores.js';
import auth from "../middleware/auth.js";



const routerPlaylists = express.Router();


const cancionSchema = new mongoose.Schema({
title: { type: String, required: [true, "El título es obligatorio"] },
artist: { type: String, required: [true, "El artista es obligatorio"] },
genre: { type: String, required: [true, "El género es obligatorio"] },
});


const playlistSchema = new mongoose.Schema({
name: { type: String, required: [true, "El nombre de la playlist es obligatorio"] },
description: { type: String },
songs: [cancionSchema],
});

const Playlist = mongoose.model("Playlist", playlistSchema);


routerPlaylists.get('/', auth, async (req, res) => {
try {
    const playlists = await Playlist.find();
    res.json(playlists);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener playlists", error });
}
});


routerPlaylists.post('/', auth, async (req, res) => {
try {
    const nuevaPlaylist = new Playlist(req.body);
    await nuevaPlaylist.save();
    res.status(201).json(nuevaPlaylist);
} catch (error) {
    res.status(400).json({ message: "Error al crear playlist", error });
}
});


routerPlaylists.put('/:id', auth, async (req, res) => {
try {
    const { id } = req.params;
    const playlistActualizada = await Playlist.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true, 
    });

    if (!playlistActualizada) {
    return res.status(404).json({ message: "Playlist no encontrada" });
    }

    res.json(playlistActualizada);
} catch (error) {
    res.status(400).json({ message: "Error al actualizar playlist", error });
}
});


routerPlaylists.get('/fake', (req, res) => {
const playlist = generarPlaylist();
res.json(playlist);
});


export default routerPlaylists;

