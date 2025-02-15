import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyButton } from './CopyButton'

interface Message {
  content: string;
}

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div className="py-4">
      <ReactMarkdown
        components={{
          code(props: any) {
            const { inline, className, children } = props
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
            return <code className={className}>{children}</code>
          }
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  )
} 