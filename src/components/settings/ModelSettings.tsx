import { FC, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Info as InfoIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface Model {
  id: string;
  name: string;
  provider: string;
  version: string;
  type: 'chat' | 'completion' | 'embedding';
  status: 'active' | 'inactive';
  contextLength: number;
  costPer1kTokens: number;
  features: string[];
}

const ModelSettings: FC = () => {
  const [models, setModels] = useState<Model[]>([
    {
      id: '1',
      name: 'GPT-4',
      provider: 'OpenAI',
      version: '0.1.0',
      type: 'chat',
      status: 'active',
      contextLength: 8192,
      costPer1kTokens: 0.03,
      features: ['代码生成', '自然语言理解', '多语言支持'],
    },
    {
      id: '2',
      name: 'Claude-3 Opus',
      provider: 'Anthropic',
      version: '1.0.0',
      type: 'chat',
      status: 'active',
      contextLength: 16384,
      costPer1kTokens: 0.04,
      features: ['代码生成', '数学推理', '长文本处理'],
    },
    {
      id: '3',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      version: '0.1.0',
      type: 'chat',
      status: 'inactive',
      contextLength: 4096,
      costPer1kTokens: 0.002,
      features: ['基础对话', '文本生成'],
    },
    {
      id: '4',
      name: 'Text Embedding',
      provider: 'OpenAI',
      version: '3.0.0',
      type: 'embedding',
      status: 'active',
      contextLength: 8191,
      costPer1kTokens: 0.0001,
      features: ['文本嵌入', '相似度计算'],
    },
  ]);

  const [openSettings, setOpenSettings] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const handleStatusChange = (modelId: string) => {
    setModels(models.map(model => {
      if (model.id === modelId) {
        return {
          ...model,
          status: model.status === 'active' ? 'inactive' : 'active',
        };
      }
      return model;
    }));
  };

  const openModelSettings = (model: Model) => {
    setSelectedModel(model);
    setOpenSettings(true);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        模型清单
      </Typography>

      <Grid container spacing={3}>
        {models.map((model) => (
          <Grid item xs={12} md={6} key={model.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" component="div">
                      {model.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {model.provider} · v{model.version}
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={model.status === 'active'}
                        onChange={() => handleStatusChange(model.id)}
                        color="primary"
                      />
                    }
                    label={model.status === 'active' ? '已启用' : '已禁用'}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={model.type}
                    size="small"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`${model.contextLength.toLocaleString()} tokens`}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`$${model.costPer1kTokens}/1k tokens`}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  功能特性：
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {model.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Tooltip title="查看详情">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="模型设置">
                  <IconButton
                    size="small"
                    onClick={() => openModelSettings(model)}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          模型设置 - {selectedModel?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="最大上下文长度"
              type="number"
              value={selectedModel?.contextLength}
              fullWidth
            />
            <TextField
              label="每千Token成本"
              type="number"
              value={selectedModel?.costPer1kTokens}
              fullWidth
            />
            <TextField
              label="API端点"
              value="https://api.example.com/v1/chat"
              fullWidth
            />
            <TextField
              label="超时设置(秒)"
              type="number"
              value={30}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettings(false)}>
            取消
          </Button>
          <Button variant="contained" onClick={() => setOpenSettings(false)}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModelSettings; 