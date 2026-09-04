import { useMemo } from 'react';
import '../styles/pages/Dashboard.css';
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from 'react-router-dom'
import { useTasks } from "../context/TaskContext.jsx";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// turns a "DD/MM/YYYY" string into a Date at midnight, so dates compare by day only
function parseDate(dateString) {
  if (!dateString) return null

  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day)
}

// the chart colours are defined once in index.css (:root),
// but recharts can't use CSS variables in svg fills, so we read them out here
function getChartColours() {
  const styles = getComputedStyle(document.documentElement)

  return {
    todo: styles.getPropertyValue('--chart-todo').trim(),
    doing: styles.getPropertyValue('--chart-doing').trim(),
    done: styles.getPropertyValue('--chart-done').trim(),
    bar: styles.getPropertyValue('--chart-bar').trim(),
    early: styles.getPropertyValue('--chart-early').trim(),
    ontime: styles.getPropertyValue('--chart-ontime').trim(),
    late: styles.getPropertyValue('--chart-late').trim()
  }
}

function Dashboard() {
  const navigate = useNavigate()
  const { tasks } = useTasks()
  const colours = getChartColours()

  const stats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const countStatus = (status) => tasks.filter((task) => task.status === status).length

    // not finished and the end date has already passed
    const overdue = tasks.filter((task) => {
      const endDate = parseDate(task.endDate)
      return task.status !== "DONE" && endDate && endDate < today
    }).length

    // early / on time / late only make sense for finished tasks that have a complete date
    const completion = { early: 0, ontime: 0, late: 0 }

    tasks.forEach((task) => {
      if (task.status !== "DONE" || !task.completeDate || !task.endDate) return

      const completeDate = parseDate(task.completeDate)
      const endDate = parseDate(task.endDate)

      if (completeDate < endDate) {
        completion.early += 1
      } else if (completeDate.getTime() === endDate.getTime()) {
        completion.ontime += 1
      } else {
        completion.late += 1
      }
    })

    // count how many tasks each category has
    const categoryCounts = {}

    tasks.forEach((task) => {
      const name = task.category?.name || 'None'
      categoryCounts[name] = (categoryCounts[name] || 0) + 1
    })

    const categories = Object.entries(categoryCounts).map(([name, count]) => {
      return { name: name, count: count }
    }).sort((a, b) => b.count - a.count)

    return {
      total: tasks.length,
      todo: countStatus("TO DO"),
      doing: countStatus("DOING"),
      done: countStatus("DONE"),
      overdue: overdue,
      completion: completion,
      categories: categories
    }
  }, [tasks])

  // data for the charts
  const statusData = [
    { name: "TO DO", value: stats.todo },
    { name: "DOING", value: stats.doing },
    { name: "DONE", value: stats.done }
  ]

  const statusColours = {
    "TO DO": colours.todo,
    "DOING": colours.doing,
    "DONE": colours.done
  }

  const completionData = [
    { name: "Early", value: stats.completion.early },
    { name: "On Time", value: stats.completion.ontime },
    { name: "Late", value: stats.completion.late }
  ]

  const completionColours = {
    "Early": colours.early,
    "On Time": colours.ontime,
    "Late": colours.late
  }

  const finishedWithDates = stats.completion.early + stats.completion.ontime + stats.completion.late

  // shared tooltip style so the charts match the retro look
  const tooltipStyle = {
    backgroundColor: 'var(--task-bg-colour)',
    border: '2px solid var(--primary-colour)',
    borderRadius: 0,
    fontSize: 'var(--font-size-base)'
  }

  const axisTick = { fontSize: 12 }

  return (
    <div className='page-container'>
      <Navbar/>

      <div className='dashboard'>
        <div className='dashboard-header'>
          <h2>Dashboard</h2>
          <button className='primary-button' onClick={() => navigate('/board')} >
            Go to Board
          </button>
        </div>

        <div className='summary-cards'>
          <div className='summary-card'>
            <span className='summary-label'>Total Tasks</span>
            <span className='summary-value'>{stats.total}</span>
          </div>
          <div className='summary-card'>
            <span className='summary-label'>To Do</span>
            <span className='summary-value'>{stats.todo}</span>
          </div>
          <div className='summary-card'>
            <span className='summary-label'>Doing</span>
            <span className='summary-value'>{stats.doing}</span>
          </div>
          <div className='summary-card'>
            <span className='summary-label'>Done</span>
            <span className='summary-value'>{stats.done}</span>
          </div>
          <div className='summary-card overdue'>
            <span className='summary-label'>Overdue</span>
            <span className='summary-value'>{stats.overdue}</span>
          </div>
        </div>

        <div className='chart-grid'>
          <div className='chart-card'>
            <h3>Tasks by Status</h3>
            {stats.total === 0 ? (
              <p className='empty-message'>No tasks yet</p>
            ) : (
              <PieChart width={300} height={250}>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  isAnimationActive={false}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={statusColours[entry.name]}/>
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle}/>
                <Legend/>
              </PieChart>
            )}
          </div>

          <div className='chart-card'>
            <h3>Tasks by Category</h3>
            {stats.categories.length === 0 ? (
              <p className='empty-message'>No tasks yet</p>
            ) : (
              <BarChart width={320} height={250} data={stats.categories}>
                <XAxis dataKey="name" tick={axisTick}/>
                <YAxis allowDecimals={false} tick={axisTick} width={30}/>
                <Tooltip contentStyle={tooltipStyle}/>
                <Bar dataKey="count" name="Tasks" maxBarSize={24} isAnimationActive={false}>
                  {stats.categories.map((entry) => (
                    <Cell key={entry.name} fill={colours.bar}/>
                  ))}
                </Bar>
              </BarChart>
            )}
          </div>

          <div className='chart-card'>
            <h3>Completion Performance</h3>
            {finishedWithDates === 0 ? (
              <p className='empty-message'>No completed tasks with a complete date yet</p>
            ) : (
              <BarChart width={320} height={250} data={completionData}>
                <XAxis dataKey="name" tick={axisTick}/>
                <YAxis allowDecimals={false} tick={axisTick} width={30}/>
                <Tooltip contentStyle={tooltipStyle}/>
                <Bar dataKey="value" name="Tasks" maxBarSize={24} isAnimationActive={false}>
                  {completionData.map((entry) => (
                    <Cell key={entry.name} fill={completionColours[entry.name]}/>
                  ))}
                </Bar>
              </BarChart>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
