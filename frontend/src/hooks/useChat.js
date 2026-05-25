import { useState, useCallback } from 'react'
import { sendMessage } from '../utils/api'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: `Olá! Sou o **DevMentor AI**, seu assistente de programação. 👋

Estou aqui para te ajudar a aprender de verdade — não só copiar código, mas entender cada linha.

**O que posso fazer por você:**
- Explicar conceitos de programação
- Debugar erros com você
- Mostrar exemplos práticos
- Propor desafios para praticar

Como posso te ajudar hoje? 🚀`,
  timestamp: new Date(),
}

export function useChat(model) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendUserMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      // Build conversation history (exclude welcome message, only real messages)
      const history = [...messages, userMessage]
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }))

      const data = await sendMessage(history, model)

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        usage: data.usage,
        model: data.model,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erro ao conectar com o servidor. Verifique se o backend está rodando.'
      setError(errorMsg)
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ **Erro:** ${errorMsg}`,
        timestamp: new Date(),
        isError: true,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading, model])

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendUserMessage, clearChat }
}
