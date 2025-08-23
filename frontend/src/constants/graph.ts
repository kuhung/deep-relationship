// 图布局类型
export enum GraphLayoutType {
  FORCE = 'force',
  CIRCULAR = 'circular',
  RADIAL = 'radial',
  DAGRE = 'dagre',
  GRID = 'grid',
  CONCENTRIC = 'concentric'
}

// 图布局配置
export const LAYOUT_CONFIGS = {
  [GraphLayoutType.FORCE]: {
    type: 'force',
    linkDistance: 90,
    preventOverlap: false,
    nodeSize: 30,
    nodeSpacing: 20,
    centrality: 'degree',
    animate: false, // 关闭布局动画
    maxIteration: 200, // 限制最大迭代次数，防止过度计算
    enableTick: false, // 禁用持续的 tick
    onLayoutEnd: () => {
      // 布局结束后的回调
      console.log('Force layout completed')
    }
  },
  [GraphLayoutType.CIRCULAR]: {
    type: 'circular',
    radius: 200,
    startRadius: 100,
    endRadius: 300,
    animate: false // 增加animate属性
  },
  [GraphLayoutType.RADIAL]: {
    type: 'radial',
    linkDistance: 120,
    unitRadius: 80,
    preventOverlap: true,
    nodeSize: 30,
    animate: false // 增加animate属性
  },
  [GraphLayoutType.DAGRE]: {
    type: 'dagre',
    rankdir: 'TB',
    nodesep: 20,
    ranksep: 50,
    animate: false // 增加animate属性
  },
  [GraphLayoutType.GRID]: {
    type: 'grid',
    preventOverlap: true,
    nodeSize: 30,
    sortBy: 'degree',
    animate: false // 增加animate属性
  },
  [GraphLayoutType.CONCENTRIC]: {
    type: 'concentric',
    nodeSize: 30,
    minNodeSpacing: 20,
    preventOverlap: true,
    animate: false // 增加animate属性
  }
}

// 节点类型配置
export const NODE_TYPE_CONFIGS = {
  'person': {
    color: '#5B8FF9',
    size: 30,
    label: '人物'
  },
  'organization': {
    color: '#5AD8A6',
    size: 35,
    label: '组织/宗门'
  },
  'location': {
    color: '#5D7092',
    size: 25,
    label: '地点'
  },
  'item': {
    color: '#F6BD16',
    size: 20,
    label: '物品/法宝'
  },
  'skill': {
    color: '#E86452',
    size: 22,
    label: '技能/功法'
  },
  'event': {
    color: '#6DC8EC',
    size: 18,
    label: '事件'
  }
}

// 边类型配置
export const EDGE_TYPE_CONFIGS = {
  'relationship': {
    color: '#5B8FF9',
    label: '人际关系'
  },
  'family': {
    color: '#E86452',
    label: '家族关系'
  },
  'friend': {
    color: '#5AD8A6',
    label: '朋友'
  },
  'enemy': {
    color: '#FF6B6B',
    label: '敌对'
  },
  'master_student': {
    color: '#845EC2',
    label: '师徒'
  },
  'fellow_disciple': {
    color: '#9C88FF',
    label: '同门'
  },
  'dao_companion': {
    color: '#FF9999',
    label: '道侣'
  },
  'puppet': {
    color: '#666666',
    label: '傀儡分身'
  },
  'belongs_to': {
    color: '#F6BD16',
    label: '归属'
  },
  'located_at': {
    color: '#5D7092',
    label: '位于'
  },
  'birthplace': {
    color: '#8B9DC3',
    label: '出生地'
  },
  'residence': {
    color: '#A2A2D0',
    label: '居住地'
  },
  'owns': {
    color: '#FFC75F',
    label: '拥有'
  },
  'learned': {
    color: '#E86452',
    label: '学习'
  },
  'participated': {
    color: '#6DC8EC',
    label: '参与'
  }
}

// 默认节点样式
export const DEFAULT_NODE_STYLE = {
  size: 30,
  labelCfg: {
    position: 'bottom',
    style: {
      fontSize: 12,
      fill: '#333',
      fontWeight: 500,
      background: {
        fill: 'rgba(255, 255, 255, 0.8)',
        padding: [2, 4, 2, 4],
        radius: 4
      }
    }
  },
  style: {
    fill: '#5B8FF9',
    stroke: '#fff',
    lineWidth: 2,
    cursor: 'pointer'
  },
  stateStyles: {
    hover: {
      lineWidth: 3,
      shadowColor: '#000',
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0
    },
    selected: {
      lineWidth: 4,
      stroke: '#1890ff',
      shadowColor: '#1890ff',
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 0
    }
  }
}

// 默认边样式
export const DEFAULT_EDGE_STYLE = {
  style: {
    stroke: '#e2e2e2',
    lineWidth: 2,
    cursor: 'pointer'
  },
  labelCfg: {
    style: {
      fontSize: 10,
      fill: '#666',
      background: {
        fill: 'rgba(255, 255, 255, 0.9)',
        padding: [2, 4, 2, 4],
        radius: 2
      }
    }
  },
  stateStyles: {
    hover: {
      lineWidth: 3,
      stroke: '#1890ff'
    },
    selected: {
      lineWidth: 4,
      stroke: '#1890ff'
    }
  }
}

// 图谱主题配置
export const GRAPH_THEMES = {
  default: {
    background: '#fafafa',
    nodeColors: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E86452', '#6DC8EC'],
    edgeColor: '#e2e2e2'
  },
  dark: {
    background: '#1f1f1f',
    nodeColors: ['#4A90E2', '#7ED321', '#9013FE', '#F5A623', '#D0021B', '#50E3C2'],
    edgeColor: '#666'
  }
}

// 默认选中节点类型
export const DEFAULT_SELECTED_NODE_TYPES = ['person', 'organization']
