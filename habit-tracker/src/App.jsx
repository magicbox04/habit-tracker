import { useState } from 'react'
import { WeekProgress } from './components/WeekProgress'
import { AddHabitButton } from './components/AddHabitButton'
import  { TodayHabitList } from './components/TodayHabitList'
import './App.css'

export function App() {
    const [habits, setHabits] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedHabitId, setSelectedHabitId] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    return (
        <div>
            <WeekProgress habits={habits} isCalendarOpen={isCalendarOpen} setIsCalendarOpen={setIsCalendarOpen} />
            <AddHabitButton habits={habits} setHabits={setHabits} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
            <TodayHabitList habits={habits} setHabits={setHabits} selectedHabitId={selectedHabitId} setSelectedHabitId={setSelectedHabitId} />
            <pre>{JSON.stringify(habits, null, 2)}</pre>
        </div>
    );
}