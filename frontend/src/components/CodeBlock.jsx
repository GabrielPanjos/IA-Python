import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Copy, Check, Terminal } from 'lucide-react'

// Custom dark theme matching our design
const customTheme = {
  'code[class*="language-"]': {
    color: '#c9d1d9',
    fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
    fontSize: '0.82rem',
    lineHeight: '1.6',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    tabSize: '2',
  },
  'pre[class*="language-"]': {
    color: '#c9d1d9',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    fontSize: '0.82rem',
    lineHeight: '1.6',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    overflow: 'auto',
    padding: '1rem',
    margin: '0',
    background: '#0d0d14',
  },
  comment: { color: '#484f58', fontStyle: 'italic' },
  prolog: { color: '#484f58' },
  doctype: { color: '#484f58' },
  cdata: { color: '#484f58' },
  punctuation: { color: '#8b949e' },
  property: { color: '#79c0ff' },
  tag: { color: '#7ee787' },
  boolean: { color: '#ff7b72' },
  number: { color: '#f2cc60' },
  constant: { color: '#79c0ff' },
  symbol: { color: '#f2cc60' },
  deleted: { color: '#ff7b72' },
  selector: { color: '#7ee787' },
  'attr-name': { color: '#79c0ff' },
  string: { color: '#a5d6ff' },
  char: { color: '#a5d6ff' },
  builtin: { color: '#56cfb2' },
  inserted: { color: '#7ee787' },
  operator: { color: '#ff9e64' },
  entity: { color: '#a5d6ff' },
  url: { color: '#a5d6ff' },
  variable: { color: '#e8e8f0' },
  atrule: { color: '#d2a8ff' },
  'attr-value': { color: '#a5d6ff' },
  function: { color: '#d2a8ff' },
  'class-name': { color: '#f2cc60' },
  keyword: { color: '#ff7b72' },
  regex: { color: '#a5d6ff' },
  important: { color: '#ff7b72', fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
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
    <div
      className="rounded-xl overflow-hidden my-3"
      style={{ border: '1px solid var(--border-active)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: '#0d0d14', borderBottom: '1px solid var(--border-active)' }}
      >
        <div className="flex items-center gap-2">
          <Terminal size={12} style={{ color: 'var(--text-muted)' }} />
          <span
            className="text-xs font-medium"
            style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}
          >
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-all"
          style={{
            color: copied ? 'var(--accent-secondary)' : 'var(--text-muted)',
            background: copied ? 'rgba(86,207,178,0.1)' : 'transparent',
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={customTheme}
        showLineNumbers={code.split('\n').length > 3}
        lineNumberStyle={{
          color: '#2e2e44',
          fontSize: '0.72rem',
          paddingRight: '1rem',
          userSelect: 'none',
          minWidth: '2.5rem',
        }}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: '#0d0d14',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
