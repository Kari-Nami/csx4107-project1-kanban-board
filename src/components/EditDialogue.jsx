import React, {useEffect, useRef, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useTasks} from "../context/TaskContext.jsx";

function EditDialogue({ task, setSearchParams }) {
  const { editTask } = useTasks()

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [category, setCategory] = useState(task.category)
  const [responsible, setResponsible] = useState(task.responsible)
  const [endDate, setEndDate] = useState(task.endDate)

  const handleEditSubmit = () => {
    console.log('final title:' + title.current)
    setSearchParams({})
  }

  return (
    <Dialog open={Boolean(task)}>
      <DialogTitle>Edit {task.title}</DialogTitle>
      <DialogContent>
        <form id='edit-form' onSubmit={handleEditSubmit}>
          <TextField margin='dense' variant='outlined' size='small' label='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
          <TextField margin='dense' variant='outlined' size='small' label='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
          <input type="text" value={responsible} onChange={(e) => setResponsible(e.target.value)}/>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        </form>
      </DialogContent>
      <DialogActions>
        <button onClick={() => setSearchParams({})}>Cancel</button>
        <button type={"submit"} form='edit-form'>Save</button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialogue;