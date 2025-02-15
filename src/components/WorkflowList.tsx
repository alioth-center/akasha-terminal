import { SimpleTreeView } from '@mui/x-tree-view'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
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
    <TreeItem 
      key={nodes.id} 
      itemId={nodes.id} 
      label={
        <Typography variant="body2">{nodes.name}</Typography>
      }
    >
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
        <SimpleTreeView
          defaultExpandedItems={['1']}
          slots={{
            expandIcon: ChevronRight,
            collapseIcon: ExpandMore,
          }}
          sx={{ 
            '& .MuiTreeItem-root': {
              '& .MuiTreeItem-content': {
                padding: '4px 8px',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                },
              },
            },
          }}
        >
          {sampleData.map((item) => renderTree(item))}
        </SimpleTreeView>
      </Box>
    </Paper>
  )
}

export default WorkflowList 