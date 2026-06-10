import axios from 'axios'

// Em produção na Vercel, VITE_BACKEND_URL deve apontar para a URL do seu backend.
// Exemplo: https://devmentor-backend.vercel.app
// Em dev local, usa o proxy do Vite (configurado no vite.config.js).
const BASE_URL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api`
  : '/api'

const api = axios.create({
  baseURL: BASE_URL,
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
