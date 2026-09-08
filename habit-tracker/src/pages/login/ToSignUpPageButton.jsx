import { Link } from 'react-router-dom'

export function ToSignUpPageButton() {
    return(
        <Link to="/signup" className="to-signup-page-button">
            SignUp
        </Link>
    );
}