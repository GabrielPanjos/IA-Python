import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import { useChat } from './hooks/useChat'

const DEFAULT_MODEL = 'llama-3.3-70b-versatile'

export default function App() {
  const [model, setModel] = useState(DEFAULT_MODEL)
  const { messages, isLoading, sendUserMessage, clearChat } = useChat(model)
  const userMessageCount = messages.filter(m => m.role === 'user').length

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar model={model} onModelChange={setModel} onClearChat={clearChat} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header onClearChat={clearChat} messageCount={userMessageCount} />
        <div className="flex flex-col flex-1 min-h-0 max-w-3xl w-full mx-auto">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <ChatInput onSend={sendUserMessage} isLoading={isLoading} hasMessages={userMessageCount > 0} />
        </div>
      </div>
    </div>
  )
}
