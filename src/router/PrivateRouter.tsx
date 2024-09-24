import { Navigate } from "react-router-dom";

const checkUserAuthenticated = ( ) => {
    const token = localStorage.getItem('token');
    return !!token
}

export const PrivateRouter:React.FC<any> = ({children }) => {
    const isAuthenthicated = checkUserAuthenticated();
    return isAuthenthicated ? children : <Navigate to={'/'}/>
}


