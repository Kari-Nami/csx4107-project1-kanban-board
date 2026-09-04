import { useState } from 'react';
import '../styles/pages/EditTask.css'
import {useParams} from "react-router-dom";
import {useTasks} from "../context/TaskContext.jsx";
import Navbar from "../components/Navbar.jsx";

function EditTask() {

  const {id} = useParams()
  const { tasks } = useTasks()
  const task = tasks.find((task) => task.id === Number(id))

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  return (
    <div className='page-container'>
      <Navbar/>
      <h1>Editing Task {task.title}</h1>

      <div className='form-row'>
        <label htmlFor="title">Title</label>
        <input id='title' value={title} type="text" onChange={(event) => setTitle(event.target.value)} />
      </div>

      <div className='form-row'>
        <label htmlFor="description">Description</label>
        <textarea id='description' value={description} onChange={(event) => setDescription(event.target.value)} />
      </div>

      <div className='form-row'>
        <label htmlFor="description">Category</label>
        <textarea id='description' value={description} onChange={(event) => setDescription(event.target.value)} />
      </div>
    </div>
  );
}

export default EditTask;