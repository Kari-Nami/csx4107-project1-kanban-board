import React, {useEffect, useState} from 'react';
import '../styles/pages/KanbanBoard.css'
import Navbar from "../components/Navbar.jsx";
import Task from "../components/task.jsx";
import {useTasks} from "../context/TaskContext.jsx";
import {useDroppable, useDragDropMonitor} from "@dnd-kit/react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useParams, useSearchParams} from "react-router-dom";

function KanbanBoard() {

  const { tasks, addTask, moveTask, editTask } = useTasks()

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

  const handleEditSubmit = () => {
    console.log('edit form submitted')
    setSearchParams({})
  }

  return (
    <div className='page-container'>
      <Navbar/>

      <Dialog open={Boolean(taskToEdit)}>
        <DialogTitle>test</DialogTitle>
        <DialogContent>
          <form id='edit-form' onSubmit={handleEditSubmit}>

          </form>
        </DialogContent>
        <DialogActions>
          <button onClick={() => setSearchParams({})}>Cancel</button>
          <button type={"submit"} form='edit-form'>Save</button>
        </DialogActions>
      </Dialog>

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
      
      <button onClick={() => addTask("test", "descrpition", "cat", "12/12/12", {id: 1, name: "test"})}>Add task</button>
    </div>
  );
}

export default KanbanBoard;