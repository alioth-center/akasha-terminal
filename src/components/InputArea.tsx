import { FC, useState } from 'react'
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  InputAdornment,
  Divider,
} from '@mui/material'
import { Send, Delete, Save, Share } from '@mui/icons-material'

const InputArea: FC = () => {
  const [model, setModel] = useState('gpt-4')
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2000)
  const [input, setInput] = useState('')

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        borderRadius: 0,
      }}
    >
      <Divider />
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <FormControl size="small" sx={{ width: 160 }}>
          <InputLabel>模型</InputLabel>
          <Select
            value={model}
            label="模型"
            onChange={(e) => setModel(e.target.value)}
          >
            <MenuItem value="gpt-4">GPT-4</MenuItem>
            <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
            <MenuItem value="claude-3-opus">Claude 3 Opus</MenuItem>
            <MenuItem value="claude-3-sonnet">Claude 3 Sonnet</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" sx={{ width: 160 }}>
          <InputLabel>温度</InputLabel>
          <Select
            value={temperature}
            label="温度"
            onChange={(e) => setTemperature(Number(e.target.value))}
          >
            <MenuItem value={0.1}>0.1 - 精确</MenuItem>
            <MenuItem value={0.7}>0.7 - 平衡</MenuItem>
            <MenuItem value={1.0}>1.0 - 创造</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: 160 }}>
          <InputLabel>最大Token</InputLabel>
          <Select
            value={maxTokens}
            label="最大Token"
            onChange={(e) => setMaxTokens(Number(e.target.value))}
          >
            <MenuItem value={1000}>1000</MenuItem>
            <MenuItem value={2000}>2000</MenuItem>
            <MenuItem value={4000}>4000</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="清除对话">
            <IconButton size="small" onClick={() => {/* TODO */}}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="保存对话">
            <IconButton size="small" onClick={() => {/* TODO */}}>
              <Save />
            </IconButton>
          </Tooltip>
          <Tooltip title="分享对话">
            <IconButton size="small" onClick={() => {/* TODO */}}>
              <Share />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Box 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '150px',
        }}
      >
        <TextField
          multiline
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的消息..."
          variant="standard"
          sx={{ 
            flex: 1,
            display: 'flex',
            '& .MuiInputBase-root': {
              flex: 1,
              display: 'flex',
              padding: 2,
              alignItems: 'flex-start',
            },
            '& .MuiInputBase-input': {
              flex: 1,
              height: '100% !important',
              overflow: 'auto !important',
              resize: 'none',
            },
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end" sx={{ alignSelf: 'flex-end', position: 'absolute', right: 16, bottom: 16 }}>
                <Tooltip title="发送">
                  <Box component="span">
                    <IconButton
                      color="primary"
                      size="large"
                      disabled={!input.trim()}
                      onClick={() => {/* TODO: 实现发送逻辑 */}}
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                        '&.Mui-disabled': {
                          backgroundColor: 'action.disabledBackground',
                          color: 'action.disabled',
                        },
                      }}
                    >
                      <Send />
                    </IconButton>
                  </Box>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Paper>
  )
}

export default InputArea 