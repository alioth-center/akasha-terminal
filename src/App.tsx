import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import WorkflowList from './components/WorkflowList'
import ChatArea from './components/ChatArea'
import InputArea from './components/InputArea'
import ConversationHistory from './components/ConversationHistory'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1e1e',
      paper: '#252525',
    },
    primary: {
      main: '#007acc',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
          padding: 0,
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        },
        '#root': {
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <PanelGroup direction="horizontal">
          {/* 左侧工作流列表 */}
          <Panel defaultSize={20} minSize={15}>
            <WorkflowList />
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* 中间工作区 */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* 聊天区域 */}
              <Panel defaultSize={70} minSize={30}>
                <ChatArea />
              </Panel>
              
              {/* 输入区域 */}
              <Panel defaultSize={30} minSize={20} maxSize={50}>
                <InputArea />
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
