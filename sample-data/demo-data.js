// Demo data for screenshots (same tasks as the README screenshots)
//
// Open the app locally (npm run dev) or the GitHub Pages site
// Open the browser console (F12 -> Console)
// Paste this whole file and press Enter

localStorage.setItem('categories', JSON.stringify([
  {id: 1, name: 'food'},
  {id: 2, name: 'class'},
  {id: 3, name: 'study'},
  {id: 4, name: 'work'}
]))

localStorage.setItem('tasks', JSON.stringify([
  {
    id: 1,
    title: 'Buy groceries',
    responsible: {id: 12345, name: 'Kate'},
    description: 'Rice, eggs and coffee for the week',
    category: {id: 1, name: 'food'},
    startDate: '30/08/2026',
    endDate: '02/09/2026',
    completeDate: null,
    status: 'TO DO'
  },
  {
    id: 2,
    title: 'Finish history assignment',
    responsible: {id: 45678, name: 'Crow'},
    description: 'Write the final essay and check references',
    category: {id: 2, name: 'class'},
    startDate: '03/09/2026',
    endDate: '08/09/2026',
    completeDate: null,
    status: 'TO DO'
  },
  {
    id: 3,
    title: 'Prepare presentation slides',
    responsible: {id: 12345, name: 'Kate'},
    description: "Ten slides for Monday's seminar",
    category: {id: 2, name: 'class'},
    startDate: '01/09/2026',
    endDate: '06/09/2026',
    completeDate: null,
    status: 'DOING'
  },
  {
    id: 4,
    title: 'Read chapter 4',
    responsible: {id: 45678, name: 'Crow'},
    description: 'Make short notes while reading',
    category: {id: 3, name: 'study'},
    startDate: '30/08/2026',
    endDate: '03/09/2026',
    completeDate: null,
    status: 'DOING'
  },
  {
    id: 5,
    title: 'Submit project proposal',
    responsible: {id: 12345, name: 'Kate'},
    description: 'Upload the pdf before the deadline',
    category: {id: 2, name: 'class'},
    startDate: '28/08/2026',
    endDate: '30/08/2026',
    completeDate: '29/08/2026',
    status: 'DONE'
  },
  {
    id: 6,
    title: 'Book study room',
    responsible: {id: 45678, name: 'Crow'},
    description: 'Reserve a room for the group session',
    category: {id: 3, name: 'study'},
    startDate: '27/08/2026',
    endDate: '28/08/2026',
    completeDate: '31/08/2026',
    status: 'DONE'
  },
  {
    id: 7,
    title: 'Team meeting notes',
    responsible: {id: 12345, name: 'Kate'},
    description: 'Share notes with the group',
    category: {id: 4, name: 'work'},
    startDate: '29/08/2026',
    endDate: '31/08/2026',
    completeDate: '31/08/2026',
    status: 'DONE'
  }
]))

location.reload()
