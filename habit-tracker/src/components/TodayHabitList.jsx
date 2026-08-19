import dayjs from 'dayjs';

export function TodayHabitList({ habits, setHabits }) {
    const todayDay = dayjs().format('ddd');
    const todayHabits = habits.filter((habit) => habit.expectedDays.includes(todayDay));
    const todayFull = dayjs().format('YYYY-MM-DD')

    function toggleComplete(habitId) {

        const updatedHabits = habits.map((h) => {
            if (h.id !== habitId) {
                return h;
            }

            const isAlreadyCompleted = h.completedDates.includes(todayFull);

            let newCompletedDates;
            if (isAlreadyCompleted) {
                newCompletedDates = h.completedDates.filter((date) => date !== todayFull);
            } else {
                newCompletedDates = [...h.completedDates, todayFull];
            }

            return { ...h, completedDates: newCompletedDates };
        });

        setHabits(updatedHabits);
    }
    return (
        <>
            <div className="habits-container">
                {todayHabits.map((habit) => {
                    return (
                        <div
                            key={habit.id}
                            className="individual-habit-container"
                        >
                            {habit.name}
                            <input
                                type="checkbox"
                                checked={habit.completedDates.includes(todayFull)}
                                onChange={() => toggleComplete(habit.id)}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}