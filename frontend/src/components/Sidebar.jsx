import { useState, useEffect } from 'react'
import { Code2, Settings, ChevronLeft, ChevronRight, Cpu, BookOpen, Zap } from 'lucide-react'
import { getModels } from '../utils/api'

const TIPS = [
  'Tente explicar o código em voz alta — falar ajuda a fixar o conceito.',
  'Quebre problemas complexos em partes menores.',
  'Leia a documentação oficial das tecnologias que você usa.',
  'Pratique diariamente, mesmo que seja por 15 minutos.',
  'Debugar é uma habilidade essencial. Aprenda a usar o console!',
]

export default function Sidebar({ model, onModelChange, onClearChat }) {
  const [collapsed, setCollapsed] = useState(false)
  const [models, setModels] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)])

  useEffect(() => { getModels().then(setModels).catch(() => {}) }, [])

  return (
    <aside className="relative flex flex-col border-r transition-all duration-300 ease-in-out" style={{ width: collapsed ? '56px' : '240px', minWidth: collapsed ? '56px' : '240px', background: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
      <button onClick={() => setCollapsed(v => !v)} className="absolute -right-3 top-6 z-10 flex items-center justify-center w-6 h-6 rounded-full border transition-colors" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-active)', color: 'var(--text-secondary)' }}>
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      <div className="flex items-center gap-2.5 px-3 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0" style={{ background: 'rgba(124,106,247,0.15)', border: '1px solid rgba(124,106,247,0.3)' }}>
          <Code2 size={16} style={{ color: 'var(--accent-primary)' }} />
        </div>
        {!collapsed && <div className="animate-fade-in overflow-hidden"><p className="font-bold text-sm leading-none" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>DevMentor</p><p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>AI Tutor</p></div>}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-1 overflow-hidden">
        <button onClick={() => !collapsed && setShowSettings(v => !v)} className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-left transition-colors" style={{ color: showSettings ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'} title="Configurações">
          <Settings size={16} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium animate-fade-in">Configurações</span>}
        </button>

        {!collapsed && showSettings && (
          <div className="mx-1 mt-1 p-3 rounded-lg animate-slide-up" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>MODELO</label>
            <select value={model} onChange={e => onModelChange(e.target.value)} className="w-full text-xs px-2.5 py-2 rounded-lg outline-none" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-active)', color: 'var(--text-primary)', fontFamily: 'inherit' }}>
              {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
        )}

        <button onClick={onClearChat} className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-left transition-colors" style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#f87171' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }} title="Nova conversa">
          <Zap size={16} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium animate-fade-in">Nova conversa</span>}
        </button>
      </nav>

      {!collapsed && (
        <div className="mx-3 mb-4 p-3 rounded-lg animate-fade-in" style={{ background: 'rgba(86,207,178,0.06)', border: '1px solid rgba(86,207,178,0.15)' }}>
          <div className="flex items-center gap-1.5 mb-1.5"><BookOpen size={11} style={{ color: 'var(--accent-secondary)' }} /><span className="text-xs font-semibold" style={{ color: 'var(--accent-secondary)' }}>DICA DO DIA</span></div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tip}</p>
        </div>
      )}

      {!collapsed && (
        <div className="flex items-center gap-1.5 px-3 pb-4"><Cpu size={11} style={{ color: 'var(--text-muted)' }} /><span style={{ color: 'var(--text-muted)', fontSize: '10px' }} className="text-xs truncate">{model}</span></div>
      )}
    </aside>
  )
}
