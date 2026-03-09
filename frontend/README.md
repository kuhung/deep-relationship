# 凡人修仙传人物关系图谱 - 前端应用

基于《凡人修仙传》小说构建的人物关系知识图谱可视化前端，使用 React + TypeScript + AntV G6 开发。

## 特性

- **现代化 UI**：基于 Ant Design 5，提供简洁优雅的用户体验
- **图谱可视化**：AntV G6 5.0，支持力导向、环形、径向、Dagre、网格、同心圆等多种布局
- **丰富交互**：拖拽平移、滚轮缩放、节点点击选择、关系高亮、双击复位
- **智能搜索**：支持节点名称和描述的模糊搜索
- **响应式设计**：适配桌面端和移动端
- **类型安全**：全量 TypeScript 开发，完整的类型检查

## 快速开始

**环境要求**：Node.js >= 18.0.0，npm >= 9.0.0

```bash
# 安装依赖
cd frontend
npm install

# 启动开发服务器（http://localhost:3000）
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
frontend/
├── public/                 # 静态资源
├── src/
│   ├── components/
│   │   ├── GraphContainer.tsx   # G6 图谱容器
│   │   ├── GraphToolbar.tsx     # 工具栏组件
│   │   ├── GraphSidebar.tsx     # 侧边栏组件
│   │   ├── BrandLogo.tsx        # 品牌 Logo
│   │   └── QRCodeModal.tsx      # 二维码弹窗
│   ├── views/
│   │   └── GraphView.tsx        # 主图谱视图
│   ├── types/
│   │   └── graph.ts             # 图谱类型定义
│   ├── constants/
│   │   └── graph.ts             # 布局、节点、边配置常量
│   ├── utils/
│   │   ├── mockData.ts          # 演示数据生成器
│   │   ├── Data.ts              # 数据工具函数
│   │   └── useResponsive.ts     # 响应式 Hooks
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

## 功能说明

### 图谱可视化

- 多种布局算法，支持一键切换
- 节点大小、颜色、标签显示控制
- 可开关的布局变换动画

### 交互功能

- 节点：点击选择、拖拽移动、悬停高亮
- 画布：拖拽平移、滚轮缩放、双击复位
- 关系高亮：点击节点时高亮关联节点和边

### 侧边栏

- 节点详情：显示选中节点的详细属性
- 搜索：按名称或描述搜索节点
- 统计：图谱节点数、关系数等基础统计
- 图例：节点类型和关系类型的颜色说明

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.3 | 前端框架 |
| TypeScript | 5.6 | 类型系统 |
| Vite | 6.0 | 构建工具 |
| Ant Design | 5.21 | UI 组件库 |
| AntV G6 | 5.0.49 | 图可视化引擎 |
| React Router | 7.1 | 路由管理 |

## 数据格式

### 节点（NodeData）

```typescript
interface NodeData {
  id: string                          // 唯一标识
  label: string                       // 显示标签
  nodeType: string                    // 节点类型（person/organization/location/item/skill/event）
  x?: number                          // X 坐标（可选）
  y?: number                          // Y 坐标（可选）
  size?: number                       // 节点大小（可选）
  color?: string                      // 节点颜色（可选）
  properties?: Record<string, any>    // 扩展属性
}
```

### 边（EdgeData）

```typescript
interface EdgeData {
  id: string                          // 唯一标识
  source: string                      // 源节点 ID
  target: string                      // 目标节点 ID
  label?: string                      // 边标签（可选）
  edgeType: string                    // 边类型
  weight?: number                     // 边权重（可选）
  color?: string                      // 边颜色（可选）
  properties?: Record<string, any>    // 扩展属性
}
```

## 自定义配置

在 `src/constants/graph.ts` 中扩展节点类型、关系类型和布局算法：

```typescript
// 添加节点类型
export const NODE_TYPE_CONFIGS = {
  'custom_type': { color: '#YOUR_COLOR', size: 30, label: '自定义类型' },
}

// 添加关系类型
export const EDGE_TYPE_CONFIGS = {
  'custom_relation': { color: '#YOUR_COLOR', label: '自定义关系' },
}

// 添加布局算法
export const LAYOUT_CONFIGS = {
  'custom_layout': { type: 'your_layout_type', /* 布局参数 */ },
}
```

## API 集成

当前版本使用演示数据，对接真实后端 API：

1. 在 `src/utils/apiClient.ts` 中添加 API 客户端
2. 在 `src/views/GraphView.tsx` 中替换数据加载逻辑
3. 根据实际 API 响应格式调整数据转换逻辑

## 开发计划

- 数据导入/导出功能
- 图片导出功能完善
- 更多布局算法支持
- 图谱分析工具
- 主题切换功能
- 多语言支持

## 贡献

1. Fork 项目
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交变更：`git commit -m 'feat: add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 许可证

MIT License - 查看 [LICENSE](../LICENSE) 了解详情。

## 作者

**kuhung** - [hi@kuhung.me](mailto:hi@kuhung.me)

## 致谢

- [AntV G6](https://g6.antv.antgroup.com/) - 图可视化引擎
- [Ant Design](https://ant.design/) - UI 设计语言
- [React](https://reactjs.org/) - 前端框架
- [Vite](https://vitejs.dev/) - 构建工具
