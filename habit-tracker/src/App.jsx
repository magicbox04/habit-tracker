import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { ManagePage } from './pages/manage/ManagePage'
import './App.css'
import { LoginPage } from './pages/login/LoginPage'

export function App() {
    const [habits, setHabits] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    useEffect(() => {
        async function fetchHabits(){
            const token = localStorage.getItem('token');
            const response = await fetch('/api/habits', {
                headers: {
                'Authorization': `Bearer ${token}`
            }});
            const data = await response.json();
            setHabits(data);
        }
        fetchHabits();
    }, []);

    return (
        <Routes>
            <Route path="/login" element = {
                <LoginPage/>
            } />
            <Route path="/" element=
                {
                    <HomePage
                        habits={habits}
                        setHabits={setHabits}
                        isAddModalOpen={isAddModalOpen}
                        setIsAddModalOpen={setIsAddModalOpen}
                        isCalendarOpen={isCalendarOpen}
                        setIsCalendarOpen={setIsCalendarOpen}
                    />
                } />
            <Route path="/manage" element={<ManagePage
                habits={habits}
                setHabits={setHabits} />} />
        </Routes>
    );
}