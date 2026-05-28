const SESSION_KEY = 'issue_tracker_session'

export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export const saveSession = (data) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data))
}

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY)
}
