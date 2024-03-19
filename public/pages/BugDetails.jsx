const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function BugDetails() {
  const [bug, setBug] = useState(null)
  const { bugId } = useParams()

  console.log('bugId:', bugId)
  useEffect(() => {
    bugService
      .getById(bugId)
      .then((bug) => {
        setBug(bug)
      })
      .catch((err) => {
        showErrorMsg('Cannot load bug')
      })
  }, [])

  if (!bug) return <h1>loadings....</h1>
  return (
    bug && (
      <div>
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <p>
          Severity: <span>{bug.severity}</span>
        </p>
        <p>{bug.desc}</p>
        <ul>
          {bug.labels && bug.labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
        <Link to="/bug">Back to List</Link>
      </div>
    )
  )
}