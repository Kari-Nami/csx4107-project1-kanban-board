import { useState } from 'react';
import '../styles/pages/KanbanBoard.css'
import Navbar from "../components/Navbar.jsx";
import Task from "../components/task.jsx";
import {useTasks} from "../context/TaskContext.jsx";
import {useDroppable, useDragDropMonitor} from "@dnd-kit/react";
import {useSearchParams} from "react-router-dom";
import EditDialogue from "../components/EditDialogue.jsx";
import CreateTaskDialogue from "../components/CreateTaskDialogue.jsx";

function KanbanBoard() {
  const { tasks, moveTask } = useTasks()

  const [createTaskOpen, setCreateTaskOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const idToEdit = searchParams.get('edit')
  const taskToEdit = tasks.find((task) => task.id === Number(idToEdit))

  const openEditDialogue = (taskID) => {
    setSearchParams({edit: taskID})
  }

  const { ref: todoRef } = useDroppable({ id: "TO DO" })
  const { ref: doingRef } = useDroppable({ id: "DOING" })
  const { ref: doneRef } = useDroppable({ id: "DONE" })

  useDragDropMonitor({
    onDragEnd(event) {
      if (event.canceled) return

      const taskID = event.operation.source?.id
      const newStatus = event.operation.target?.id

      if (!taskID || !newStatus) return

      moveTask(taskID, newStatus)
    }
  })


  return (
    <div className='page-container'>
      <Navbar/>
      {taskToEdit && <EditDialogue task={taskToEdit} setSearchParams={setSearchParams}/>}
      <CreateTaskDialogue createTaskOpen={createTaskOpen} setCreateTaskOpen={setCreateTaskOpen} setSearchParams={setSearchParams} />

      <div className='board'>
        <div ref={todoRef} className='column'>
          <div className='column-name'>
            <h2>TO DO</h2>
          </div>

          {tasks.filter((task) => {
            return task.status === "TO DO"
          }).map((task) => {
            return <Task key={task.id} details={task} openEditDialogue={openEditDialogue}/>
          })}

        </div>

        <div ref={doingRef} className='column'>
          <div className='column-name'>
            <h2>DOING</h2>
          </div>

          {tasks.filter((task) => {
            return task.status === "DOING"
          }).map((task) => {
            return <Task key={task.id} details={task} openEditDialogue={openEditDialogue}/>
          })}

        </div>

        <div ref={doneRef} className='column'>
          <div className='column-name'>
            <h2>DONE</h2>
          </div>

          {tasks.filter((task) => {
            return task.status === "DONE"
          }).map((task) => {
            return <Task key={task.id} details={task} openEditDialogue={openEditDialogue}/>
          })}
        </div>
      </div>

      <button className='primary-button' onClick={() => setCreateTaskOpen(true)}>Add task</button>
    </div>
  );
}

export default KanbanBoard;