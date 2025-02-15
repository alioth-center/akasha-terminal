import React, { FC } from 'react'
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material'
import { Delete } from '@mui/icons-material'

interface Conversation {
  id: string
  title: string
  date: string
}

const sampleConversations: Conversation[] = [
  {
    id: '1',
    title: '关于项目架构的讨论',
    date: '2024-02-15',
  },
  {
    id: '2',
    title: '代码优化建议',
    date: '2024-02-14',
  },
  {
    id: '3',
    title: 'Bug修复方案',
    date: '2024-02-13',
  },
]

const ConversationHistory: FC = () => {
  return (
    <Paper
      sx={{
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'background.paper',
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1">对话历史</Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {sampleConversations.map((conversation) => (
          <ListItem
            key={conversation.id}
            secondaryAction={
              <IconButton edge="end" size="small">
                <Delete fontSize="small" />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText
                primary={conversation.title}
                secondary={conversation.date}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ConversationHistory 