import { Navigate } from "react-router-dom";

import LoginForm from "../loginForm/LoginForm";

const LoginPage = ({user}) => {
    if(user){
        return <Navigate to="/" replace />;
    }
    return(
        <LoginForm/>
    );
}

export default LoginPage;