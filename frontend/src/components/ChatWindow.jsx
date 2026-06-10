import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import LoadingIndicator from './LoadingIndicator'
import { Code2, BookOpen, Zap, MessageSquare } from 'lucide-react'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 animate-fade-in">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ background: 'rgba(124,106,247,0.1)', border: '1px solid rgba(124,106,247,0.2)' }}>
        <Code2 size={28} style={{ color: 'var(--accent-primary)' }} />
      </div>
      <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>DevMentor AI</h2>
      <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Seu assistente de programação. Faça uma pergunta para começar.</p>
      <div className="grid grid-cols-2 gap-3 mt-8 max-w-sm w-full">
        {[{ icon: BookOpen, label: 'Conceitos', desc: 'Aprenda fundamentos' }, { icon: Zap, label: 'Debug', desc: 'Resolva erros' }, { icon: MessageSquare, label: 'Exemplos', desc: 'Código prático' }, { icon: Code2, label: 'Desafios', desc: 'Pratique aprendendo' }].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex flex-col items-start p-3 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <Icon size={14} style={{ color: 'var(--accent-secondary)', marginBottom: '6px' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null)
  const hasRealMessages = messages.filter(m => m.id !== 'welcome').length > 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (!hasRealMessages && messages.length <= 1) return <EmptyState />

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {messages.map(message => <ChatMessage key={message.id} message={message} />)}
      {isLoading && <LoadingIndicator />}
      <div ref={bottomRef} className="h-1" />
    </div>
  )
}
