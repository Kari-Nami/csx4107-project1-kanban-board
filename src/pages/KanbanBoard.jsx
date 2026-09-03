import React, {useEffect, useState} from 'react';
import '../styles/pages/KanbanBoard.css'
import Navbar from "../components/Navbar.jsx";
import Task from "../components/task.jsx";
import {useTasks} from "../context/TaskContext.jsx";

function KanbanBoard() {

  const { tasks, addTask } = useTasks()

  useEffect(() => {
    console.log(tasks)
  }, [tasks]);

  return (
    <div className='page-container'>
      <Navbar/>

      <div className='board'>
        <div className='column'>
          <div className='column-name'>
            <h2>TO DO</h2>
          </div>

          {tasks.filter((task) => {
            return task.status === "TO DO"
          }).map((task) => {
            return <Task key={task.id} details={task}/>
          })}

        </div>
        <div className='column'>
          <div className='column-name'>
            <h2>DOING</h2>
          </div>

          {tasks.filter((task) => {
            return task.status === "DOING"
          }).map((task) => {
            return <Task key={task.id} details={task} />
          })}

        </div>
        <div className='column'>
          <div className='column-name'>
            <h2>DONE</h2>
          </div>

          {tasks.filter((task) => {
            return task.status === "DONE"
          }).map((task) => {
            return <Task key={task.id} details={task} />
          })}
        </div>
      </div>
      {/*title, description, category, endDate, responsible*/}
      <button onClick={() => addTask("test", "descrpition", "cat", "12/12/12", {id: 1, name: "test"})}>Add task</button>
    </div>
  );
}

export default KanbanBoard;