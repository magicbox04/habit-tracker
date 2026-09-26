import { useState } from "react";
import { ToHomePageButton } from "../../components/ToHomePageButton";
export function ManagePage({ habits, setHabits }) {
    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const [editingHabitId, setEditingHabitId] = useState(null);
    const [sortByPriority, setSortByPriority] = useState(false);
    const [isAsc, setIsAsc] = useState(true);
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
        const token = localStorage.getItem('token');

        await fetch(`/api/habits/${habitId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                name: updatedHabit.name,
                expectedDays: updatedHabit.expectedDays,
                completedDates: updatedHabit.completedDates
            })
        })
        setHabits(updatedHabits);
    }

    async function togglePriority(priority, habitId) {
        const updatedHabits = habits.map((h) => {
            if (h.id !== habitId) {
                return h;
            }
            return { ...h, priority: priority };
        });

        const updatedHabit = updatedHabits.find((h) => h.id === habitId)
        const token = localStorage.getItem('token');

        await fetch(`/api/habits/${habitId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                name: updatedHabit.name,
                expectedDays: updatedHabit.expectedDays,
                completedDates: updatedHabit.completedDates,
                priority: priority
            })
        })
        setHabits(updatedHabits);
    }
    const token = localStorage.getItem('token');
    async function deleteHabit(habitId) {
        await fetch(`/api/habits/${habitId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },

        })

        const newHabitlist = habits.filter(item => item.id !== habitId);
        setHabits(newHabitlist);
    }



    const displayedHabits = sortByPriority
        ? [...habits].sort((a, b) => isAsc ? a.priority - b.priority : b.priority - a.priority)
        : habits;
    console.log('habits:', habits.map(h => ({ name: h.name, priority: h.priority })));
    return (
        <>
            <div className="all-habits-container">
                {displayedHabits.map((habit) => {
                    return (
                        <div
                            key={habit.id}
                            className={editingHabitId === habit.id ? "individual-habit-container-for-all-edit" : "individual-habit-container-for-all"}
                        >
                            {editingHabitId === habit.id ? (
                                <input value={habit.name} onChange={async (e) => {
                                    const newName = e.target.value;

                                    const updatedHabits = habits.map((h) => {
                                        if (h.id !== habit.id) {
                                            return h;
                                        }
                                        return { ...h, name: newName };
                                    });

                                    const updatedHabit = updatedHabits.find((h) => h.id === habit.id);


                                    await fetch(`/api/habits/${habit.id}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                                        body: JSON.stringify({
                                            name: updatedHabit.name,
                                            expectedDays: updatedHabit.expectedDays,
                                            completedDates: updatedHabit.completedDates
                                        })
                                    })
                                    setHabits(updatedHabits);
                                }
                                } />
                            ) : (
                                <span>{habit.name}</span>)}

                            {
                                editingHabitId === habit.id && DAYS.map((day) => (
                                    <button
                                        className={habit.expectedDays.includes(day) ? "expected-day-button-pressed-edit" : "expected-day-button-edit"}
                                        key={day}
                                        type="button"
                                        onClick={() => (toggleDay(day, habit.id))}
                                    >
                                        {day}
                                    </button>

                                ))
                            }
                            {
                                editingHabitId === habit.id &&
                                <div>
                                    <div>
                                        <input type="radio" id={`${habit.id}-priority-low`} name={`${habit.id}priority`} value="Low" onChange={() => togglePriority(1, habit.id)} checked={habit.priority === 1} />
                                        <label htmlFor={`${habit.id}-priority-low`}>Low Priority</label>
                                    </div>
                                    <div>
                                        <input type="radio" id={`${habit.id}-priority-medium`} name={`${habit.id}priority`} value="Medium" onChange={() => togglePriority(2, habit.id)} checked={habit.priority === 2} />
                                        <label htmlFor={`${habit.id}-priority-medium`}>Medium Priority</label>
                                    </div>
                                    <div>
                                        <input type="radio" id={`${habit.id}-priority-high`} name={`${habit.id}priority`} value="High" onChange={() => togglePriority(3, habit.id)} checked={habit.priority === 3} />
                                        <label htmlFor={`${habit.id}-priority-high`}>High Priority</label>
                                    </div>
                                </div>
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
            <button onClick={() => {
                if (!sortByPriority) {
                    setSortByPriority(true);
                } else {
                    setIsAsc(!isAsc);
                }
            }}>
                {sortByPriority ? (isAsc ? "Priority ↑" : "Priority ↓") : "Sort by Priority"}
            </button>
            <ToHomePageButton />
        </>
    );
}
