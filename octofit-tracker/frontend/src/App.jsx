import { useEffect, useState } from 'react'
import './App.css'
import { getApiUrl } from './api'

function App() {
  const [users, setUsers] = useState([])
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const [usersResponse, activitiesResponse] = await Promise.all([
          fetch(getApiUrl('/api/users')),
          fetch(getApiUrl('/api/activities')),
        ])

        if (!usersResponse.ok || !activitiesResponse.ok) {
          throw new Error('Failed to load API data')
        }

        const [usersData, activitiesData] = await Promise.all([
          usersResponse.json(),
          activitiesResponse.json(),
        ])

        setUsers(usersData)
        setActivities(activitiesData)
      } catch (err) {
        setError(err.message)
      }
    }

    loadData()
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">OctoFit Tracker</h1>
      <p className="text-muted">API base URL: {getApiUrl('')}</p>

      {error ? <div className="alert alert-danger">{error}</div> : null}

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Users</h2>
              <ul className="list-group list-group-flush">
                {users.map((user) => (
                  <li className="list-group-item" key={user._id}>
                    {user.name} ({user.email})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Activities</h2>
              <ul className="list-group list-group-flush">
                {activities.map((activity) => (
                  <li className="list-group-item" key={activity._id}>
                    {activity.type} — {activity.duration} min
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
