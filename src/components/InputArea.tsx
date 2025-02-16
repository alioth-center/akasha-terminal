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
  useTheme,
  useMediaQuery,
  Typography,
  Slide,
} from '@mui/material'
import {
  Send,
  Delete,
  Save,
  Share,
  SmartToy as ModelIcon,
  Thermostat as TempIcon,
  Token as TokenIcon,
  Forum as ContextIcon,
  Translate as LangIcon,
  Fullscreen,
  FullscreenExit,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material'

interface InputAreaProps {
  isFullscreen?: boolean;
  onFullscreenToggle?: (isFullscreen: boolean) => void;
}

const InputArea: FC<InputAreaProps> = ({ isFullscreen = false, onFullscreenToggle }) => {
  const [model, setModel] = useState('gpt-4')
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2000)
  const [maxContext, setMaxContext] = useState(10)
  const [outputLanguage, setOutputLanguage] = useState('zh')
  const [input, setInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(true)
  
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const handleFullscreenToggle = () => {
    onFullscreenToggle?.(!isFullscreen);
  };

  const renderFullControls = () => (
    <>
      <FormControl size="small" sx={{ width: 200 }}>
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
      
      <FormControl size="small" sx={{ width: 120 }}>
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

      <FormControl size="small" sx={{ width: 120 }}>
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

      <FormControl size="small" sx={{ width: 120 }}>
        <InputLabel>上下文数量</InputLabel>
        <Select
          value={maxContext}
          label="上下文数量"
          onChange={(e) => setMaxContext(Number(e.target.value))}
        >
          <MenuItem value={5}>5条</MenuItem>
          <MenuItem value={10}>10条</MenuItem>
          <MenuItem value={20}>20条</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ width: 120 }}>
        <InputLabel>输出语言</InputLabel>
        <Select
          value={outputLanguage}
          label="输出语言"
          onChange={(e) => setOutputLanguage(e.target.value)}
        >
          <MenuItem value="zh">中文</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ja">日本語</MenuItem>
        </Select>
      </FormControl>
    </>
  )

  const renderIconControls = () => (
    <>
      <Tooltip title="模型">
        <FormControl size="small" sx={{ width: 'auto' }}>
          <Select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            IconComponent={ModelIcon}
            variant="standard"
            sx={{
              '& .MuiSelect-select': {
                display: 'none',
              },
              '& .MuiSelect-icon': {
                position: 'static',
                marginRight: 0,
              },
            }}
          >
            <MenuItem value="gpt-4">GPT-4</MenuItem>
            <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
            <MenuItem value="claude-3-opus">Claude 3 Opus</MenuItem>
            <MenuItem value="claude-3-sonnet">Claude 3 Sonnet</MenuItem>
          </Select>
        </FormControl>
      </Tooltip>

      <Tooltip title="温度">
        <FormControl size="small" sx={{ width: 'auto' }}>
          <Select
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            IconComponent={TempIcon}
            variant="standard"
            sx={{
              '& .MuiSelect-select': {
                display: 'none',
              },
              '& .MuiSelect-icon': {
                position: 'static',
                marginRight: 0,
              },
            }}
          >
            <MenuItem value={0.1}>0.1 - 精确</MenuItem>
            <MenuItem value={0.7}>0.7 - 平衡</MenuItem>
            <MenuItem value={1.0}>1.0 - 创造</MenuItem>
          </Select>
        </FormControl>
      </Tooltip>

      <Tooltip title="最大Token">
        <FormControl size="small" sx={{ width: 'auto' }}>
          <Select
            value={maxTokens}
            onChange={(e) => setMaxTokens(Number(e.target.value))}
            IconComponent={TokenIcon}
            variant="standard"
            sx={{
              '& .MuiSelect-select': {
                display: 'none',
              },
              '& .MuiSelect-icon': {
                position: 'static',
                marginRight: 0,
              },
            }}
          >
            <MenuItem value={1000}>1000</MenuItem>
            <MenuItem value={2000}>2000</MenuItem>
            <MenuItem value={4000}>4000</MenuItem>
          </Select>
        </FormControl>
      </Tooltip>

      <Tooltip title="上下文数量">
        <FormControl size="small" sx={{ width: 'auto' }}>
          <Select
            value={maxContext}
            onChange={(e) => setMaxContext(Number(e.target.value))}
            IconComponent={ContextIcon}
            variant="standard"
            sx={{
              '& .MuiSelect-select': {
                display: 'none',
              },
              '& .MuiSelect-icon': {
                position: 'static',
                marginRight: 0,
              },
            }}
          >
            <MenuItem value={5}>5条</MenuItem>
            <MenuItem value={10}>10条</MenuItem>
            <MenuItem value={20}>20条</MenuItem>
          </Select>
        </FormControl>
      </Tooltip>

      <Tooltip title="输出语言">
        <FormControl size="small" sx={{ width: 'auto' }}>
          <Select
            value={outputLanguage}
            onChange={(e) => setOutputLanguage(e.target.value)}
            IconComponent={LangIcon}
            variant="standard"
            sx={{
              '& .MuiSelect-select': {
                display: 'none',
              },
              '& .MuiSelect-icon': {
                position: 'static',
                marginRight: 0,
              },
            }}
          >
            <MenuItem value="zh">中文</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ja">日本語</MenuItem>
          </Select>
        </FormControl>
      </Tooltip>
    </>
  )

  return (
    <Slide 
      direction={isFullscreen ? "up" : "down"} 
      in={true} 
      timeout={300}
    >
      <Paper
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          borderRadius: 0,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -32,
            right: 16,
            display: 'flex',
            gap: 0.5,
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            px: 1,
            py: 0.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            输入区域
          </Typography>
          <IconButton
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
              p: 0.5,
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        </Box>

        {isExpanded && (
          <>
            <Divider />
            <Box 
              sx={{ 
                p: 2, 
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              {isSmallScreen ? renderIconControls() : renderFullControls()}

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
                <Tooltip title={isFullscreen ? "退出全屏" : "全屏编辑"}>
                  <IconButton
                    size="small"
                    onClick={handleFullscreenToggle}
                  >
                    {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </>
        )}
        
        <Box 
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            minHeight: isExpanded ? '150px' : '60px',
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
    </Slide>
  )
}

export default InputArea 