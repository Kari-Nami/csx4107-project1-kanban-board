import React, {useEffect, useRef, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import {useTasks} from "../context/TaskContext.jsx";
import {useCategories} from "../context/CategoryContext.jsx";

function EditDialogue({ task, setSearchParams }) {
  const { editTask } = useTasks()
  const { categories } = useCategories()

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [category, setCategory] = useState(task.category.id)
  const [responsible, setResponsible] = useState(task.responsible)
  const [endDate, setEndDate] = useState(task.endDate)

  const handleEditSubmit = () => {

    const newTask = {
      id: task.id,
      title: title,
      responsible: {
        id: 45678,
        name: "Crow"
      },
      description: description,
      category: categories.find((categoryChoice) => categoryChoice.id === category),
      startDate: task.startDate,
      endDate: endDate,
      completeDate: task.completeDate,
      status: task.status
    }

    editTask(newTask)
    setSearchParams({})
  }

  return (
    <Dialog open={Boolean(task)}>
      <DialogTitle>Edit {task.title}</DialogTitle>
      <DialogContent>
        <form id='edit-form' onSubmit={handleEditSubmit}>
          <TextField margin='dense' variant='outlined' size='small' label='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
          <TextField margin='dense' variant='outlined' size='small' label='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>

          <FormControl margin='dense' fullWidth>
            <InputLabel>Category</InputLabel>
            <Select id='select-category' variant='outlined' size='small' label='Category' value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((categoryChoice) => {
                return (
                  <MenuItem value={categoryChoice.id} >{categoryChoice.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
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