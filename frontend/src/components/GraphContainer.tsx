import { useEffect, useRef, useState } from 'react'
import { Graph } from '@antv/g6'
import { GraphData, GraphConfig, NodeData } from '@/types/graph'

interface GraphContainerProps {
  data: GraphData
  config: GraphConfig
  onNodeSelect: (node: NodeData | null) => void
}

const GraphContainer: React.FC<GraphContainerProps> = ({
  data,
  config: _config,
  onNodeSelect
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<Graph | null>(null)
  const [mounted, setMounted] = useState(false)

  // 初始化图谱
  useEffect(() => {
    if (!containerRef.current || !mounted) return

    try {
      // 创建G6图实例 - 使用最基础的配置
      const graph = new Graph({
        container: containerRef.current,
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })

      // 绑定事件
      graph.on('node:click', (evt) => {
        console.log('节点点击事件:', evt)
        // 暂时简化事件处理
        onNodeSelect(null)
      })

      graph.on('canvas:click', () => {
        onNodeSelect(null)
      })

      graphRef.current = graph
    } catch (error) {
      console.error('初始化G6图谱时出错:', error)
    }

    return () => {
      if (graphRef.current) {
        try {
          graphRef.current.destroy()
        } catch (error) {
          console.error('销毁图谱时出错:', error)
        }
        graphRef.current = null
      }
    }
  }, [mounted, onNodeSelect])

  // 处理数据更新
  useEffect(() => {
    if (!graphRef.current || !data) return

    try {
      // 简化的数据处理
      const processedData = {
        nodes: data.nodes.map(node => ({
          id: node.id,
          data: { 
            ...node,
            x: Math.random() * 800,
            y: Math.random() * 600
          }
        })),
        edges: data.edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          data: edge
        }))
      }

      // 暂时只打印数据，待G6 API研究清楚后再实现
      console.log('G6数据准备就绪:', processedData)
    } catch (error) {
      console.error('渲染图谱数据时出错:', error)
    }
  }, [data])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="graph-container"
      style={{ 
        width: '100%', 
        height: '100%',
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: '14px'
      }}
    >
      {!mounted && <div>正在加载图谱...</div>}
      {mounted && data.nodes.length === 0 && <div>暂无数据</div>}
    </div>
  )
}

export default GraphContainer
