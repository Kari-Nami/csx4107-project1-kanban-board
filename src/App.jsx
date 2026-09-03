import React from 'react';
import { HashRouter, Routes, Route }  from 'react-router-dom'
import Dashboard from "./pages/Dashboard.jsx";
import KanbanBoard from "./pages/KanbanBoard.jsx";
import {TaskProvider} from "./context/TaskContext.jsx";

function App() {
  return (
    <TaskProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/board' element={<KanbanBoard/>}/>
        </Routes>
      </HashRouter>
    </TaskProvider>
  );
}

export default App;