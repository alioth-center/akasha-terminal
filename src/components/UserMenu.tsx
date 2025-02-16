import { FC } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
  alpha,
} from '@mui/material';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpIcon,
  Info as InfoIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onSettingsClick: () => void;
}

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

const userInfo: UserInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/avatar-placeholder.png',
  role: '社区版用户',
};

const UserMenu: FC<UserMenuProps> = ({
  anchorEl,
  open,
  onClose,
  onSettingsClick,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClose}
      transformOrigin={{ horizontal: 'center', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 320,
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(8px)',
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: '7%',
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      {/* 用户信息区域 */}
      <Box sx={{ px: 2, py: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar
            src={userInfo.avatar}
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" noWrap>
              {userInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {userInfo.email}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            px: 1.5,
            py: 0.75,
            bgcolor: 'action.selected',
            borderRadius: 1,
          }}
        >
          {userInfo.role}
        </Typography>
      </Box>

      <Divider />

      {/* 设置选项 */}
      <MenuItem onClick={onSettingsClick}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        个人设置
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        应用设置
      </MenuItem>

      <Divider />

      {/* 导入导出 */}
      <MenuItem>
        <ListItemIcon>
          <UploadIcon fontSize="small" />
        </ListItemIcon>
        导入配置
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <DownloadIcon fontSize="small" />
        </ListItemIcon>
        导出配置
      </MenuItem>

      <Divider />

      {/* 帮助和关于 */}
      <MenuItem>
        <ListItemIcon>
          <HelpIcon fontSize="small" />
        </ListItemIcon>
        帮助中心
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <InfoIcon fontSize="small" />
        </ListItemIcon>
        关于软件
      </MenuItem>

      {/* 版权信息 */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          玉衡天枢提供技术支持
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Version 1.0.0
        </Typography>
      </Box>
    </Menu>
  );
};

export default UserMenu; 