import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { ToSignUpPageButton } from "./ToSignUpPageButton";
export function LoginPage({fetchHabits}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    
    async function handleLogin() {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        if (response.ok) {  
            localStorage.setItem('token', data.token);
            await fetchHabits();
            navigate('/'); 
        } else {
            setErrorMessage(data.error);
        }
    }
    return (<>
        <div className="login-container">
            <input type="text" placeholder = "Email" className="user-login-input" onChange={(e) => {
                setEmail(e.target.value);
            }}/>
           
            <input type="password" placeholder = "Password" className="user-login-input" onChange={(e) => {
                setPassword(e.target.value);
            }}/>
         
            <button type="button" className="user-login-buttton" onClick={()=> {
                handleLogin();
            }}>
            Login
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <ToSignUpPageButton/>
            
        </div>
    </>
    )
}


