import { useState } from "react";
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function AddHabitModal({ setIsAddModalOpen, habits, setHabits }) {
    const [name, setName] = useState('');
    const [expectedDays, setExpectedDays] = useState([]);
    
    function toggleDay(day) {
        if (expectedDays.includes(day)) {
            setExpectedDays(prev => prev.filter(d => d !== day))
        }
        else {
            setExpectedDays(prev => [...prev, day]);
        }
    }

    async function handleSave() {
        const response = await fetch ('/api/habits', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                expectedDays: expectedDays
            })
        })
        
        const newHabit = await response.json();
        setHabits([...habits, newHabit]);
        setIsAddModalOpen(false);
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <input 
                    type="text" 
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    placeholder="Input Habit info" 
                    
                    />
                    {DAYS.map((day) =>  (
                        <button
                            key={day}
                            type="button"
                            className={expectedDays.includes(day) ? "expected-day-button-pressed" : "expected-day-button"}
                            onClick={() => toggleDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                    <button className="new-habit-save-button" onClick={handleSave}>
                        Save
                    </button>
                    <button className="new-habit-cancel-button" onClick={() => { setIsAddModalOpen(false) }}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}