import { WeekProgress } from '../../components/WeekProgress'
import { AddHabitButton } from '../../components/AddHabitButton'
import  { TodayHabitList } from '../../components/TodayHabitList'
import  { ToManagePageButton } from '../../components/ToManagePageButton'
import { LogoutButton } from '../../components/LogoutButton'
import '../../App.css'

export function HomePage({habits, setHabits, isAddModalOpen, setIsAddModalOpen, isCalendarOpen, setIsCalendarOpen}) {

    return (
        <div>
            <LogoutButton/>
            <WeekProgress habits={habits} isCalendarOpen={isCalendarOpen} setIsCalendarOpen={setIsCalendarOpen} />
            <AddHabitButton habits={habits} setHabits={setHabits} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
            <TodayHabitList habits={habits} setHabits={setHabits} />
            <ToManagePageButton habits={habits} setHabits={setHabits}/>
            <pre>{JSON.stringify(habits, null, 2)}</pre>
        </div>
    );
}