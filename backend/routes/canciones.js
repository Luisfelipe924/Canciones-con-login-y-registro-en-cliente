import express from 'express';
import mongoose from 'mongoose';
import { generarCancion } from '../utils/generadores.js';
import auth from "../middleware/auth.js";


const routerCanciones = express.Router();

const cancionSchema = new mongoose.Schema({
title: { type: String, required: [true, "El título es obligatorio"] },
artist: { type: String, required: [true, "El artista es obligatorio"] },
genre: { type: String, required: [true, "El género es obligatorio"] },
album: { type: String },
});

const Cancion = mongoose.model('Cancion', cancionSchema);

routerCanciones.get('/', auth, async (req, res) => {
try {
    const canciones = await Cancion.find();
    res.json(canciones);
} catch (error) {
    res.status(500).json({ message: "Error al obtener canciones", error });
}
});

routerCanciones.post('/', auth, async (req, res) => {
try {
    const nuevacancion = new Cancion(req.body);
    await nuevacancion.save();
    res.status(201).json(nuevacancion);
} catch (error) {
    res.status(400).json({ message: "Error al crear cancion", error });
}
});


routerCanciones.put('/:id', auth, async (req, res) => {
try {
    const {id} = req.params;

    const cancionActualizada = await Cancion.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!cancionActualizada) {
        return res,status(404).json({ message: "Cancion no encontrada" });
    }

    res.json(201)(cancionActualizada);
} catch (error) {
    res.status(400).json({ message: "Error al actualizar cancion", error });
}
});


routerCanciones.delete('/:id', auth, async (req, res) => {
try {
    const {id} = req.params;

    const cancionEliminada = await Cancion.findByIdAndDelete(id);

    if (!cancionEliminada) {
        return res,status(404).json({ message: "Cancion no encontrada" });
    }

    res.json({ message: "Cancion Eliminada", cancion: "cancionEliminada"});
} catch (error) {
    res.status(500).json({ message: "Error eliminar cancion", error });
}
});

routerCanciones.get('/fake', (req, res) => {
    const cancion = generarCancion();
    res.json(cancion);
});

export default routerCanciones;




