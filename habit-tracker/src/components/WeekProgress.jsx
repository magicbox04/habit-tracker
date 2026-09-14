import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

export function WeekProgress({ habits}) {
    dayjs.extend(isoWeek);

    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monday = dayjs().startOf('isoWeek');
    console.log(habits);
    function getDayStatus(dayName, dateStr) {
        const habitsForDay = habits.filter(h => h.expectedDays.includes(dayName));
        const completedCount = habitsForDay.filter(h => h.completedDates.includes(dateStr)).length;

        if (habitsForDay.length === 0) {
            return "habit-no-habit-circle"; 
        }
        else if (completedCount === 0) {
            return "habit-empty-circle"
        }
        else if (habitsForDay.length === completedCount) {
            return "habit-completed-circle"
        }
        else if (habitsForDay.length > completedCount) {
            return "habit-partial-circle"
        }
        
    }

    return (
        <div>
            {
                DAYS.map((day, i)=>(
                    <button
                    key={day}
                    className={getDayStatus(day,  monday.add(i, 'day').format('YYYY-MM-DD') )}
                    >
                    
                    </button>
                ) 
                )
            }
        </div>
    );
}