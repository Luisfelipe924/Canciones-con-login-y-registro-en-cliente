import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_temporal";


export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellido, correo, contraseña } = req.body;
        if (!nombre || !apellido || !correo || !contraseña) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios"});
        }
        
        const existeUsuario = await User.findOne({ correo });
        if (existeUsuario) {
            return res.status(400).json({ mensaje: "El correo ya esta registrado"});
        }

        const hash = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await User.create({
            nombre,
            apellido,
            correo,
            contraseña: hash,
        });

        const token = jwt.sign(
            {id: nuevoUsuario._id, correo: nuevoUsuario.correo },
            JWT_SECRET,
            { expiresIn: "10m" }
        );

        res.status(201).json({ mensaje: "usuario registrado", token});
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
    }
};


    export const loginUsuario = async (req, res) => {
        try {
            const { correo, contraseña, } = req.body;
            if (!correo || !contraseña ) {
                return res.status(400).json({ mensaje: "Correo y contraseña son requeridos"});
            }

            const usuario = await User.findOne({ correo });
            if (!usuario) {
                return res.status(404).json({ mensaje: "Usuario no encontrado" });
            }

            const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
            if (!coincide) {
                return res.status(401).json({ mensaje: "contraseña incorrecta" });
            }

            const token =jwt.sign(
                { id: usuario._id, correo: usuario.correo },
                JWT_SECRET,
                { expiresIn: "10m" }   
            );

            res.status(200).json({ mensaje: "Login exitoso", token });
        } catch (error) {
            console.error("Error en el login:", error.message);
            res.status(500).json({ mensaje: "Error en el login", error: error.message });
        }
    };
