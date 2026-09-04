import {createContext, useContext, useState} from "react"

const CategoryContext = createContext()

export function CategoryProvider({children}) {

  const [categories, setCategories] = useState([
    {id: 1, name: "food"},
    {id: 2, name: "class"}
  ])

  const addCategory = (name) => {
    const newCategory = {
      id: new Date().getTime(),
      name: name
    }

    setCategories(previous => [...previous, newCategory])
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
