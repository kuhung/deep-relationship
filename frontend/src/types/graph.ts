// 图谱数据类型定义

export interface NodeData {
  id: string
  label: string
  nodeType: string
  x?: number
  y?: number
  size?: number
  color?: string
  style?: Record<string, any>
  properties?: Record<string, any>
}

export interface EdgeData {
  id: string
  source: string
  target: string
  label?: string
  edgeType: string
  weight?: number
  color?: string
  style?: Record<string, any>
  properties?: Record<string, any>
}

export interface GraphData {
  nodes: NodeData[]
  edges: EdgeData[]
}

export interface GraphConfig {
  layout: string
  nodeSize: number
  showNodeLabel: boolean
  showEdgeLabel: boolean
  enableAnimation: boolean
}

export interface GraphStats {
  nodeCount: number
  edgeCount: number
  nodeTypes: number
  edgeTypes: number
}

// G6 相关类型
export interface G6NodeData extends NodeData {
  x: number
  y: number
}

export interface G6EdgeData extends EdgeData {
  source: string
  target: string
}

export interface G6GraphData {
  nodes: G6NodeData[]
  edges: G6EdgeData[]
}

// 事件类型
export interface NodeSelectEvent {
  node: NodeData | null
}

export interface GraphEvent {
  type: string
  data: any
}
