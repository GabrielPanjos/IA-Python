import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
})

export async function sendMessage(messages, model) {
  const { data } = await api.post('/chat', { messages, model })
  return data
}

export async function getModels() {
  const { data } = await api.get('/models')
  return data.models
}

export async function healthCheck() {
  const { data } = await api.get('/health')
  return data
}
