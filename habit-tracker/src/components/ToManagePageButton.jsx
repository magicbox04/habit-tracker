import { Link } from 'react-router-dom'
export function ToManagePageButton(){
    return (
        <Link to="/manage" className="to-manage-page-button">
            Manage Habits
        </Link>

    );
}