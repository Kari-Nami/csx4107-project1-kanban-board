import {createContext, useContext, useEffect, useState} from "react"

const CategoryContext = createContext()

// categories are saved in local storage so they are still there after a refresh
const CATEGORIES_STORAGE_KEY = "categories"

const defaultCategories = [
  {id: 1, name: "food"},
  {id: 2, name: "class"}
]

function loadCategories() {
  try {
    const savedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY)
    return savedCategories ? JSON.parse(savedCategories) : defaultCategories
  } catch {
    return defaultCategories
  }
}

export function CategoryProvider({children}) {

  const [categories, setCategories] = useState(loadCategories)

  useEffect(() => {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories))
  }, [categories])

  const addCategory = (name) => {
    const newCategory = {
      id: new Date().getTime(),
      name: name
    }

    setCategories(previous => [...previous, newCategory])

    return newCategory
  }

  const deleteCategory = (categoryID) => {
    setCategories(previous => previous.filter((category) => {
      return category.id !== categoryID
    }))
  }

  return (
    <CategoryContext.Provider value={{
      categories, addCategory, deleteCategory
    }} >
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategories() {
  return useContext(CategoryContext)
}
