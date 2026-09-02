import React from 'react';

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
  return (
    <div className='task' key={details.id}>
      <div className='task-header'>
        <h3>{details.title}</h3>
        <div className='category-tag'>{details.category}</div>
      </div>
    </div>
  );
}

export default Task;