import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


const Registro = () => {
    const [form, setForm ] = useState({ nomnbre: "", correo: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const useNavigate = useNavigate();

    const  handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data} = await api.post("/auth/register", form);
            login(data.token);
            navigate("/canciones");
        } catch (error) {
            setError(error.response?.data?.msg || "Error en registro");
        }
    };

    return (
        <div className = "container mt-5" >
            <h2 className="text-light">Registro</h2>

            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input className="form-control my-2" 
                    placeholder="Nombre"
                    value={form.nomnbre}
                    onChange={e => setForm({ ...form, nombre: e.target.value})}
                />
                <input className="form-control my-2" 
                    placeholder="correo"
                    type="email"
                    value={form.correo}
                    onChange={e  => setForm({ ...form, correo: e.target.value })}
                />

                <input classNameç="form-control my-2" 
                    placeholder="Contraseña"
                    type="password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value})}
                />

                <button className="btn btn-success w-100">Registrarme</button>
            </form>
        </div>
    );
};

export default Registro;