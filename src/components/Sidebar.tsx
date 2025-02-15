import { FC } from 'react'
import {
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material'
import {
  Book as BookIcon,
  NoteAlt as NoteIcon,
  Share as ShareIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material'

const Sidebar: FC = () => {
  return (
    <Box
      sx={{
        width: 72,
        height: '100%',
        backgroundColor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
      }}
    >
      {/* 用户头像 */}
      <Avatar
        sx={{
          width: 48,
          height: 48,
          mb: 2,
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          },
        }}
        alt="用户头像"
        src="/avatar-placeholder.png"
      />

      {/* 主要功能区 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Tooltip title="知识库" placement="right">
          <IconButton>
            <BookIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="笔记" placement="right">
          <IconButton>
            <NoteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="分享记录" placement="right">
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="快速上传" placement="right">
          <IconButton>
            <UploadIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flex: 1 }} />

      {/* 底部设置区 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Tooltip title="设置" placement="right">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="主题" placement="right">
          <IconButton>
            <DarkModeIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Sidebar 