import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import WorkflowList from './components/WorkflowList'
import ChatArea from './components/ChatArea'
import InputArea from './components/InputArea'
import ConversationHistory from './components/ConversationHistory'
import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1a1a',
      paper: '#252525',
    },
    primary: {
      main: '#177ddc',
      dark: '#1668dc',
    },
    grey: {
      800: '#2d2d2d',
      900: '#1f1f1f',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
});

function App() {
  const [isInputFullscreen, setIsInputFullscreen] = useState(false)
  const [displayMode, setDisplayMode] = useState<'bubble' | 'document'>('bubble')

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app-container">
        <Sidebar 
          displayMode={displayMode}
          onDisplayModeChange={setDisplayMode}
        />
        <PanelGroup direction="horizontal">
          {/* 左侧工作流列表 */}
          <Panel defaultSize={20} minSize={15}>
            <WorkflowList />
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* 中间工作区 */}
          <Panel>
            <PanelGroup direction="vertical">
              {/* 聊天区域 */}
              <Panel 
                defaultSize={70} 
                minSize={30}
                style={{
                  display: isInputFullscreen ? 'none' : 'block',
                  height: isInputFullscreen ? '0' : 'auto'
                }}
              >
                <ChatArea displayMode={displayMode} />
              </Panel>

              {isInputFullscreen ? null : <PanelResizeHandle className="resize-handle" />}
              
              {/* 输入区域 */}
              <Panel 
                defaultSize={isInputFullscreen ? 100 : 30}
                minSize={20}
              >
                <InputArea 
                  isFullscreen={isInputFullscreen}
                  onFullscreenToggle={setIsInputFullscreen}
                />
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* 右侧对话历史 */}
          <Panel defaultSize={20} minSize={15}>
            <ConversationHistory />
          </Panel>
        </PanelGroup>
      </div>
    </ThemeProvider>
  )
}

export default App
