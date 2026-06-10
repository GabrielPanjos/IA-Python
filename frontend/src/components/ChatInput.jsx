import { useState, useRef, useCallback } from 'react'
import { Send } from 'lucide-react'

const SUGGESTIONS = [
  'O que é recursão em programação?',
  'Como funcionam closures em JavaScript?',
  'Explique o conceito de Big O notation',
  'Como debugar código Python eficientemente?',
]

export default function ChatInput({ onSend, isLoading, hasMessages }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const handleSend = useCallback(() => {
    if (!value.trim() || isLoading) return
    onSend(value)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }, [value, isLoading, onSend])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const handleInput = (e) => {
    setValue(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px'
  }

  return (
    <div className="px-4 pb-4 pt-2">
      {!hasMessages && (
        <div className="flex flex-wrap gap-2 mb-3 justify-center animate-fade-in">
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => onSend(s)} disabled={isLoading} className="text-xs px-3 py-1.5 rounded-full transition-all" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-active)', color: 'var(--text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,106,247,0.4)'; e.currentTarget.style.color = 'var(--accent-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-active)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-end gap-3 px-4 py-3 rounded-2xl transition-all" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-active)' }}
        onFocusCapture={e => { e.currentTarget.style.borderColor = 'rgba(124,106,247,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,106,247,0.06)' }}
        onBlurCapture={e => { e.currentTarget.style.borderColor = 'var(--border-active)'; e.currentTarget.style.boxShadow = 'none' }}>
        <textarea ref={textareaRef} value={value} onChange={handleInput} onKeyDown={handleKeyDown} placeholder="Pergunte algo sobre programação..." rows={1} disabled={isLoading} className="flex-1 bg-transparent outline-none text-sm leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'inherit', maxHeight: '180px', minHeight: '24px' }} />
        <button onClick={handleSend} disabled={!value.trim() || isLoading} className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all" style={{ background: value.trim() && !isLoading ? 'var(--accent-primary)' : 'var(--bg-tertiary)', color: value.trim() && !isLoading ? '#fff' : 'var(--text-muted)' }}>
          <Send size={13} />
        </button>
      </div>
      <p className="text-center mt-2" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Enter para enviar · Shift+Enter para nova linha</p>
    </div>
  )
}
