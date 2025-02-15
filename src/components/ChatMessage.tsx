import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyButton } from './CopyButton'

export function ChatMessage({ message }) {
  return (
    <div className="py-4">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            if (!inline) {
              return (
                <div className="relative group">
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    PreTag="div"
                    className="rounded-md"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                  <CopyButton
                    text={String(children)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                  />
                </div>
              )
            }
            return <code className={className} {...props}>{children}</code>
          }
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  )
} 