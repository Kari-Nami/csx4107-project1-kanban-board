import React, {useState} from 'react';
import '../styles/pages/KanbanBoard.css'
import Navbar from "../components/Navbar.jsx";
import Task from "../components/task.jsx";
import {useTasks} from "../context/TaskContext.jsx";

function KanbanBoard() {

  const { tasks, addTask } = useTasks()

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
            return <Task details={task}/>
          })}

        </div>
        <div className='column'>
          <div className='column-name'>
            <h2>DOING</h2>
          </div>

          {tasks.filter((task) => {
            return task.status === "DOING"
          }).map((task) => {
            return <Task details={task} />
          })}

        </div>
        <div className='column'>
          <div className='column-name'>
            <h2>DONE</h2>
          </div>

          {tasks.map((task) => {
            return <Task details={task} />
          })}
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;