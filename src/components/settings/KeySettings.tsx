import { FC, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: 'read' | 'write' | 'admin';
  createdAt: string;
  lastUsed: string;
}

const KeySettings: FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: '开发环境密钥',
      key: 'ak_dev_xxxxxxxxxxxxxxxxxxxx',
      type: 'write',
      createdAt: '2024-03-15',
      lastUsed: '2024-03-20',
    },
    {
      id: '2',
      name: '生产环境密钥',
      key: 'ak_prod_xxxxxxxxxxxxxxxxxxxx',
      type: 'admin',
      createdAt: '2024-03-10',
      lastUsed: '2024-03-19',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newKey, setNewKey] = useState<{
    name: string;
    type: 'read' | 'write' | 'admin';
  }>({
    name: '',
    type: 'read',
  });

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const handleDelete = (id: string) => {
    setKeys(keys.filter(key => key.id !== id));
  };

  const handleCreateKey = () => {
    const newApiKey: ApiKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: newKey.name,
      key: `ak_${newKey.type}_${Math.random().toString(36).substr(2, 20)}`,
      type: newKey.type,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: '-',
    };
    setKeys([...keys, newApiKey]);
    setOpenDialog(false);
    setNewKey({ name: '', type: 'read' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          密钥管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          创建新密钥
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>名称</TableCell>
                <TableCell>密钥</TableCell>
                <TableCell>类型</TableCell>
                <TableCell>创建时间</TableCell>
                <TableCell>最后使用</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>{key.name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {key.key}
                      <IconButton size="small" onClick={() => handleCopy(key.key)}>
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={key.type}
                      color={
                        key.type === 'admin'
                          ? 'error'
                          : key.type === 'write'
                          ? 'warning'
                          : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{key.createdAt}</TableCell>
                  <TableCell>{key.lastUsed}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(key.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>创建新密钥</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="密钥名称"
              fullWidth
              value={newKey.name}
              onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>密钥类型</InputLabel>
              <Select
                value={newKey.type}
                label="密钥类型"
                onChange={(e) => setNewKey({ ...newKey, type: e.target.value as 'read' | 'write' | 'admin' })}
              >
                <MenuItem value="read">只读密钥</MenuItem>
                <MenuItem value="write">读写密钥</MenuItem>
                <MenuItem value="admin">管理员密钥</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>取消</Button>
          <Button
            variant="contained"
            onClick={handleCreateKey}
            disabled={!newKey.name}
          >
            创建
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KeySettings; 