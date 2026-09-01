import React from 'react';
import '../App.css'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <div className='nav-bar'>
      <h1>Project 1</h1>
      <button onClick={() => navigate('/')} >
        <HomeIcon/>
      </button>
    </div>
  );
}

export default Navbar;