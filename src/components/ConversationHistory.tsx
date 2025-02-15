import { FC } from 'react'
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
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Conversation {
  id: string
  title: string
  timestamp: Date
}

const sampleConversations: Conversation[] = [
  {
    id: '1',
    title: '现代前端开发工具和最佳实践',
    timestamp: new Date('2024-02-15T23:52:30'),
  },
  {
    id: '2',
    title: '代码优化建议',
    timestamp: new Date('2024-02-15T22:45:15'),
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
                secondary={format(conversation.timestamp, 'yyyy-MM-dd HH:mm:ss', { locale: zhCN })}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  sx: { opacity: 0.7 },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ConversationHistory 