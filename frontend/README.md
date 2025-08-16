# 凡人修仙传人物关系图谱 - 前端应用

基于《凡人修仙传》小说构建的人物关系知识图谱可视化前端应用，使用 React + TypeScript + AntV G6 技术栈开发。

## ✨ 特性

- 🎨 **现代化UI设计**: 基于Ant Design设计语言，提供优雅的用户体验
- 📊 **强大的图谱可视化**: 使用AntV G6最新版本，支持多种布局算法
- 🎛️ **丰富的交互功能**: 拖拽、缩放、节点选择、悬停提示等
- 🔍 **智能搜索**: 支持节点名称和描述的模糊搜索
- 📱 **响应式设计**: 支持桌面端和移动端访问
- 🎯 **类型安全**: 全量TypeScript开发，提供完整的类型检查

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
cd frontend
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:3000 启动，支持热重载。

### 生产构建

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 预览构建结果

```bash
npm run preview
```

## 🏗️ 项目结构

```
frontend/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React组件
│   │   ├── GraphContainer.tsx   # G6图谱容器
│   │   ├── GraphToolbar.tsx     # 工具栏组件
│   │   └── GraphSidebar.tsx     # 侧边栏组件
│   ├── views/             # 页面组件
│   │   └── GraphView.tsx       # 主图谱视图
│   ├── types/             # TypeScript类型定义
│   │   └── graph.ts            # 图谱相关类型
│   ├── constants/         # 常量配置
│   │   └── graph.ts            # 图谱配置常量
│   ├── utils/             # 工具函数
│   │   └── mockData.ts         # 模拟数据生成器
│   ├── App.tsx            # 应用根组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript配置
├── vite.config.ts         # Vite配置
└── README.md              # 项目说明
```

## 🎛️ 功能说明

### 图谱可视化
- **多种布局算法**: 力导向、环形、径向、Dagre、网格、同心圆
- **自定义样式**: 节点大小、颜色、标签显示控制
- **动画效果**: 可开启/关闭布局变换动画

### 交互功能
- **节点操作**: 点击选择、拖拽移动、悬停高亮
- **画布操作**: 拖拽平移、滚轮缩放、双击复位
- **关系高亮**: 点击节点时高亮相关节点和边

### 侧边栏功能
- **节点详情**: 显示选中节点的详细信息
- **搜索功能**: 按名称或描述搜索节点
- **统计信息**: 显示图谱的基本统计数据
- **图例说明**: 节点类型和关系类型的颜色说明

### 工具栏功能
- **布局切换**: 快速切换不同的图布局算法
- **样式调整**: 调整节点大小、标签显示等
- **数据操作**: 刷新数据、导出图片、全屏显示

## 🎨 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **UI组件库**: Ant Design 5
- **图可视化**: AntV G6 5.0.49
- **路由管理**: React Router 7
- **状态管理**: React Hooks
- **样式方案**: CSS + Ant Design Theme
- **代码规范**: ESLint + TypeScript ESLint

## 📊 数据格式

### 节点数据格式

```typescript
interface NodeData {
  id: string              // 唯一标识
  label: string           // 显示标签
  nodeType: string        // 节点类型
  x?: number             // X坐标（可选）
  y?: number             // Y坐标（可选）
  size?: number          // 节点大小（可选）
  color?: string         // 节点颜色（可选）
  properties?: Record<string, any>  // 扩展属性
}
```

### 边数据格式

```typescript
interface EdgeData {
  id: string              // 唯一标识
  source: string          // 源节点ID
  target: string          // 目标节点ID
  label?: string          // 边标签（可选）
  edgeType: string        // 边类型
  weight?: number         // 边权重（可选）
  color?: string          // 边颜色（可选）
  properties?: Record<string, any>  // 扩展属性
}
```

## 🔧 自定义配置

### 添加新的节点类型

在 `src/constants/graph.ts` 中的 `NODE_TYPE_CONFIGS` 添加配置：

```typescript
export const NODE_TYPE_CONFIGS = {
  'custom_type': {
    color: '#YOUR_COLOR',
    size: 30,
    label: '自定义类型'
  },
  // ... 其他配置
}
```

### 添加新的关系类型

在 `src/constants/graph.ts` 中的 `EDGE_TYPE_CONFIGS` 添加配置：

```typescript
export const EDGE_TYPE_CONFIGS = {
  'custom_relation': {
    color: '#YOUR_COLOR',
    label: '自定义关系'
  },
  // ... 其他配置
}
```

### 自定义布局算法

在 `src/constants/graph.ts` 中的 `LAYOUT_CONFIGS` 添加新布局：

```typescript
export const LAYOUT_CONFIGS = {
  'custom_layout': {
    type: 'your_layout_type',
    // ... 布局参数
  },
  // ... 其他配置
}
```

## 🌐 API集成

当前版本使用模拟数据，如需连接真实后端API，可修改以下文件：

1. 在 `src/utils/apiClient.ts` 中添加API客户端
2. 在 `src/views/GraphView.tsx` 中替换数据加载逻辑
3. 根据实际API响应格式调整数据转换逻辑

## 🎯 开发计划

- [ ] 数据导入/导出功能
- [ ] 图片导出功能完善
- [ ] 更多布局算法支持
- [ ] 图谱分析工具
- [ ] 主题切换功能
- [ ] 多语言支持

## 🤝 参与贡献

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交变更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👤 作者

**kuhung** - [hi@kuhung.me](mailto:hi@kuhung.me)

## 🙏 致谢

- [AntV G6](https://g6.antv.antgroup.com/) - 优秀的图可视化引擎
- [Ant Design](https://ant.design/) - 企业级UI设计语言
- [React](https://reactjs.org/) - 构建用户界面的JavaScript库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
