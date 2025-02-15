import React, { FC } from 'react'
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ContentCopy } from '@mui/icons-material'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const sampleMessages: Message[] = [
  {
    role: 'user',
    content: '请详细介绍一下现代前端开发中常用的工具和最佳实践',
  },
  {
    role: 'assistant',
    content: `# 现代前端开发工具和最佳实践指南

现代前端开发已经发展成为一个复杂而成熟的生态系统。以下是一些核心工具和最佳实践的详细介绍：

## 1. 开发环境配置

### 1.1 包管理器
主流的包管理器包括：
- **npm**: Node.js 默认的包管理器
- **yarn**: Facebook 开发的替代品，提供更好的性能和可靠性
- **pnpm**: 新一代包管理器，通过硬链接共享依赖，节省磁盘空间

### 1.2 开发工具
推荐使用以下工具提升开发效率：
- **VS Code**: 最流行的代码编辑器，具有丰富的插件生态
- **WebStorm**: 功能强大的专业 IDE
- **Cursor**: 新一代 AI 驱动的编辑器

## 2. 构建工具和打包工具

现代前端项目通常需要以下构建工具：

\`\`\`typescript
// vite.config.ts 示例
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
\`\`\`

## 3. 代码质量和测试

### 3.1 代码规范
使用 ESLint 和 Prettier 保证代码质量：

\`\`\`json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "react", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
\`\`\`

### 3.2 自动化测试
推荐使用以下测试工具：

| 工具名称 | 用途 | 特点 |
|---------|------|------|
| Jest | 单元测试 | 简单易用，功能完整 |
| React Testing Library | 组件测试 | 更接近用户使用场景 |
| Cypress | E2E测试 | 现代化的测试体验 |
| Vitest | 单元测试 | 与 Vite 完美集成 |

## 4. 性能优化

以下是一个性能优化的示例代码：

\`\`\`typescript
import { lazy, Suspense, memo } from 'react';
import { useInView } from 'react-intersection-observer';

// 1. 代码分割
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 2. 虚拟列表实现
interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemHeight: number;
  windowHeight: number;
}

function VirtualList<T>({ items, renderItem, itemHeight, windowHeight }: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  
  return (
    <div
      style={{ height: \`\${items.length * itemHeight}px\`, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ transform: \`translateY(\${startIndex * itemHeight}px)\` }}>
        {visibleItems.map(renderItem)}
      </div>
    </div>
  );
}

// 3. 图片懒加载
const LazyImage = memo(({ src, alt }: { src: string; alt: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: 'auto' }}
        />
      ) : (
        <div style={{ aspectRatio: '16/9', background: '#f0f0f0' }} />
      )}
    </div>
  );
});

// 4. 使用示例
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
      <VirtualList
        items={Array.from({ length: 10000 }, (_, i) => ({
          id: i,
          title: \`Item \${i}\`,
        }))}
        renderItem={(item) => (
          <div key={item.id} style={{ height: '50px' }}>
            {item.title}
          </div>
        )}
        itemHeight={50}
        windowHeight={window.innerHeight}
      />
      <LazyImage
        src="https://example.com/large-image.jpg"
        alt="Large image"
      />
    </Suspense>
  );
}
\`\`\`

## 5. 部署和监控

### 5.1 CI/CD 配置
这是一个典型的 GitHub Actions 配置：

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install Dependencies
      run: npm ci
      
    - name: Run Tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Production
      if: github.ref == 'refs/heads/main'
      run: |
        # 部署脚本
        echo "Deploying to production..."
\`\`\`

> 注意：以上配置仅供参考，需要根据具体项目需求进行调整。

这些工具和实践的组合可以帮助你构建一个现代化、高性能、可维护的前端应用。记住要根据项目的具体需求来选择合适的工具和实践。`,
  }
]

const ChatArea: FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Paper
      sx={{
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'background.paper',
        borderRadius: 0,
      }}
    >
      <Box sx={{ p: 2 }}>
        {sampleMessages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: '85%',
                backgroundColor: message.role === 'user' ? '#1976d2' : '#424242',
                borderRadius: 2,
                p: 2,
                color: '#fff',
              }}
            >
              <Typography
                component="div"
                sx={{
                  '& p': { m: 0 },
                  '& h1': { 
                    fontSize: '1.5rem',
                    mt: 1,
                    mb: 2,
                  },
                  '& h2': { 
                    fontSize: '1.25rem',
                    mt: 2,
                    mb: 1,
                  },
                  '& h3': { 
                    fontSize: '1.1rem',
                    mt: 1.5,
                    mb: 1,
                  },
                  '& h4, & h5, & h6': { 
                    fontSize: '1rem',
                    mt: 1,
                    mb: 0.5,
                  },
                  '& pre': {
                    m: '1em 0',
                    position: 'relative',
                    '&::before': {
                      content: 'attr(data-language)',
                      position: 'absolute',
                      top: '0.5em',
                      right: '2.5em',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.8em',
                      fontFamily: 'monospace',
                    },
                  },
                  '& code': {
                    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    fontSize: '0.9em',
                  },
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                  },
                  '& table': {
                    borderCollapse: 'collapse',
                    width: '100%',
                    my: 2,
                  },
                  '& th, & td': {
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '0.5em',
                  },
                  '& blockquote': {
                    borderLeft: '4px solid rgba(255, 255, 255, 0.2)',
                    m: '1em 0',
                    pl: 2,
                    py: 0.5,
                  },
                  '& ul, & ol': {
                    pl: 3,
                    m: '0.5em 0',
                  },
                  '& li': {
                    mb: '0.25em',
                  },
                  '& li:last-child': {
                    mb: 0,
                  },
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '')
                      const code = String(children).replace(/\n$/, '')
                      
                      if (!inline && match) {
                        return (
                          <Box sx={{ position: 'relative' }}>
                            <Tooltip title="复制代码" placement="top">
                              <IconButton
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  right: 1,
                                  top: 1,
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  '&:hover': {
                                    color: 'white',
                                  },
                                }}
                                onClick={() => copyToClipboard(code)}
                              >
                                <ContentCopy fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              data-language={match[1].toUpperCase()}
                              customStyle={{
                                margin: 0,
                                borderRadius: 4,
                                padding: '1em',
                                paddingTop: '2em',
                              }}
                              {...props}
                            >
                              {code}
                            </SyntaxHighlighter>
                          </Box>
                        )
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

export default ChatArea 