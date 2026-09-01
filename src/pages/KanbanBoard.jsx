import React from 'react';
import '../styles/pages/KanbanBoard.css'
import Navbar from "../components/Navbar.jsx";

function KanbanBoard(props) {
  return (
    <div className='page-container'>
      <Navbar/>

      <div className='board'>
        <div className='column'>
          <div className='column-name'>
            <h2>TO DO</h2>
          </div>

        </div>
        <div className='column'>
          <div className='column-name'>
            <h2>DOING</h2>
          </div>

        </div>
        <div className='column'>
          <div className='column-name'>
            <h2>DONE</h2>
          </div>

        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;