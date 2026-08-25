import { useState } from "react";
import { ToHomePageButton } from "../../components/ToHomePageButton";
export function ManagePage({ habits, setHabits }) {
    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const [editingHabitId, setEditingHabitId] = useState(null);

    async function toggleDay(day, habitId) {

        

        const updatedHabits = habits.map((h) => {
            if (h.id !== habitId) {
                return h;
            }
            let newExpectedDays;
            if (h.expectedDays.includes(day)) {
                newExpectedDays = h.expectedDays.filter(d => d !== day);
            } else {
                newExpectedDays = [...h.expectedDays, day];
            }
            return { ...h, expectedDays: newExpectedDays };
        });

        const updatedHabit = updatedHabits.find((h) => h.id === habitId)

        await fetch (`/api/habits/${habitId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: updatedHabit.name,
                expectedDays: updatedHabit.newExpectedDays,
                completedDates: updatedHabit.completedDates
            })
        })
        setHabits(updatedHabits);
    }



    async function deleteHabit(habitId) {
        await fetch (`/api/habits/${habitId}`, {
            method: 'DELETE'
        })
        
        const newHabitlist = habits.filter(item => item.id !== habitId);
        setHabits(newHabitlist);
    }

    return (
        <>
            <div className="all-habits-container">
                {habits.map((habit) => {
                    return (
                        <div
                            key={habit.id}
                            className={editingHabitId === habit.id ? "individual-habit-container-for-all-edit" : "individual-habit-container-for-all"}
                        >
                            {editingHabitId === habit.id ? (
                                <input value={habit.name} onChange={(e) => {
                                    const updatedHabits = habits.map((h) => {
                                        if (h.id !== habit.id) {
                                            return h;
                                        }
                                        let newName = e.target.value;
                                        return { ...h, name: newName };
                                    });
                                    setHabits(updatedHabits);
                                }
                                } />
                            ) : (
                                <span>{habit.name}</span>)}

                            {
                                editingHabitId === habit.id && DAYS.map((day)=>(
                                    <button
                                        className = {habit.expectedDays.includes(day) ? "expected-day-button-pressed-edit" : "expected-day-button-edit"}
                                        key={day}
                                        type="button"
                                        onClick = {()=> (toggleDay(day, habit.id))}
                                        >
                                            {day}
                                    </button>

                                ))
                            }    

                            <button onClick={() => {
                                if (editingHabitId === habit.id) {
                                    setEditingHabitId(null);
                                } else {
                                    setEditingHabitId(habit.id);
                                }
                            }}>
                                {editingHabitId === habit.id ? "done" : "edit"}
                            </button>


                            <button
                                className="habit-delete-button"
                                type="button"
                                onClick={() => (deleteHabit(habit.id))}
                            >
                                delete
                            </button>
                        </div>
                    );
                })}
            </div>
            <ToHomePageButton/>
        </>
    );
}
