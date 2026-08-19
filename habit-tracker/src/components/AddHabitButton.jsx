import { AddHabitModal } from "./AddHabitModal";
export function AddHabitButton ({isAddModalOpen, setIsAddModalOpen, habits, setHabits}) {

    return (
        <div>
            <button className = "add-habbit-button" onClick={() => setIsAddModalOpen(true)} >
                Add Habit
            </button>
            {
                isAddModalOpen===true &&(
                <AddHabitModal setIsAddModalOpen = {setIsAddModalOpen} habits={habits} setHabits={setHabits}/>
                )
            }
            

        </div>
    );
}