# 部署指南

## 快速启动

### 前端应用

使用便捷启动脚本：

```bash
./start-frontend.sh
```

或手动启动：

```bash
cd frontend
npm install
npm run dev
```

应用将在 `http://localhost:3000` 启动，包含《凡人修仙传》演示数据，无需配置后端即可运行。

### 生产构建

```bash
cd frontend
npm run build
# 构建产物生成在 frontend/dist/
```

### Vercel 部署

项目已适配 Vercel 部署，推送到 GitHub 后通过 Vercel 导入即可自动构建：

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入仓库
3. 构建设置：
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 项目结构

```
deep-relationship/
├── frontend/                    # 前端可视化应用
│   ├── src/
│   │   ├── components/          # React 组件
│   │   │   ├── GraphContainer.tsx   # G6 图谱容器
│   │   │   ├── GraphToolbar.tsx     # 工具栏组件
│   │   │   ├── GraphSidebar.tsx     # 侧边栏组件
│   │   │   ├── BrandLogo.tsx        # 品牌 Logo 组件
│   │   │   └── QRCodeModal.tsx      # 二维码弹窗
│   │   ├── views/               # 页面视图
│   │   ├── types/               # TypeScript 类型
│   │   ├── constants/           # 配置常量
│   │   └── utils/               # 工具函数与演示数据
│   ├── package.json
│   └── README.md
├── data/                        # 小说数据文件
├── scripts/                     # 知识抽取与数据处理脚本
├── requirements.txt             # Python 依赖
└── start-frontend.sh            # 快速启动脚本
```

## 功能状态

### 已实现

- React 18 + TypeScript + Vite 6 前端架构
- AntV G6 5.0.49 图谱可视化引擎
- Ant Design 5 UI 组件库
- 多种布局算法（力导向、环形、径向、Dagre、网格、同心圆）
- 节点类型样式配置（人物、组织、地点、物品、技能、事件）
- 节点点击、画布拖拽缩放、搜索、统计、图例
- 基于《凡人修仙传》的演示数据
- LLM 知识抽取脚本（`extract_kg.py`）
- Neo4j 数据导入脚本（`import_to_neo4j.py`）
- Vercel Analytics 集成
- Google Analytics 集成

### 待完善

- G6 5.0 高级渲染特性（节点边样式精细化）
- 节点拖拽、关系高亮、图谱导出
- 连接 Neo4j 后端 API（当前使用演示数据）
- 数据增删改查界面

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | 18.3.1 |
| 类型系统 | TypeScript | 5.6.2 |
| 构建工具 | Vite | 6.0.0 |
| UI 组件库 | Ant Design | 5.21.0 |
| 图可视化 | AntV G6 | 5.0.49 |
| 路由 | React Router | 7.1.0 |
| HTTP 客户端 | Axios | 1.7.0 |
| 工具库 | Lodash-es | 4.17.21 |
| 代码检查 | ESLint | 9.0.0 |

## Neo4j 数据库（可选）

使用 Docker 启动本地 Neo4j 实例：

```bash
docker run --name fanren-neo4j \
    -p 7474:7474 -p 7687:7687 \
    -d \
    -e NEO4J_AUTH=neo4j/your_password \
    neo4j:latest
```

启动后访问 `http://localhost:7474` 打开 Neo4j Browser。

执行知识抽取并导入数据：

```bash
# 设置环境变量
export OPENAI_API_KEY=your_api_key

# 知识抽取（生成 fanren_kg.json）
python scripts/extract_kg.py

# 导入 Neo4j
python scripts/import_to_neo4j.py
```

## 开发计划

### 近期

- 完善 G6 图谱渲染功能
- 实现节点和边的精细样式
- 添加布局算法平滑切换动画
- 优化移动端响应式体验

### 中期

- 集成 Neo4j 后端 API
- 实现图谱数据的动态加载
- 高级搜索（属性过滤、关系类型筛选）
- 性能优化与大规模数据渲染

### 长期

- 时间轴功能（展示关系动态演变）
- 多维数据分析与图谱统计
- 协作编辑功能
- 多语言支持

## 联系

**开发者**：kuhung  
**邮箱**：hi@kuhung.me  
**项目年份**：2026
