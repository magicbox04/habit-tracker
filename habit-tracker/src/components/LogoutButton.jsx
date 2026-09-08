import { useNavigate } from "react-router-dom";

export function LogoutButton(){
    const navigate = useNavigate();

    function handleLogout (){
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
}