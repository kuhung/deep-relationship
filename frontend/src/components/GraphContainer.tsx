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
  const [isLayoutAnimating, setIsLayoutAnimating] = useState(false) // 新增状态

  const initialPinchDistance = useRef<number | null>(null)
  const initialGraphZoom = useRef<number | null>(null)

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
    
    // 监听布局动画开始和结束
    graph.on('beforelayout', () => {
      console.log('Layout animation started.');
      setIsLayoutAnimating(true);
    })
    graph.on('afterlayout', () => {
      console.log('Layout animation ended.');
      setIsLayoutAnimating(false);
    })
    graph.on('layoutstopped', () => {
      console.log('Layout animation stopped.');
      setIsLayoutAnimating(false);
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

    // 处理移动端双指缩放
    const container = containerRef.current

    const getDistance = (touches: TouchList) => {
      const [touch1, touch2] = Array.from(touches)
      return Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        initialPinchDistance.current = getDistance(event.touches)
        initialGraphZoom.current = graphRef.current?.getZoom() || 1
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2 && initialPinchDistance.current !== null && initialGraphZoom.current !== null) {
        event.preventDefault() // 阻止默认的浏览器缩放行为
        const currentDistance = getDistance(event.touches)
        const scale = currentDistance / initialPinchDistance.current
        const newZoom = initialGraphZoom.current * scale
        const g = graphRef.current
        if (g) {
          const viewportCenter = { x: (event.touches[0].clientX + event.touches[1].clientX) / 2, y: (event.touches[0].clientY + event.touches[1].clientY) / 2 } as any
          const canvasCenter = g.getCanvasByViewport(viewportCenter) as any

          const currentZoom = g.getZoom()

          const newTranslationX = canvasCenter.x - (viewportCenter.x / currentZoom) * newZoom
          const newTranslationY = canvasCenter.y - (viewportCenter.y / currentZoom) * newZoom

          g.zoomTo(newZoom)
          g.translateBy([newTranslationX, newTranslationY])
        }
      }
    }

    const handleTouchEnd = () => {
      initialPinchDistance.current = null
      initialGraphZoom.current = null
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)
    container.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('touchcancel', handleTouchEnd)
      graphRef.current?.destroy()
      graphRef.current = null
    }
  }, []) // 空依赖数组，只在组件挂载时执行一次

  // 数据和配置更新 (移除selectedNodeId依赖，避免不必要的重新渲染)
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
          stroke: '#fff',
          lineWidth: 2,
          // 标签相关样式
          labelText: config.showNodeLabel ? node.label : undefined,
          labelFontSize: 11,
          labelFill: '#333',
          labelPosition: 'bottom'
        },
        // 使用G6的状态样式来处理选中效果
        stateStyles: {
          selected: {
            stroke: '#1890ff',
            lineWidth: 3,
            shadowColor: '#1890ff',
            shadowBlur: 8,
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
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
      // 如果布局正在动画中，先停止布局
      if (isLayoutAnimating) {
        g.stopLayout()
        setIsLayoutAnimating(false) // 立即更新状态，因为我们手动停止了
      }
      
      // 使用 setData 方法更新图谱数据，G6 5.x 的推荐方式
      (g as any).setData(processedData);
      console.log('Setting layout with config:', LAYOUT_CONFIGS[config.layout as keyof typeof LAYOUT_CONFIGS]);
      (g as any).setLayout(LAYOUT_CONFIGS[config.layout as keyof typeof LAYOUT_CONFIGS]);
      console.log('Layout set.');
      g.render().then(() => {
        g.fitView()
      }).catch(error => {
        console.warn('图谱渲染警告:', error)
      })
    } catch (error) {
      console.error('设置图谱数据时出错:', error)
    }

  }, [mounted, data, config]) // 添加 isLayoutAnimating 依赖

  // 单独处理选中状态变化，使用G6的状态管理，避免重新渲染
  useEffect(() => {
    if (!mounted || !graphRef.current) return
    
    const g = graphRef.current
    
    // 清除所有节点的选中状态
    data.nodes.forEach(node => {
      try {
        (g as any).setItemState(node.id, 'selected', false)
      } catch (error) {
        // 忽略节点不存在的错误
      }
    })
    
    // 设置当前选中节点的状态
    if (selectedNodeId) {
      try {
        (g as any).setItemState(selectedNodeId, 'selected', true)
      } catch (error) {
        console.warn('设置节点选中状态失败:', error)
      }
    }
  }, [selectedNodeId, mounted, data.nodes])

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
          bottom: 10,
          left: 10,
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: 4,
          fontSize: '12px',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          节点: {data.nodes.length} | 边: {data.edges.length} | 选中: {selectedNodeId || '无'} | 布局动画: {isLayoutAnimating ? '是' : '否'}
        </div>
      )}
    </div>
  )
}

export default GraphContainer