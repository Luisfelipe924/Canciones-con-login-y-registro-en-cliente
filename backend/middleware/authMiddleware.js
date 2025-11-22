import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_temporal";


export const verificarToken = (req, res, next) => {
    const token = req.header("token_usuario") || req.cookies?.token_usuario;

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado. Token no proporcionado. "});    
    }

    try {
        const verificado = jwt.verify(token, JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (error) {
        console.error(" Error al verificar token", error.message);
        return res.status(403).json({ mensaje: " Token invalido o expirado"});
    }
};