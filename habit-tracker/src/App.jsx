import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { ManagePage } from './pages/manage/ManagePage'
import './App.css'

export function App() {
    const [habits, setHabits] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);


    return (
        <Routes>
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