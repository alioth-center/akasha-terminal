import React, { FC, useState } from 'react'
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Typography,
  Button,
} from '@mui/material'
import { Send } from '@mui/icons-material'

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
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
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
        </Box>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography gutterBottom>Temperature</Typography>
            <Slider
              value={temperature}
              onChange={(_, value) => setTemperature(value as number)}
              min={0}
              max={2}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography gutterBottom>Max Tokens</Typography>
            <Slider
              value={maxTokens}
              onChange={(_, value) => setMaxTokens(value as number)}
              min={100}
              max={4000}
              step={100}
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TextField
          multiline
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的消息..."
          sx={{ flex: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            endIcon={<Send />}
            disabled={!input.trim()}
          >
            发送
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default InputArea 