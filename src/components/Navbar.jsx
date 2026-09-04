import '../styles/App.css'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <div className='nav-bar'>

      <h1>Kanban Board</h1>

      <button className='primary-button' onClick={() => navigate('/')} >
        <HomeIcon/>
      </button>
    </div>
  );
}

export default Navbar;