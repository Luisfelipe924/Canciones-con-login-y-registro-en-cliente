import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Correo inválido"],
    },
    contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"], 
    minlength: [8, "debe tener al menos 8 caracteres"],
    },
});

export default mongoose.model("User", userSchema);
