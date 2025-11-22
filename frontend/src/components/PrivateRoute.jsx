import { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const PrivateRoute = ({ Children}) => {
    const { token } = useContext(AuthContext);
    
    return token ? Children : <Navigate to="/login" replace />;
};

export default PrivateRoute;