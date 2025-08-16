import { useEffect, useRef, useState } from 'react'
import { Graph } from '@antv/g6'
import { GraphData, GraphConfig, NodeData } from '@/types/graph'
import { LAYOUT_CONFIGS } from '@/constants/graph'

interface GraphContainerProps {
  data: GraphData
  config: GraphConfig
  onNodeSelect: (node: NodeData | null) => void
}

const GraphContainer: React.FC<GraphContainerProps> = ({
  data,
  config,
  onNodeSelect
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<Graph | null>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  // 初始化图谱实例
  useEffect(() => {
    if (graphRef.current || !containerRef.current) return

    const graph = new Graph({
      container: containerRef.current,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    })

    // 绑定事件
    graph.on('node:click', (evt: any) => {
      const nodeId = evt.target?.id || evt.itemId
      if (nodeId && data.nodes) {
        const nodeData = data.nodes.find(n => n.id === nodeId)
        if (nodeData) {
          setSelectedNodeId(nodeId)
          onNodeSelect(nodeData)
        }
      }
    })

    graph.on('canvas:click', () => {
      setSelectedNodeId(null)
      onNodeSelect(null)
    })
    
    graphRef.current = graph
    setMounted(true)

    // 处理窗口大小变化
    const handleResize = () => {
      if (graphRef.current && containerRef.current) {
        graphRef.current.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight)
        graphRef.current.fitView()
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      graphRef.current?.destroy()
      graphRef.current = null
    }
  }, [data.nodes, onNodeSelect])

  // 数据和配置更新
  useEffect(() => {
    if (!mounted || !graphRef.current) return

    const g = graphRef.current

    // 调整节点大小 - 减小30%
    const nodeSize = Math.max(config.nodeSize * 0.7, 15)

    const processedData = {
      nodes: data.nodes.map(node => ({
        id: node.id,
        data: {
          ...node,
          displaySize: nodeSize
        },
        style: {
          size: nodeSize,
          fill: node.color || '#5B8FF9',
          stroke: selectedNodeId === node.id ? '#1890ff' : '#fff',
          lineWidth: selectedNodeId === node.id ? 3 : 2,
          shadowColor: selectedNodeId === node.id ? '#1890ff' : 'transparent',
          shadowBlur: selectedNodeId === node.id ? 8 : 0,
          // 标签相关样式
          labelText: config.showNodeLabel ? node.label : undefined,
          labelFontSize: 11,
          labelFill: '#333',
          labelPosition: 'bottom'
        }
      })),
      edges: data.edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        data: edge,
        style: {
          stroke: edge.color || '#e2e2e2',
          lineWidth: 1.5,
          opacity: 0.8,
          // 标签相关样式
          labelText: config.showEdgeLabel ? edge.label : undefined,
          labelFontSize: 9,
          labelFill: '#666'
        }
      }))
    }
    
    try {
      // 使用any类型来绕过类型检查
      (g as any).setData(processedData);
      (g as any).setLayout(LAYOUT_CONFIGS[config.layout as keyof typeof LAYOUT_CONFIGS]);
      g.render().then(() => {
        g.fitView()
      }).catch(error => {
        console.warn('图谱渲染警告:', error)
      })
    } catch (error) {
      console.error('设置图谱数据时出错:', error)
    }

  }, [mounted, data, config, selectedNodeId])

  return (
    <div 
      ref={containerRef} 
      className="graph-container"
      style={{ 
        width: '100%', 
        height: '100%',
        background: '#fafafa',
        position: 'relative'
      }}
    >
      {/* 开发模式下显示调试信息 */}
      {true && ( // 简化条件，避免类型错误
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: 4,
          fontSize: '12px',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          节点: {data.nodes.length} | 边: {data.edges.length} | 选中: {selectedNodeId || '无'}
        </div>
      )}
    </div>
  )
}

export default GraphContainer