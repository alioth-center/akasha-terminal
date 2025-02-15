import { FC, useState, useEffect } from 'react'
import { Box, Paper, Typography, IconButton } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CheckIcon from '@mui/icons-material/Check'
import mermaid from 'mermaid'

interface Message {
  role: 'user' | 'assistant'
  content: string
  tokens?: number
}

const sampleMessages: Message[] = [
  {
    role: 'user',
    content: '请详细介绍一下Go语言在前后端分离项目中的应用，包括具体的代码示例、架构设计和性能优化',
    tokens: 35,
  },
  {
    role: 'assistant',
    content: `# Go语言在前后端分离项目中的应用

## 1. 项目架构

在现代前后端分离项目中，Go语言主要用于构建高性能的后端服务。下面是一个典型的项目架构：

\`\`\`mermaid
graph TD
    A[前端应用] -->|HTTP/WebSocket| B[API Gateway]
    B --> C[认证服务]
    B --> D[业务服务]
    B --> E[数据服务]
    C --> F[(Redis)]
    D --> G[(MySQL)]
    E --> H[(MongoDB)]
\`\`\`

## 2. 后端实现示例

### 2.1 项目结构

\`\`\`
├── cmd
│   └── server
│       └── main.go
├── internal
│   ├── api
│   │   └── handler.go
│   ├── config
│   │   └── config.go
│   ├── model
│   │   └── user.go
│   └── service
│       └── user.go
├── pkg
│   ├── middleware
│   │   └── auth.go
│   └── utils
│       └── response.go
└── go.mod
\`\`\`

### 2.2 核心代码示例

\`\`\`go
// internal/model/user.go
package model

import (
    "time"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Username string \`gorm:"uniqueIndex;size:32" json:"username"\`
    Password string \`gorm:"size:128" json:"-"\`
    Email    string \`gorm:"size:128" json:"email"\`
    Role     string \`gorm:"size:16" json:"role"\`
}

// internal/service/user.go
package service

import (
    "context"
    "errors"
    "golang.org/x/crypto/bcrypt"
    "your-project/internal/model"
)

type UserService struct {
    db *gorm.DB
}

func (s *UserService) CreateUser(ctx context.Context, user *model.User) error {
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    user.Password = string(hashedPassword)
    return s.db.Create(user).Error
}

// internal/api/handler.go
package api

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "your-project/internal/service"
)

type UserHandler struct {
    userService *service.UserService
}

func (h *UserHandler) CreateUser(c *gin.Context) {
    var user model.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    if err := h.userService.CreateUser(c.Request.Context(), &user); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusCreated, user)
}
\`\`\`

## 3. 性能优化

### 3.1 数据库查询优化

在处理大量数据时，需要注意查询性能。以下是一个分页查询的示例：

\`\`\`go
func (s *UserService) ListUsers(ctx context.Context, page, size int) ([]*model.User, int64, error) {
    var users []*model.User
    var total int64
    
    offset := (page - 1) * size
    
    // 使用 SELECT COUNT(*) 获取总数
    if err := s.db.Model(&model.User{}).Count(&total).Error; err != nil {
        return nil, 0, err
    }
    
    // 使用索引和限制查询数量优化性能
    if err := s.db.Offset(offset).Limit(size).Find(&users).Error; err != nil {
        return nil, 0, err
    }
    
    return users, total, nil
}
\`\`\`

### 3.2 缓存策略

使用 Redis 实现多级缓存：

\`\`\`go
type CacheService struct {
    redis *redis.Client
}

func (s *CacheService) GetUserWithCache(ctx context.Context, userID uint) (*model.User, error) {
    // 1. 尝试从 Redis 获取
    key := fmt.Sprintf("user:%d", userID)
    if data, err := s.redis.Get(ctx, key).Result(); err == nil {
        var user model.User
        if err := json.Unmarshal([]byte(data), &user); err == nil {
            return &user, nil
        }
    }
    
    // 2. Redis 未命中，从数据库获取
    var user model.User
    if err := s.db.First(&user, userID).Error; err != nil {
        return nil, err
    }
    
    // 3. 写入 Redis 缓存
    if data, err := json.Marshal(user); err == nil {
        s.redis.Set(ctx, key, data, 30*time.Minute)
    }
    
    return &user, nil
}
\`\`\`

## 4. 性能测试结果

以下是使用 Apache Benchmark 进行的性能测试结果：

\`\`\`
Document Path:          /api/v1/users
Document Length:        1240 bytes

Concurrency Level:      100
Time taken for tests:   12.582 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      13400000 bytes
HTML transferred:       12400000 bytes
Requests per second:    794.78 [#/sec] (mean)
Time per request:       125.821 [ms] (mean)
Time per request:       1.258 [ms] (mean, across all concurrent requests)
Transfer rate:          1040.53 [Kbytes/sec] received
\`\`\`

## 5. 数学公式示例

在数据处理中，我们经常需要使用一些数学公式。例如，在实现限流算法时使用的令牌桶算法：

令牌生成速率 R，令牌桶容量 B，当前令牌数 T，时间间隔 Δt

$T(t + Δt) = min(B, T(t) + R × Δt)$

请求到达时，如果 T > 0，则允许请求通过，并消耗一个令牌：

$T = T - 1$

## 6. 监控指标

服务运行时的关键监控指标：

| 指标名称 | 说明 | 警告阈值 | 严重阈值 |
|---------|------|---------|---------|
| CPU使用率 | 服务器CPU使用百分比 | 70% | 90% |
| 内存使用率 | 服务器内存使用百分比 | 80% | 95% |
| 请求延迟 | API请求的95分位延迟 | 200ms | 500ms |
| 错误率 | 请求错误百分比 | 1% | 5% |
| QPS | 每秒请求数 | 1000 | 2000 |

这些监控指标可以通过 Prometheus + Grafana 进行收集和可视化展示。`,
    tokens: 2890,
  }
]

