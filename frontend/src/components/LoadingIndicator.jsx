import { Bot } from 'lucide-react'

export default function LoadingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full mt-0.5" style={{ background: 'rgba(86,207,178,0.1)', border: '1px solid rgba(86,207,178,0.25)' }}>
        <Bot size={14} style={{ color: 'var(--accent-secondary)' }} />
      </div>
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderTopLeftRadius: '6px' }}>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Pensando</span>
        <div className="loading-dots flex gap-0.5">
          <span className="text-sm" style={{ color: 'var(--accent-secondary)' }}>●</span>
          <span className="text-sm" style={{ color: 'var(--accent-secondary)' }}>●</span>
          <span className="text-sm" style={{ color: 'var(--accent-secondary)' }}>●</span>
        </div>
      </div>
    </div>
  )
}
