# 项目部署指南

## 🚀 快速启动

### 前端应用启动

使用项目提供的便捷启动脚本：

```bash
./start-frontend.sh
```

或手动启动：

```bash
cd frontend
npm install
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 项目结构概览

```
deep-relationship/
├── frontend/                    # 前端可视化应用
│   ├── src/                    # 源代码
│   │   ├── components/         # React组件
│   │   │   ├── GraphContainer.tsx   # G6图谱容器
│   │   │   ├── GraphToolbar.tsx     # 工具栏组件  
│   │   │   └── GraphSidebar.tsx     # 侧边栏组件
│   │   ├── views/              # 页面视图
│   │   ├── types/              # TypeScript类型
│   │   ├── constants/          # 配置常量
│   │   └── utils/              # 工具函数
│   ├── package.json            # 依赖配置
│   └── README.md              # 详细文档
├── data/                       # 小说数据文件
├── scripts/                    # 数据处理脚本
└── start-frontend.sh          # 快速启动脚本
```

## 🎯 功能特性

### ✅ 已实现功能

1. **现代化前端架构**
   - React 18 + TypeScript
   - Vite 6 构建工具
   - Ant Design 5 UI组件库
   - AntV G6 5.0.49 图可视化引擎

2. **完整的项目结构**
   - 模块化组件设计
   - 类型安全的TypeScript开发
   - 响应式UI设计
   - 代码规范和linting配置

3. **图谱可视化基础框架**
   - GraphContainer: G6图谱容器组件
   - GraphToolbar: 图谱控制工具栏
   - GraphSidebar: 信息展示侧边栏
   - 支持多种布局算法配置

4. **示例数据系统**
   - 基于《凡人修仙传》的模拟数据
   - 人物、组织、地点、物品等多种实体类型
   - 丰富的关系类型定义

5. **交互功能框架**
   - 节点点击选择
   - 画布拖拽和缩放
   - 搜索功能
   - 实时统计信息

### 🔧 待完善功能

1. **G6图谱渲染**
   - 当前使用简化版本的G6 API
   - 需要根据G6 5.0最新文档完善图谱渲染
   - 需要实现节点和边的正确显示

2. **高级交互功能**
   - 节点拖拽
   - 关系高亮
   - 工具栏功能完整实现
   - 导出功能

3. **数据集成**
   - 连接后端API
   - 实时数据加载
   - 数据缓存和优化

## 🎨 技术栈详情

### 前端技术栈

- **框架**: React 18.3.1
- **类型系统**: TypeScript 5.6.2  
- **构建工具**: Vite 6.0.0
- **UI组件库**: Ant Design 5.21.0
- **图可视化**: AntV G6 5.0.49
- **路由**: React Router 7.1.0
- **HTTP客户端**: Axios 1.7.0
- **工具库**: Lodash-es 4.17.21

### 开发工具

- **代码检查**: ESLint 9.0.0 + TypeScript ESLint
- **样式方案**: CSS + Ant Design主题系统
- **热重载**: Vite HMR
- **代码分割**: Rollup manual chunks

## 📋 开发计划

### 近期任务
- [ ] 完善G6图谱渲染功能
- [ ] 实现完整的节点和边样式
- [ ] 添加布局算法切换
- [ ] 优化响应式设计

### 中期目标
- [ ] 集成Neo4j数据库
- [ ] 实现数据的增删改查
- [ ] 添加高级搜索功能
- [ ] 性能优化和缓存策略

### 长期规划
- [ ] 多维数据分析
- [ ] 时间轴功能
- [ ] 协作功能
- [ ] 移动端适配

## 🤝 参与开发

项目采用模块化设计，欢迎参与开发：

1. **前端开发**: 完善图谱可视化和交互功能
2. **后端集成**: 实现数据API和业务逻辑  
3. **数据处理**: 优化知识抽取和数据清洗
4. **UI/UX**: 改进界面设计和用户体验

## 📞 联系方式

**开发者**: kuhung  
**邮箱**: hi@kuhung.me  
**项目年份**: 2025年