interface CodeBlockProps {
  language: string
  value: string
  style?: any
}

const CodeBlock: FC<CodeBlockProps> = ({ language, value, style }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  return (
    <Box sx={{ position: 'relative', my: 1 }}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 0.75,
            borderBottom: isExpanded ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          }}
        >
          {language && (
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {capitalizeFirstLetter(language)}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 0.5, ml: 'auto' }}>
            <IconButton 
              size="small" 
              onClick={handleCopy} 
              sx={{ 
                p: 0.5,
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {isCopied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{ 
                p: 0.5,
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </IconButton>
          </Box>
        </Box>
        {isExpanded && (
          <SyntaxHighlighter
            language={language}
            style={style || vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1em',
              backgroundColor: 'transparent',
              fontSize: '0.85em',
            }}
          >
            {value}
          </SyntaxHighlighter>
        )}
      </Box>
    </Box>
  )
}

interface ChatAreaProps {
  displayMode: 'bubble' | 'document'
}

const ChatArea: FC<ChatAreaProps> = ({ displayMode }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: displayMode === 'bubble' ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'monospace',
    })
    mermaid.contentLoaded()
  }, [displayMode])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const commonMarkdownStyles = {
    '& .mermaid': {
      textAlign: 'center',
      backgroundColor: 'background.default',
      padding: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'divider',
      '& svg': {
        maxWidth: '100%',
        height: 'auto',
      },
    },
    '& .math-display': {
        overflow: 'auto',
      padding: '0.5em 0',
    },
  }

  const renderBubbleMode = () => (
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
                ...commonMarkdownStyles,
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
                }}
              >
                <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                  components={{
                    code({ inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '')
                      const code = String(children).replace(/\n$/, '')
                      
                    if (match && match[1] === 'mermaid') {
                      return <div className="mermaid">{code}</div>
                    }
                    
                    if (!inline) {
                        return (
                        <CodeBlock
                          language={match ? match[1] : ''}
                          value={code}
                          style={match ? {
                            ...vscDarkPlus,
                            'pre[class*="language-"]': {
                              ...vscDarkPlus['pre[class*="language-"]'],
                              background: 'transparent',
                            },
                          } : undefined}
                        />
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
  )

  const renderDocumentMode = () => (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      {sampleMessages.map((message, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            mb: 2,
            color: 'text.primary',
            borderBottom: '1px solid',
            borderColor: 'divider',
            pb: 1
          }}>
            <Typography variant="body2">
              {message.role === 'user' ? '用户' : 'AI助手'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {message.tokens} tokens
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Typography
              variant="caption"
              sx={{
                cursor: 'pointer',
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
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
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
                onClick={() => {/* TODO: 实现重新生成逻辑 */}}
              >
                重新生成
              </Typography>
            )}
          </Box>
          <Box sx={{
            color: 'text.primary',
            ...commonMarkdownStyles,
            '& p': { m: 0, lineHeight: 1.6 },
            '& h1': { 
              fontSize: '1.75rem',
              fontWeight: 500,
              mt: 2,
              mb: 3,
              color: 'text.primary',
            },
            '& h2': { 
              fontSize: '1.5rem',
              fontWeight: 500,
              mt: 4,
              mb: 2,
              color: 'text.primary',
            },
            '& h3': { 
              fontSize: '1.25rem',
              fontWeight: 500,
              mt: 3,
              mb: 2,
              color: 'text.primary',
            },
            '& h4, & h5, & h6': { 
              fontSize: '1.1rem',
              fontWeight: 500,
              mt: 2,
              mb: 1,
              color: 'text.primary',
            },
            '& pre': {
              m: '1em 0',
              p: '1em',
              borderRadius: 1,
              backgroundColor: 'background.default',
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'auto',
            },
            '& code': {
              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
              fontSize: '0.9em',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              backgroundColor: 'background.default',
              border: '1px solid',
              borderColor: 'divider',
            },
            '& pre code': {
              padding: 0,
              border: 'none',
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
            },
            '& table': {
              width: '100%',
              my: 2,
              borderCollapse: 'collapse',
            },
            '& th, & td': {
              border: '1px solid',
              borderColor: 'divider',
              padding: '0.75em',
              textAlign: 'left',
            },
            '& th': {
              backgroundColor: 'background.default',
            },
            '& blockquote': {
              borderLeft: '4px solid',
              borderColor: 'divider',
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
          }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                code({ inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '')
                  const code = String(children).replace(/\n$/, '')
                  
                  if (match && match[1] === 'mermaid') {
                    return <div className="mermaid">{code}</div>
                  }
                  
                  if (!inline) {
                    return (
                      <CodeBlock
                        language={match ? match[1] : ''}
                        value={code}
                        style={match ? {
                          ...vscDarkPlus,
                          'pre[class*="language-"]': {
                            ...vscDarkPlus['pre[class*="language-"]'],
                            background: 'transparent',
                          },
                        } : undefined}
                      />
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
        </Box>
      ))}
    </Box>
  )

  return (
    <Paper
      sx={{
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'background.paper',
        borderRadius: 0,
        position: 'relative',
      }}
    >
      {displayMode === 'bubble' ? renderBubbleMode() : renderDocumentMode()}
    </Paper>
  )
}

export default ChatArea 