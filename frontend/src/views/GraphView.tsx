import { useEffect, useState, useMemo } from 'react'
import { Layout, Spin, App as AntdApp } from 'antd'
import GraphContainer from '@/components/GraphContainer'
import GraphToolbar from '@/components/GraphToolbar'
import GraphSidebar from '@/components/GraphSidebar'
import { GraphData, GraphConfig, NodeData } from '@/types/graph'
import { generateDemoData } from '@/utils/Data'
import { GraphLayoutType } from '@/constants/graph'

const { Content } = Layout

interface GraphViewState {
  data: GraphData
  loading: boolean
  selectedNode: NodeData | null
  config: GraphConfig
}

const GraphView = () => {
  const { message } = AntdApp.useApp() // Use App.useApp() to get message instance

  const [state, setState] = useState<GraphViewState>({
    data: { nodes: [], edges: [] },
    loading: true,
    selectedNode: null,
    config: {
      layout: GraphLayoutType.FORCE,
      nodeSize: 30,
      showNodeLabel: true,
      showEdgeLabel: false,
      enableAnimation: true,
    }
  })
  const [hiddenNodeTypes, setHiddenNodeTypes] = useState<string[]>([])

  // 初始化数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }))
        
        // 模拟加载时间
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 生成演示数据
        const demoData = generateDemoData()
        
        setState(prev => ({
          ...prev,
          data: demoData,
          loading: false
        }))
        
        message.success('数据加载完成')
      } catch (error) {
        console.error('数据加载失败:', error)
        message.error('数据加载失败，请稍后重试')
        setState(prev => ({ ...prev, loading: false }))
      }
    }

    loadData()
  }, [])

  // 处理节点选择
  const handleNodeSelect = (node: NodeData | null) => {
    setState(prev => ({ ...prev, selectedNode: node }))
  }

  // 处理布局变更
  const handleLayoutChange = (layout: GraphLayoutType) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, layout }
    }))
  }

  // 处理配置变更
  const handleConfigChange = (newConfig: Partial<GraphConfig>) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, ...newConfig }
    }))
  }

  // 处理数据刷新
  const handleDataRefresh = () => {
    setState(prev => ({
      ...prev,
      data: generateDemoData(),
      selectedNode: null
    }))
    message.success('数据已刷新')
  }

  // 处理节点类型选择
  const handleNodeTypeSelect = (nodeTypes: string[]) => {
    setHiddenNodeTypes(nodeTypes)
  }

  // 根据隐藏节点类型过滤数据
  const filteredGraphData = useMemo(() => {
    const visibleNodes = state.data.nodes.filter(node => !hiddenNodeTypes.includes(node.nodeType))
    const visibleNodeIds = new Set(visibleNodes.map(node => node.id))
    const visibleEdges = state.data.edges.filter(edge =>
      visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    )
    return {
      nodes: visibleNodes,
      edges: visibleEdges
    }
  }, [state.data, hiddenNodeTypes])

  // 计算统计数据
  const stats = useMemo(() => ({
    nodeCount: state.data.nodes.length,
    edgeCount: state.data.edges.length,
    nodeTypes: [...new Set(state.data.nodes.map(n => n.nodeType))].length,
    edgeTypes: [...new Set(state.data.edges.map(e => e.edgeType))].length
  }), [state.data])

  if (state.loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-title">凡人修仙传</div>
        <div className="loading-subtitle">正在加载人物关系图谱...</div>
      </div>
    )
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Content style={{ position: 'relative', overflow: 'hidden' }}>
        {/* 图谱容器 */}
        <GraphContainer
          data={filteredGraphData}
          config={state.config}
          onNodeSelect={handleNodeSelect}
        />
        
        {/* 工具栏 */}
        <GraphToolbar
          config={state.config}
          onLayoutChange={handleLayoutChange}
          onConfigChange={handleConfigChange}
          onDataRefresh={handleDataRefresh}
        />
        
        {/* 侧边栏 */}
        <GraphSidebar
          selectedNode={state.selectedNode}
          stats={stats}
          data={state.data}
          onNodeSelect={handleNodeSelect}
          onNodeTypeSelect={handleNodeTypeSelect}
        />
      </Content>
    </Layout>
  )
}

export default GraphView
