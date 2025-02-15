import React from 'react'
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
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
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
              <Panel defaultSize={70}>
                <ChatArea />
              </Panel>
              
              <PanelResizeHandle className="resize-handle" />
              
              <Panel defaultSize={30}>
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
