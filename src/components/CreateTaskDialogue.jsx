import React, {useEffect, useRef, useState} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Box } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {useTasks} from "../context/TaskContext.jsx";
import {useCategories} from "../context/CategoryContext.jsx";

function CreateTaskDialogue({ createTaskOpen, setCreateTaskOpen }) {
  const { addTask } = useTasks()
  const { categories } = useCategories()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [responsibleName, setResponsibleName] = useState('')
  const [responsibleId, setResponsibleId] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleCreateSubmit = () => {

    if (!title.trim() || !endDate || !responsibleName || !responsibleId || !category) {
      return
    }

    addTask(
      title,
      description,
      categories.find((categoryChoice) => categoryChoice.id === category),
      endDate,
      { id: responsibleId, name: responsibleName }
    )
    setCreateTaskOpen(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={createTaskOpen}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <form  id='edit-form' onSubmit={handleCreateSubmit}>
            <TextField margin='dense' variant='outlined' size='small' label='Title' fullWidth
                       value={title} onChange={(e) => setTitle(e.target.value)}
            />

            <TextField margin='dense' variant='outlined' size='small' label='Description' fullWidth multiline rows={3}
                       value={description} onChange={(e) => setDescription(e.target.value)}
            />

            <Box className='responsible-inputs-container'>
              <TextField margin='dense' variant='outlined' size='small' label='Responsible Name'
                         value={responsibleName} onChange={(e) => setResponsibleName(e.target.value)}
              />
              <TextField margin='dense' variant='outlined' size='small' label='Responsible ID' type='number'
                         value={responsibleId} onChange={(e) => setResponsibleId(Number(e.target.value))}
              />
            </Box>

            <Box className='form-row-container'>
              <FormControl margin='dense'>
                <InputLabel>Category</InputLabel>
                <Select id='select-category' variant='outlined' size='small' label='Category'
                        value={category} onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((categoryChoice) => {
                    return (
                      <MenuItem value={categoryChoice.id} >{categoryChoice.name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>

              <DatePicker
                label="End Date" format='DD/MM/YYYY' slotProps={{textField: { margin: 'dense', variant: 'outlined', size: 'small' }}}
                value={dayjs(endDate, 'DD/MM/YYYY')} onChange={(newDate) => setEndDate(newDate ? newDate.format('DD/MM/YYYY') : '')}
              />
            </Box>
          </form>
        </DialogContent>

        <DialogActions>
          <button className='secondary-button' onClick={() => setCreateTaskOpen(false)}>Cancel</button>
          <button className='primary-button' type={"submit"} form='edit-form'>Save</button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default CreateTaskDialogue;