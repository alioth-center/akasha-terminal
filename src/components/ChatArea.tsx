import { FC } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  role: 'user' | 'assistant'
  content: string
  tokens?: number
}

const sampleMessages: Message[] = [
  {
    role: 'user',
    content: '请详细介绍一下现代前端开发中常用的工具和最佳实践',
    tokens: 23,
  },
  {
    role: 'assistant',
    content: `# 现代前端开发工具和最佳实践指南

现代前端开发已经发展成为一个复杂而成熟的生态系统。以下是一些核心工具和最佳实践的详细介绍：

## 1. 开发环境配置

### 1.1 包管理器
主流的包管理器包括：
- **npm**: Node.js 默认的包管理器
- **yarn**: Facebook 开发的替代品，提供更好的性能和可靠性
- **pnpm**: 新一代包管理器，通过硬链接共享依赖，节省磁盘空间

### 1.2 开发工具
推荐使用以下工具提升开发效率：
- **VS Code**: 最流行的代码编辑器，具有丰富的插件生态
- **WebStorm**: 功能强大的专业 IDE
- **Cursor**: 新一代 AI 驱动的编辑器`,
    tokens: 1205,
  }
]

const ChatArea: FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Paper
      sx={{
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'background.paper',
        borderRadius: 0,
      }}
    >
      <Box sx={{ p: 2 }}>
        {sampleMessages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: '85%',
                backgroundColor: message.role === 'user' ? '#1976d2' : '#424242',
                borderRadius: 2,
                p: 2,
                color: '#fff',
              }}
            >
              <Box
                sx={{
                  '& p': { m: 0 },
                  '& h1': { 
                    fontSize: '1.5rem',
                    mt: 1,
                    mb: 2,
                    fontWeight: 600,
                  },
                  '& h2': { 
                    fontSize: '1.25rem',
                    mt: 2,
                    mb: 1,
                    fontWeight: 600,
                  },
                  '& h3': { 
                    fontSize: '1.1rem',
                    mt: 1.5,
                    mb: 1,
                    fontWeight: 600,
                  },
                  '& h4, & h5, & h6': { 
                    fontSize: '1rem',
                    mt: 1,
                    mb: 0.5,
                    fontWeight: 600,
                  },
                  '& pre': {
                    m: '1em 0',
                    p: '1em',
                    borderRadius: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    overflow: 'auto',
                  },
                  '& code': {
                    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    fontSize: '0.9em',
                    padding: '0.2em 0.4em',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  },
                  '& pre code': {
                    padding: 0,
                    backgroundColor: 'transparent',
                  },
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                  },
                  '& table': {
                    borderCollapse: 'collapse',
                    width: '100%',
                    my: 2,
                  },
                  '& th, & td': {
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '0.5em',
                  },
                  '& blockquote': {
                    borderLeft: '4px solid rgba(255, 255, 255, 0.2)',
                    m: '1em 0',
                    pl: 2,
                    py: 0.5,
                  },
                  '& ul, & ol': {
                    pl: 3,
                    m: '0.5em 0',
                  },
                  '& li': {
                    mb: '0.25em',
                  },
                  '& li:last-child': {
                    mb: 0,
                  },
                  '& strong': {
                    color: '#fff',
                  },
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '')
                      const code = String(children).replace(/\n$/, '')
                      
                      if (!inline && match) {
                        return (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: 4,
                              padding: '1em',
                            }}
                            {...props}
                          >
                            {code}
                          </SyntaxHighlighter>
                        )
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </Box>
              <Box 
                sx={{ 
                  mt: 1, 
                  pt: 1, 
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.75rem',
                }}
              >
                <Typography variant="caption">
                  {message.tokens} tokens
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { color: 'white' },
                    }}
                    onClick={() => copyToClipboard(message.content)}
                  >
                    复制
                  </Typography>
                  {message.role === 'assistant' && (
                    <Typography
                      variant="caption"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { color: 'white' },
                      }}
                      onClick={() => {/* TODO: 实现重新生成逻辑 */}}
                    >
                      重新生成
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

export default ChatArea 