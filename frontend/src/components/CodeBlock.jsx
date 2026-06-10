import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Copy, Check, Terminal } from 'lucide-react'

const customTheme = {
  'code[class*="language-"]': { color: '#c9d1d9', fontFamily: '"JetBrains Mono", "Fira Code", monospace', fontSize: '0.82rem', lineHeight: '1.6' },
  'pre[class*="language-"]': { color: '#c9d1d9', fontFamily: '"JetBrains Mono", "Fira Code", monospace', fontSize: '0.82rem', lineHeight: '1.6', overflow: 'auto', padding: '1rem', margin: '0', background: '#0d0d14' },
  comment: { color: '#484f58', fontStyle: 'italic' },
  punctuation: { color: '#8b949e' },
  property: { color: '#79c0ff' },
  tag: { color: '#7ee787' },
  boolean: { color: '#ff7b72' },
  number: { color: '#f2cc60' },
  constant: { color: '#79c0ff' },
  string: { color: '#a5d6ff' },
  builtin: { color: '#56cfb2' },
  operator: { color: '#ff9e64' },
  function: { color: '#d2a8ff' },
  'class-name': { color: '#f2cc60' },
  keyword: { color: '#ff7b72' },
}

export default function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false)
  const language = className?.replace('language-', '') || 'text'
  const code = String(children).replace(/\n$/, '')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden my-3" style={{ border: '1px solid var(--border-active)' }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ background: '#0d0d14', borderBottom: '1px solid var(--border-active)' }}>
        <div className="flex items-center gap-2">
          <Terminal size={12} style={{ color: 'var(--text-muted)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{language}</span>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-all" style={{ color: copied ? 'var(--accent-secondary)' : 'var(--text-muted)', background: copied ? 'rgba(86,207,178,0.1)' : 'transparent' }}>
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <SyntaxHighlighter language={language} style={customTheme} showLineNumbers={code.split('\n').length > 3} lineNumberStyle={{ color: '#2e2e44', fontSize: '0.72rem', paddingRight: '1rem', userSelect: 'none', minWidth: '2.5rem' }} customStyle={{ margin: 0, borderRadius: 0, background: '#0d0d14' }}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
