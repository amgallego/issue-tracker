import { useState, useEffect, useCallback } from 'react'
import { issuesService } from '../services/issuesService'

export const useIssues = () => {
  const [issues, setIssues]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetchIssues = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await issuesService.getAll()
      setIssues(data)
    } catch {
      setError('No se pudo conectar con la API. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchIssues() }, [fetchIssues])

  const addIssue = async (issueData) => {
    const { data } = await issuesService.create(issueData)
    setIssues((prev) => [...prev, data])
  }

  const editIssue = async (id, issueData) => {
    const { data } = await issuesService.update(id, issueData)
    setIssues((prev) => prev.map((i) => (i.id === id ? data : i)))
  }

  const deleteIssue = async (id) => {
    await issuesService.remove(id)
    setIssues((prev) => prev.filter((i) => i.id !== id))
  }

  return { issues, loading, error, fetchIssues, addIssue, editIssue, deleteIssue }
}
