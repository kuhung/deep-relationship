# 凡人修仙传人物关系图谱 | Deep Relationship Graph

> 基于大语言模型（LLM）与知识图谱技术，将百万字级小说《凡人修仙传》转化为可交互、可视化的人物关系图谱应用。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![AntV G6](https://img.shields.io/badge/AntV_G6-5.0-orange.svg)](https://g6.antv.antgroup.com/)

[在线演示](https://fanren.kuhung.me) | [技术方案文档](doc/plan.md) | [前端文档](frontend/README.md) | [部署指南](DEPLOYMENT.md)

---

## 项目简介

本项目探索如何将复杂叙事文本（小说）转化为结构化知识图谱，并以交互式可视化方式呈现。核心流程：

```
小说文本 → LLM 知识抽取 → 图数据库存储 → 前端可视化
```

技术上选用 `kg-gen` + GPT-4o 进行实体与关系抽取，Neo4j 作为图数据库，React + AntV G6 构建前端。

该项目同时是 [从文本到繁星：面向复杂叙事的知识图谱技术、可视化与实施全景指南](doc/plan.md) 的工程实践。

## 核心特性

- **LLM 知识抽取**：基于 `kg-gen` 库与 GPT-4o，自动化从文本中识别人物、组织、地点、法宝、技能、事件等实体及其关系
- **多种布局算法**：力导向、环形、径向、Dagre、网格、同心圆，一键切换
- **丰富的节点类型**：人物、组织、地点、物品、技能、事件 6 类节点，差异化样式展示
- **交互功能**：节点点击、拖拽平移、滚轮缩放、关系高亮、双击复位
- **智能搜索**：按名称或描述模糊搜索节点，快速定位目标
- **响应式设计**：兼容桌面端和移动端，自适应不同屏幕尺寸
- **图谱统计**：实时展示节点数、关系数等基础统计信息

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端框架 | React 18 + TypeScript | 类型安全的现代 React 开发 |
| 图可视化 | AntV G6 5.0.49 | 专业图可视化引擎，支持多种布局 |
| UI 组件库 | Ant Design 5 | 企业级 UI 设计语言 |
| 构建工具 | Vite 6 | 极速前端构建，支持 HMR |
| 知识抽取 | kg-gen + GPT-4o | LLM 驱动的自动化知识抽取 |
| 图数据库 | Neo4j | 高性能图数据存储与查询 |
| 部署 | Vercel | Edge 部署，全球加速 |

## 快速开始

### 前端可视化（最简启动）

```bash
# 克隆项目
git clone https://github.com/kuhung/deep-relationship.git
cd deep-relationship

# 启动前端（含演示数据）
./start-frontend.sh

# 或手动启动
cd frontend
npm install
npm run dev
# 访问 http://localhost:3000
```

### 知识抽取（需要 OpenAI API Key）

```bash
# 安装 Python 依赖（推荐使用 uv）
pip install -r requirements.txt

# 设置环境变量
export OPENAI_API_KEY=your_api_key

# 执行知识抽取（生成 fanren_kg.json）
python scripts/extract_kg.py
```

### Neo4j 数据库（可选，用于完整功能）

```bash
# 使用 Docker 启动 Neo4j
docker run --name fanren-neo4j \
    -p 7474:7474 -p 7687:7687 \
    -d \
    -e NEO4J_AUTH=neo4j/your_password \
    neo4j:latest

# 导入知识图谱数据
python scripts/import_to_neo4j.py
```

## 项目结构

```
deep-relationship/
├── data/                         # 数据目录
│   ├── chapters_advanced/        # 按章节切分的 PDF 文件
│   ├── 凡人修仙传.pdf            # 原始小说 PDF
│   └── 凡人修仙传.txt            # 原始小说文本
├── doc/                          # 文档目录
│   └── plan.md                   # 技术方案全景指南（31KB）
├── scripts/                      # 数据处理脚本
│   ├── extract_kg.py             # LLM 知识抽取脚本
│   ├── import_to_neo4j.py        # Neo4j 数据导入脚本
│   ├── split_pdf.sh              # PDF 切分脚本
│   ├── split_pdf_advanced.sh     # 高级 PDF 切分脚本
│   └── split_pdf_by_chapter.sh   # 按章节切分 PDF 脚本
├── frontend/                     # 前端应用
│   ├── src/
│   │   ├── components/           # React 组件（GraphContainer、GraphToolbar、GraphSidebar）
│   │   ├── views/                # 页面视图
│   │   ├── types/                # TypeScript 类型定义
│   │   ├── constants/            # 布局、节点、边常量配置
│   │   └── utils/                # 工具函数与演示数据
│   ├── package.json
│   └── README.md                 # 前端详细文档
├── requirements.txt              # Python 依赖
├── start-frontend.sh             # 前端快速启动脚本
├── DEPLOYMENT.md                 # 部署指南
└── README.md
```

## 路线图

| 阶段 | 核心任务 | 状态 |
|------|----------|------|
| 第一阶段：基础构建 | 项目环境初始化、Schema 定义、Neo4j 部署 | 完成 |
| 第二阶段：知识抽取 | LLM 分块抽取、数据清洗、Neo4j 导入 | 完成 |
| 第三阶段：可视化 | React 前端、G6 渲染、交互功能 | 进行中 |
| 第四阶段：迭代扩展 | 动态关系演变、性能优化、高级分析 | 规划中 |

## 贡献指南

欢迎通过以下方式参与项目：

1. Fork 此仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交变更（遵循 Conventional Commits）：`git commit -m 'feat: add your feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 提交 Pull Request

**优先贡献方向：**
- 前端：完善 G6 5.0 图谱渲染，实现节点拖拽、关系高亮、导出功能
- 数据：改进知识抽取 Prompt，提升实体识别准确率
- 后端：实现 Neo4j 数据 API，支持动态数据加载
- UI/UX：优化界面设计与移动端体验

## 相关资源

- [AntV G6 文档](https://g6.antv.antgroup.com/) - 图可视化引擎
- [kg-gen](https://github.com/dylansolms/kg-gen) - 知识图谱生成库
- [Neo4j 文档](https://neo4j.com/docs/) - 图数据库
- [技术方案文档](doc/plan.md) - 本项目完整技术方案（含可视化方案对比、LLM 抽取策略、RAG 集成等）

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 联系

**作者**：kuhung  
**邮箱**：hi@kuhung.me

如有问题或建议，欢迎通过 [Issues](https://github.com/kuhung/deep-relationship/issues) 反馈。
