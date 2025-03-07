import { FC, useState } from 'react'
import {
  Box,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Book as BookIcon,
  NoteAlt as NoteIcon,
  Share as ShareIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  ChatBubble as ChatBubbleIcon,
  Article as ArticleIcon,
} from '@mui/icons-material'
import UserMenu from './UserMenu'

interface SidebarProps {
  displayMode: 'bubble' | 'document'
  onDisplayModeChange: (mode: 'bubble' | 'document') => void
  currentView: 'chat' | 'settings'
  onViewChange: (view: 'chat' | 'settings') => void
}

const Sidebar: FC<SidebarProps> = ({
  displayMode,
  onDisplayModeChange,
  currentView,
  onViewChange,
}) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSettingsClick = () => {
    onViewChange('settings');
    handleUserMenuClose();
  };

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
        onClick={handleUserMenuOpen}
      />

      <UserMenu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        onSettingsClick={handleSettingsClick}
      />

      {/* 主要功能区 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Tooltip title="聊天" placement="right">
          <IconButton
            onClick={() => onViewChange('chat')}
            color={currentView === 'chat' ? 'primary' : 'default'}
          >
            <ChatBubbleIcon />
          </IconButton>
        </Tooltip>
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
        <Tooltip title="切换显示模式" placement="right">
          <IconButton onClick={() => onDisplayModeChange(displayMode === 'bubble' ? 'document' : 'bubble')}>
            {displayMode === 'bubble' ? <ChatBubbleIcon /> : <ArticleIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="设置" placement="right">
          <IconButton
            onClick={() => onViewChange('settings')}
            color={currentView === 'settings' ? 'primary' : 'default'}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Sidebar 