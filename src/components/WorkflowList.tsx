import React from 'react'
import { TreeView, TreeItem } from '@mui/lab'
import { ExpandMore, ChevronRight, Add } from '@mui/icons-material'
import { Box, IconButton, Typography, Paper } from '@mui/material'

interface WorkflowData {
  id: string
  name: string
  children?: WorkflowData[]
}

const sampleData: WorkflowData[] = [
  {
    id: '1',
    name: '项目 A',
    children: [
      { id: '1-1', name: '任务 1' },
      { id: '1-2', name: '任务 2' },
    ],
  },
  {
    id: '2',
    name: '项目 B',
    children: [
      { id: '2-1', name: '任务 1' },
    ],
  },
]

const WorkflowList = () => {
  const renderTree = (nodes: WorkflowData) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  )

  return (
    <Paper
      sx={{
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'background.paper',
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="subtitle1">工作流</Typography>
        <IconButton size="small">
          <Add />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
        >
          {sampleData.map((item) => renderTree(item))}
        </TreeView>
      </Box>
    </Paper>
  )
}

export default WorkflowList 