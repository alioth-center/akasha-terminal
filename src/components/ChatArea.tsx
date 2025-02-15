import React, { FC } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const sampleMessages: Message[] = [
  {
    role: 'user',
    content: '你好，我需要帮助',
  },
  {
    role: 'assistant',
    content: '你好！我是 AI 助手，很高兴为你提供帮助。\n\n以下是我可以做的一些事情：\n\n- 回答问题\n- 编写代码\n- 解决问题',
  },
]

const ChatArea: FC = () => {
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
                maxWidth: '70%',
                backgroundColor: message.role === 'user' ? '#1976d2' : '#424242',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography
                component="div"
                sx={{
                  '& p': { m: 0 },
                  '& pre': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    p: 1,
                    borderRadius: 1,
                    overflowX: 'auto',
                  },
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

export default ChatArea 