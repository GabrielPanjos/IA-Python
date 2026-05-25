import { Trash2, Wifi, WifiOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { healthCheck } from '../utils/api'

export default function Header({ onClearChat, messageCount }) {
  const [online, setOnline] = useState(null)

  useEffect(() => {
    healthCheck()
      .then(() => setOnline(true))
      .catch(() => setOnline(false))

    const interval = setInterval(() => {
      healthCheck()
        .then(() => setOnline(true))
        .catch(() => setOnline(false))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className="flex items-center justify-between px-4 py-3 border-b"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-secondary)' }}
    >
      <div className="flex items-center gap-3">
        <div>
          <h1
            className="text-sm font-semibold"
            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}
          >
            Assistente de Programação
          </h1>
          {messageCount > 0 && (
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {messageCount} {messageCount === 1 ? 'mensagem' : 'mensagens'} nesta sessão
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Backend status */}
        <div className="flex items-center gap-1.5">
          {online === null ? (
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
          ) : online ? (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Online</span>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-xs hidden sm:inline" style={{ color: '#f87171', fontSize: '10px' }}>Offline</span>
            </>
          )}
        </div>

        {/* Clear chat */}
        {messageCount > 0 && (
          <button
            onClick={onClearChat}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
              e.currentTarget.style.color = '#f87171'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
            title="Limpar conversa"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Limpar</span>
          </button>
        )}
      </div>
    </header>
  )
}
