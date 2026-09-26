import { useState } from "react";
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function AddHabitModal({ setIsAddModalOpen, habits, setHabits }) {
    const [name, setName] = useState('');
    const [expectedDays, setExpectedDays] = useState([]);
    const [priority, setPriority] = useState(2);

    function toggleDay(day) {
        if (expectedDays.includes(day)) {
            setExpectedDays(prev => prev.filter(d => d !== day))
        }
        else {
            setExpectedDays(prev => [...prev, day]);
        }
    }

    function togglePriority(priority) {
        setPriority(priority)
    }

    async function handleSave() {
        const token = localStorage.getItem('token');
        console.log('보내는 priority:', priority);  // ← 임시 추가
        const response = await fetch('/api/habits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                name: name,
                expectedDays: expectedDays,
                priority: priority
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
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder="Input Habit info"

                    />
                    {DAYS.map((day) => (
                        <button
                            key={day}
                            type="button"
                            className={expectedDays.includes(day) ? "expected-day-button-pressed" : "expected-day-button"}
                            onClick={() => toggleDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                    <div>
                        <input type="radio" id="priority-low" name="priority" value="Low" onChange={() => togglePriority(1)} checked={priority === 1} />
                        <label htmlFor="priority-low">Low Priority</label>
                    </div>
                    <div>
                        <input type="radio" id="priority-medium" name="priority" value="Medium" onChange={() => togglePriority(2)} checked={priority === 2} />
                        <label htmlFor="priority-medium">Medium Priority</label>
                    </div>
                    <div>
                        <input type="radio" id="priority-high" name="priority" value="High" onChange={() => togglePriority(3)} checked={priority === 3} />
                        <label htmlFor="priority-high">High Priority</label>
                    </div>

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