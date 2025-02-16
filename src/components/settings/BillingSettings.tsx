import { FC, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

interface BillingData {
  currentPlan: string;
  usageLimit: number;
  currentUsage: number;
  billingCycle: string;
  nextBillingDate: string;
  invoices: Invoice[];
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  items: {
    model: string;
    usage: number;
    cost: number;
  }[];
}

const BillingSettings: FC = () => {
  const [billingPeriod, setBillingPeriod] = useState('current');
  
  const billingData: BillingData = {
    currentPlan: '专业版',
    usageLimit: 1000,
    currentUsage: 650,
    billingCycle: '月付',
    nextBillingDate: '2024-04-20',
    invoices: [
      {
        id: 'INV-001',
        date: '2024-03-20',
        amount: 299.99,
        status: 'paid',
        items: [
          { model: 'GPT-4', usage: 250000, cost: 150.00 },
          { model: 'Claude-3', usage: 180000, cost: 149.99 },
        ],
      },
      {
        id: 'INV-002',
        date: '2024-02-20',
        amount: 199.50,
        status: 'paid',
        items: [
          { model: 'GPT-4', usage: 150000, cost: 120.00 },
          { model: 'GPT-3.5', usage: 500000, cost: 79.50 },
        ],
      },
    ],
  };

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const usagePercentage = (billingData.currentUsage / billingData.usageLimit) * 100;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        费用账单
      </Typography>

      <Grid container spacing={3}>
        {/* 当前计划信息 */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {billingData.currentPlan}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    账单周期：{billingData.billingCycle} · 下次续费日期：{billingData.nextBillingDate}
                  </Typography>
                </Box>
                <Button variant="contained" color="primary">
                  升级计划
                </Button>
              </Box>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                本月使用额度
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={usagePercentage}
                    color={usagePercentage > 90 ? 'error' : usagePercentage > 70 ? 'warning' : 'primary'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="body2">
                  {billingData.currentUsage.toLocaleString()} / {billingData.usageLimit.toLocaleString()} 积分
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 快速操作 */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                快速操作
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="outlined" fullWidth>
                  购买额外积分
                </Button>
                <Button variant="outlined" fullWidth>
                  导出账单
                </Button>
                <Button variant="outlined" fullWidth>
                  管理支付方式
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 账单历史 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                账单历史
              </Typography>
              <FormControl sx={{ width: 200 }}>
                <InputLabel>账单周期</InputLabel>
                <Select
                  value={billingPeriod}
                  label="账单周期"
                  onChange={(e) => setBillingPeriod(e.target.value)}
                >
                  <MenuItem value="current">当前周期</MenuItem>
                  <MenuItem value="last">上个周期</MenuItem>
                  <MenuItem value="last3">最近3个月</MenuItem>
                  <MenuItem value="last6">最近6个月</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>账单编号</TableCell>
                    <TableCell>日期</TableCell>
                    <TableCell>金额</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billingData.invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
                          color={getStatusColor(invoice.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button size="small">
                          查看详情
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillingSettings; 