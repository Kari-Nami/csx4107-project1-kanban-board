import React, {useState} from 'react';
import '../styles/pages/KanbanBoard.css'
import Navbar from "../components/Navbar.jsx";
import Task from "../components/task.jsx";

function KanbanBoard() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "test1",
      responsible: {
        id: 12345,
        name: "Kate"
      },
      description: "this is a test task",
      category: "food",
      startDate: "01/09/2026",
      endDate: "03/09/2026",
      completeDate: null,
      status: "TO DO"
    },
    {
      id: 2,
      title: "test2",
      responsible: {
        id: 45678,
        name: "Crow"
      },
      description: "this is a test task",
      category: "class",
      startDate: "02/09/2026",
      endDate: "07/09/2026",
      completeDate: null,
      status: "DOING"
    }
  ])

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