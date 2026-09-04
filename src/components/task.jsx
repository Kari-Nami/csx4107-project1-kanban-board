import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTasks} from "../context/TaskContext.jsx";
import {useDraggable} from "@dnd-kit/react";

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

function Task({ details, openEditDialogue }) {
  const { deleteTask } = useTasks()

  const { ref, isDragging } = useDraggable({
    id: details.id
  })

  return (
    <div ref={ref} className={`task ${isDragging ? "task-dragging" : ""}`}>
      <div className='task-header'>
        <h3>{details.title}</h3>
        <div className='category-tag'>{details.category.name}</div>
      </div>
      <div>{details.description}</div>
      <div>{details.responsible.name}</div>
      <div>
        <div>{details.startDate}</div>
        <div>{details.endDate}</div>
      </div>
      <div>
        <button className='primary-button' onClick={() => deleteTask(details.id)}>
          <DeleteIcon/>
        </button>
        <button className='secondary-button' onClick={() => openEditDialogue(details.id)}>
          <EditIcon/>
        </button>
      </div>
    </div>
  );
}

export default Task;