import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
    const [form, setForm] = useState({ correo: "", password: ""});
    const [error, setError] = useState("");

    const { login: authLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/auth/login", form);
            authLogin(data.token);
            navigate("/canciones");
        } catch (err) {
            setError(err.response?.data?.msg || "Error en login" );
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="text-light">Login</h2>

            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit}>
                    <input 
                    className="form-control my-2" 
                    placeholder="correo"
                    value={form.correo}
                    onChange={e => setForm({ ...form, correo: e.target.value })}
                    />

                    <input 
                    className="form-control my-2" 
                    placeholder="Contraseña"
                    type="password"
                    value={form.password}
                    onChange={e=> setForm({ ...form, password: e.target.value})}
                    />

                    <button className="btn btn-primary w-100">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
