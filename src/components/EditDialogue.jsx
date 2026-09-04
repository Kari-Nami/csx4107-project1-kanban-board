import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Box } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {useTasks} from "../context/TaskContext.jsx";
import {useCategories} from "../context/CategoryContext.jsx";

function EditDialogue({ task, setSearchParams }) {
  const { editTask } = useTasks()
  const { categories, addCategory } = useCategories()

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [category, setCategory] = useState(task.category.id)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [responsibleName, setResponsibleName] = useState(task.responsible.name)
  const [responsibleId, setResponsibleId] = useState(task.responsible.id)
  const [startDate, setStartDate] = useState(task.startDate)
  const [endDate, setEndDate] = useState(task.endDate)

  const handleEditSubmit = () => {

    // when "new category" is picked, create it first and use it for this task
    let chosenCategory = categories.find((categoryChoice) => categoryChoice.id === category)

    if (category === 'new') {
      chosenCategory = newCategoryName.trim() ? addCategory(newCategoryName.trim()) : task.category
    }

    const newTask = {
      id: task.id,
      title: title,
      responsible: {
        id: responsibleId,
        name: responsibleName
      },
      description: description,
      category: chosenCategory,
      startDate: startDate,
      endDate: endDate,
      completeDate: task.completeDate,
      status: task.status
    }

    editTask(newTask)
    setSearchParams({})
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={Boolean(task)}>
        <DialogTitle>Editing {task.title}</DialogTitle>
        <DialogContent>
          <form  id='edit-form' onSubmit={handleEditSubmit}>
          <TextField margin='dense' variant='outlined' size='small' label='Title' fullWidth
                     value={title} onChange={(e) => setTitle(e.target.value)}
                     error={!title.trim()}
          />

          <TextField margin='dense' variant='outlined' size='small' label='Description' fullWidth multiline rows={3}
                     value={description} onChange={(e) => setDescription(e.target.value)}
          />

          <Box className='responsible-inputs-container'>
            <TextField margin='dense' variant='outlined' size='small' label='Responsible Name'
                       value={responsibleName} onChange={(e) => setResponsibleName(e.target.value)}
                       error={!responsibleName}
            />
            <TextField margin='dense' variant='outlined' size='small' label='Responsible ID' type='number'
                       value={responsibleId} onChange={(e) => setResponsibleId(Number(e.target.value))}
                       error={!responsibleId}
            />
          </Box>

          <Box className='form-row-container'>
            <FormControl margin='dense' error={!category}>
              <InputLabel>Category</InputLabel>
              <Select id='select-category' variant='outlined' size='small' label='Category'
                      value={category} onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((categoryChoice) => {
                  return (
                    <MenuItem value={categoryChoice.id} >{categoryChoice.name}</MenuItem>
                  )
                })}
                <MenuItem value='new'>+ New category</MenuItem>
              </Select>
            </FormControl>

            <DatePicker
              label="Start Date" format='DD/MM/YYYY' slotProps={{ textField: { margin: 'dense', variant: 'outlined', size: 'small', error: !startDate } }}
              value={dayjs(startDate, 'DD/MM/YYYY')} onChange={(newDate) => setStartDate(newDate ? newDate.format('DD/MM/YYYY') : '')}
            />

            <DatePicker
              label="End Date" format='DD/MM/YYYY' slotProps={{ textField: { margin: 'dense', variant: 'outlined', size: 'small', error: !endDate } }}
              value={dayjs(endDate, 'DD/MM/YYYY')} onChange={(newDate) => setEndDate(newDate ? newDate.format('DD/MM/YYYY') : '')}
            />
          </Box>

          {category === 'new' && (
            <TextField margin='dense' variant='outlined' size='small' label='New Category Name' fullWidth
                       value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)}
            />
          )}
        </form>
      </DialogContent>

      <DialogActions>
        <button className='secondary-button' onClick={() => setSearchParams({})}>Cancel</button>
        <button className='primary-button' type={"submit"} form='edit-form'>Save</button>
      </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default EditDialogue;