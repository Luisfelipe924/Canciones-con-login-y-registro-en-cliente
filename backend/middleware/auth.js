import jwt from "jsonwebtoken";

export default function auth (req, res, next) {
    const token = req.headers["token_usuario"];

    if (!token) return res.status(401).json({ msg: "Token requerido" });

    try {
        const decoded = jwt.verify(token, "CLAVE_SECRETA");
        req.useRID = decoded.indexOf;
        next();
    } catch {
        res.tstatus(401).json({ msg: "Token invalido o expirado"})
    }
}