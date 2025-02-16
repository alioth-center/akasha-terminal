import { FC, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  Info as InfoIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';

interface RequestHistory {
  id: string;
  timestamp: string;
  model: string;
  type: string;
  status: 'success' | 'error' | 'pending';
  tokens: number;
  duration: number;
  cost: number;
}

const HistorySettings: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('7d');
  const [page, setPage] = useState(1);

  const history: RequestHistory[] = [
    {
      id: '1',
      timestamp: '2024-03-20 14:30:25',
      model: 'GPT-4',
      type: '对话',
      status: 'success',
      tokens: 1250,
      duration: 2.5,
      cost: 0.25,
    },
    {
      id: '2',
      timestamp: '2024-03-20 13:15:10',
      model: 'Claude-3',
      type: '代码生成',
      status: 'success',
      tokens: 3500,
      duration: 4.2,
      cost: 0.45,
    },
    {
      id: '3',
      timestamp: '2024-03-20 12:45:33',
      model: 'GPT-3.5',
      type: '文本分析',
      status: 'error',
      tokens: 800,
      duration: 1.8,
      cost: 0.08,
    },
    {
      id: '4',
      timestamp: '2024-03-20 11:20:15',
      model: 'Claude-3',
      type: '对话',
      status: 'pending',
      tokens: 2100,
      duration: 3.1,
      cost: 0.32,
    },
  ];

  const getStatusColor = (status: RequestHistory['status']) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        请求历史
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="搜索请求..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ width: 200 }}>
          <InputLabel>时间范围</InputLabel>
          <Select
            value={timeRange}
            label="时间范围"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="24h">最近24小时</MenuItem>
            <MenuItem value="7d">最近7天</MenuItem>
            <MenuItem value="30d">最近30天</MenuItem>
            <MenuItem value="90d">最近90天</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>时间</TableCell>
                <TableCell>模型</TableCell>
                <TableCell>类型</TableCell>
                <TableCell>状态</TableCell>
                <TableCell>Token数</TableCell>
                <TableCell>耗时(秒)</TableCell>
                <TableCell>费用($)</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{item.tokens.toLocaleString()}</TableCell>
                  <TableCell>{item.duration.toFixed(1)}</TableCell>
                  <TableCell>${item.cost.toFixed(3)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="详情">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="在对话中打开">
                      <IconButton size="small">
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2}>
          <Pagination
            count={10}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default HistorySettings; 