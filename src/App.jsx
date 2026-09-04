import React from 'react';
import { HashRouter, Routes, Route }  from 'react-router-dom'
import Dashboard from "./pages/Dashboard.jsx";
import KanbanBoard from "./pages/KanbanBoard.jsx";
import {TaskProvider} from "./context/TaskContext.jsx";
import {CategoryProvider} from "./context/CategoryContext.jsx";
import {DragDropProvider} from "@dnd-kit/react";
import EditTask from "./pages/EditTask.jsx";

function App() {
  return (
    <CategoryProvider>
      <TaskProvider>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/board' element={<DragDropProvider><KanbanBoard/></DragDropProvider>}/>
            <Route path='/tasks/:id' element={<EditTask/>}/>
          </Routes>
        </HashRouter>
      </TaskProvider>
    </CategoryProvider>
  );
}

export default App;