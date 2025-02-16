import { FC, ReactNode } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Paper,
  Typography,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  VpnKey as KeyIcon,
  History as HistoryIcon,
  SmartToy as ModelIcon,
  Receipt as BillingIcon,
} from '@mui/icons-material';

// 定义设置页面的类型
type SettingPage = 'profile' | 'keys' | 'history' | 'models' | 'billing';

interface UserSettingsProps {
  onPageChange: (page: SettingPage) => void;
  currentPage: SettingPage;
  children: ReactNode;
}

const UserSettings: FC<UserSettingsProps> = ({ onPageChange, currentPage, children }) => {
  const menuItems = [
    { id: 'profile', label: '用户资料', icon: <PersonIcon /> },
    { id: 'keys', label: '密钥管理', icon: <KeyIcon /> },
    { id: 'history', label: '请求历史', icon: <HistoryIcon /> },
    { id: 'models', label: '模型清单', icon: <ModelIcon /> },
    { id: 'billing', label: '费用账单', icon: <BillingIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* 左侧导航栏 */}
      <Paper
        sx={{
          width: 240,
          height: '100%',
          borderRadius: 0,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            用户设置
          </Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={currentPage === item.id}
                onClick={() => onPageChange(item.id as SettingPage)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* 主要内容区域 */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};

export default UserSettings; 