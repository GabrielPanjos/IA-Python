import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { User, Bot } from 'lucide-react'
import CodeBlock from './CodeBlock'

function formatTime(date) {
  return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex gap-3 animate-slide-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full mt-0.5"
        style={
          isUser
            ? { background: 'rgba(124,106,247,0.15)', border: '1px solid rgba(124,106,247,0.3)' }
            : { background: 'rgba(86,207,178,0.1)', border: '1px solid rgba(86,207,178,0.25)' }
        }
      >
        {isUser
          ? <User size={14} style={{ color: 'var(--accent-primary)' }} />
          : <Bot size={14} style={{ color: 'var(--accent-secondary)' }} />
        }
      </div>

      {/* Bubble */}
      <div className={`flex flex-col max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className="px-4 py-3 rounded-2xl"
          style={
            isUser
              ? {
                  background: 'rgba(124,106,247,0.12)',
                  border: '1px solid rgba(124,106,247,0.2)',
                  borderTopRightRadius: '6px',
                }
              : {
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderTopLeftRadius: '6px',
                }
          }
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {message.content}
            </p>
          ) : (
            <div className="prose-chat">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    if (inline) {
                      return <code className={className} {...props}>{children}</code>
                    }
                    return <CodeBlock className={className}>{children}</CodeBlock>
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {formatTime(message.timestamp)}
          </span>
          {message.model && !isUser && (
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                color: 'var(--text-muted)',
                background: 'var(--bg-tertiary)',
                fontSize: '10px',
              }}
            >
              {message.model}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
