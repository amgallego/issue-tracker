import axios from 'axios'

const API_URL = 'https://6a17914e1878294b597b9a1b.mockapi.io/api/issues'

const api = axios.create({ baseURL: API_URL })

export const issuesService = {
  getAll: () => api.get('/'),
  create: (data) => api.post('/', data),
  update: (id, data) => api.put(`/${id}`, data),
  remove: (id) => api.delete(`/${id}`),
}
