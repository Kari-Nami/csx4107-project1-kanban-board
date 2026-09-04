import {createContext, useContext, useEffect, useState} from "react"

const TaskContext = createContext()

// tasks are saved in local storage so they are still there after a refresh
const TASKS_STORAGE_KEY = "tasks"

const defaultTasks = [
  {
    id: 1,
    title: "test1",
    responsible: {
      id: 12345,
      name: "Kate"
    },
    description: "this is a test task",
    category: {id: 1, name: "food"},
    startDate: "01/09/2026",
    endDate: "03/09/2026",
    completeDate: null,
    status: "TO DO"
  },
  {
    id: 2,
    title: "test2",
    responsible: {
      id: 45678,
      name: "Crow"
    },
    description: "this is a test task",
    category: {id: 2, name: "class"},
    startDate: "02/09/2026",
    endDate: "07/09/2026",
    completeDate: null,
    status: "DOING"
  }
]

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks
  } catch {
    return defaultTasks
  }
}

export function TaskProvider({children}) {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title, description, category, startDate, endDate, responsible) => {
    const now = new Date()

    const newTask = {
      id: now.getTime(),
      title: title,
      responsible: responsible,
      description: description,
      category: category,
      startDate: startDate,
      endDate: endDate,
      completeDate: null,
      status: "TO DO"
    }

    setTasks(previous => [...previous, newTask])
  }

  const deleteTask = (taskID) => {
    setTasks(previous => previous.filter((task) => {
      return task.id !== taskID
    }))
  }

  const editTask = (newTask) => {
    setTasks(previous => previous.map(task => task.id === newTask.id ? newTask : task))
  }

  const moveTask = (taskID, newStatus) => {
    setTasks(previous => previous.map(task => task.id === taskID ? {...task, status: newStatus} : task)
    )
  }

  return (
    <TaskContext.Provider value={{
      tasks, addTask, deleteTask, editTask, moveTask
    }} >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}
