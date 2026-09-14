import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    
    async function handleSignup() {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {  
            navigate('/login'); 
        } else {
            setErrorMessage(data.console.error);
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
                handleSignup();
            }}>
            Sign up
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <Link to="/login">Already have an account? Login</Link>
        </div>
    </>
    )
}


