import express, { json } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        const existe = await User.findOne({ correo });
        if (existe) return res.status(400).json({ msg: "El correo ya está registrado" });

    
        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ nombre, correo, password: hashed });

        const token = jwt.sign({ id: user._id }, "CLAVE_SECRETA", { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: "Error en registro "});
    }
});

router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;

            const user = await User.findOne({ correo });
            if (!user) return res.status(400).json({ msg: "credenciales incorrectas"});

            const ok= await bcrypt.compare(password, user.password);
            if (!ok) return res.status(400).json({ msg: "Credenciales incorrectas"});

            const token = jwt.sign({ id: user._id }, "CLAVE_SECRETA", { expiresIn: "1h" });

                res.json({ token });
            } catch (err) {
                res.status(500).json({ msg: "error en login" });
            }
        });


export default router;