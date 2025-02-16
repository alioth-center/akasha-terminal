import { FC, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

interface UserProfile {
  avatar: string;
  username: string;
  email: string;
  bio: string;
  company: string;
  location: string;
  website: string;
}

const ProfileSettings: FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    avatar: '/avatar-placeholder.png',
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    bio: '热爱技术，专注于人工智能和机器学习领域。',
    company: 'Tech Company Inc.',
    location: '北京',
    website: 'https://example.com',
  });

  const handleChange = (field: keyof UserProfile) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        个人资料
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={profile.avatar}
              sx={{ width: 100, height: 100 }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: -4,
                right: -4,
                backgroundColor: 'background.paper',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
              size="small"
            >
              <PhotoCameraIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ ml: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              更改头像
            </Typography>
            <Typography variant="body2" color="text.secondary">
              支持 JPG, PNG 格式，文件大小不超过 2MB
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="用户名"
              value={profile.username}
              onChange={handleChange('username')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="电子邮箱"
              value={profile.email}
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="个人简介"
              value={profile.bio}
              onChange={handleChange('bio')}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="公司"
              value={profile.company}
              onChange={handleChange('company')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="所在地"
              value={profile.location}
              onChange={handleChange('location')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="个人网站"
              value={profile.website}
              onChange={handleChange('website')}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined">
            取消
          </Button>
          <Button variant="contained">
            保存更改
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          危险区域
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          删除账号后，所有数据将被永久删除且无法恢复。请谨慎操作。
        </Typography>
        <Button variant="outlined" color="error">
          删除账号
        </Button>
      </Paper>
    </Box>
  );
};

export default ProfileSettings; 