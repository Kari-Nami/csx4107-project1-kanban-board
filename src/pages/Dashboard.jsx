import React from 'react';
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar/>
      <button onClick={() => navigate('/board')} >
        go to board
      </button>
    </>
  );
}

export default Dashboard;