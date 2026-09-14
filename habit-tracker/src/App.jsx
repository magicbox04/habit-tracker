import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { ManagePage } from './pages/manage/ManagePage'
import './App.css'
import { LoginPage } from './pages/login/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SignUpPage } from './pages/login/SignUpPage'
export function App() {
    const [habits, setHabits] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    
    async function fetchHabits() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/habits', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    setHabits(data);
}

    useEffect(() => {
        fetchHabits();
    }, []);

    return (
        <Routes>
            <Route path="/login" element = {
                <LoginPage fetchHabits={fetchHabits}/>
            } />
            <Route path="/signup" element = {
                <SignUpPage/>
            } />
            <Route path="/" element=
                {
                    <ProtectedRoute>
                    <HomePage
                        habits={habits}
                        setHabits={setHabits}
                        isAddModalOpen={isAddModalOpen}
                        setIsAddModalOpen={setIsAddModalOpen}
                        isCalendarOpen={isCalendarOpen}
                        setIsCalendarOpen={setIsCalendarOpen}
                    />
                    </ProtectedRoute>
                } />
            <Route path="/manage" element={
                <ProtectedRoute>
                <ManagePage
                    habits={habits}
                    setHabits={setHabits} />
                </ProtectedRoute>
            } />
                
        </Routes>
    );
}