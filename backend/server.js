import express from 'express';
import cors from 'cors'; 
import mongoose from "mongoose";
import dotenv from "dotenv"; 


import routerAuth from "./routes/auth.js";
import routerCanciones from './routes/canciones.js';
import routerPlaylists from './routes/playlists.js';
import routerUsuarios from './routes/userRoutes.js';

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI ? "Detectada" : "No detectada");


const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;


app.use(cors({
origin: "http://localhost:5173", 
methods: ["GET", "POST", "PUT", "DELETE"],
allowedHeaders: ["Content-Type", "token_usuario"],
}));

app.use(express.json());

app.use("/api/auth", routerAuth);
app.use('/api/canciones', routerCanciones);
app.use('/api/playlists', routerPlaylists);
app.use('/api/usuarios', routerUsuarios);

mongoose.connect(MONGO_URI)
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((err) => console.error("Error al conectar con MongoDB Atlas:", err));

app.listen(PORT, () => {
console.log(`Servidor escuchando en http://localhost:${PORT}`);
});