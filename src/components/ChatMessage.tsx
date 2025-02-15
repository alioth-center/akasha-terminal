import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyButton } from './CopyButton'
import { Box } from '@mui/material'

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <Box
      sx={{
        py: 2,
        px: 4,
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          maxWidth: '80%',
          padding: 2,
          borderRadius: 2,
          backgroundColor: isUser ? '#177ddc' : '#2a2a2a',
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '& code': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '2px 4px',
            borderRadius: 1,
          },
          '& pre': {
            margin: '8px 0',
            '& > div': {
              backgroundColor: '#1e1e1e',
              border: 'none',
            },
          },
        }}
      >
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
      </Box>
    </Box>
  )
} 