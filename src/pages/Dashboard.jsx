import React from 'react';
import '../styles/pages/Dashboard.css';
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar/>
      <div className='page-container'>
        <h1>Welcome to Kanban Board</h1>
        <button className='primary-button' onClick={() => navigate('/board')} >
          Go to Board
        </button>
      </div>
    </>
  );
}

export default Dashboard;