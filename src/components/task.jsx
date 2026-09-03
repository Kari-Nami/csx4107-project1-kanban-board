import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTasks} from "../context/TaskContext.jsx";

/* task structure:
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
*/

function Task({ details}) {
  const { editTask, deleteTask } = useTasks()

  return (
    <div className='task' key={details.id}>
      <div className='task-header'>
        <h3>{details.title}</h3>
        <div className='category-tag'>{details.category}</div>
      </div>
      <div>{details.description}</div>
      <div>{details.endDate}</div>
      <div>{details.responsible.name}</div>
      <button onClick={() => deleteTask(details.id)}>
        <DeleteIcon/>
      </button>
      <button disabled onClick={() => editTask({})}>
        <EditIcon/>
      </button>
    </div>
  );
}

export default Task;