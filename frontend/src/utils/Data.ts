import { GraphData, NodeData, EdgeData } from '@/types/graph'
import { NODE_TYPE_CONFIGS, EDGE_TYPE_CONFIGS } from '@/constants/graph'

// 凡人修仙传主要人物数据
const MAIN_CHARACTERS = [
  { id: 'hanli', label: '韩立', type: 'person', desc: '主角，从凡人一步步修炼成仙的传奇人物' },
  { id: 'moxian', label: '魔仙', type: 'person', desc: '韩立的师父，传授其修炼之法' },
  { id: 'zhangtiege', label: '张铁', type: 'person', desc: '韩立的好友，共同闯荡修仙界' },
  { id: 'liyuesha', label: '厉月沙', type: 'person', desc: '韩立的道侣之一，冰凤族圣女' },
  { id: 'nanlong', label: '南宫琳', type: 'person', desc: '韩立的道侣，修为高深' },
  { id: 'qilingzi', label: '戚灵子', type: 'person', desc: '韩立的师兄，同门弟子' },
  { id: 'wenqing', label: '温青', type: 'person', desc: '韩立早期的朋友' },
  { id: 'dongxuanzi', label: '董宣子', type: 'person', desc: '修仙界前辈高人' }
]

// 组织/宗门
const ORGANIZATIONS = [
  { id: 'qixuanmen', label: '七玄门', type: 'organization', desc: '韩立最初加入的修仙门派' },
  { id: 'huangfenggu', label: '黄枫谷', type: 'organization', desc: '越国修仙界的大型门派' },
  { id: 'tiannanmeng', label: '天南盟', type: 'organization', desc: '天南地区的修仙者联盟' },
  { id: 'bingfengzu', label: '冰凤族', type: 'organization', desc: '上古遗族，厉月沙所属族群' }
]

// 地点
const LOCATIONS = [
  { id: 'jingzhou', label: '荆州', type: 'location', desc: '韩立的出生地' },
  { id: 'tiannan', label: '天南', type: 'location', desc: '修仙界的一个重要地区' },
  { id: 'luanxinghai', label: '乱星海', type: 'location', desc: '充满危险的修仙海域' },
  { id: 'dajin', label: '大晋', type: 'location', desc: '修仙界的古老国度' }
]

// 法宝/物品
const ITEMS = [
  { id: 'xuantianzhi', label: '玄天之物', type: 'item', desc: '稀有的修仙材料' },
  { id: 'jingjingping', label: '净精瓶', type: 'item', desc: '韩立的重要法宝之一' },
  { id: 'lvyedan', label: '绿液丹', type: 'item', desc: '提升修为的珍贵丹药' },
  { id: 'zhujidan', label: '筑基丹', type: 'item', desc: '筑基期修炼必需的丹药' }
]

// 功法/技能
const SKILLS = [
  { id: 'changchun', label: '长春功', type: 'skill', desc: '韩立修炼的基础功法' },
  { id: 'dayan', label: '大衍决', type: 'skill', desc: '高级修炼功法' },
  { id: 'qingyuan', label: '青元剑诀', type: 'skill', desc: '剑修功法' },
  { id: 'bingfeng', label: '冰凤诀', type: 'skill', desc: '冰凤族的秘传功法' }
]

// 重要事件
const EVENTS = [
  { id: 'ruqi', label: '初入七玄门', type: 'event', desc: '韩立修仙生涯的起点' },
  { id: 'zhujiji', label: '筑基成功', type: 'event', desc: '韩立修为的重要突破' },
  { id: 'luanxing', label: '乱星海历险', type: 'event', desc: '韩立在乱星海的重要经历' },
  { id: 'jiedan', label: '结丹成功', type: 'event', desc: '韩立进入结丹期' }
]

// 生成关系边
function generateEdges(): EdgeData[] {
  const edges: EdgeData[] = []
  
  // 人物关系
  edges.push(
    { id: 'e1', source: 'hanli', target: 'moxian', edgeType: 'master_student', label: '师徒关系' },
    { id: 'e2', source: 'hanli', target: 'zhangtiege', edgeType: 'friend', label: '好友' },
    { id: 'e3', source: 'hanli', target: 'liyuesha', edgeType: 'relationship', label: '道侣' },
    { id: 'e4', source: 'hanli', target: 'nanlong', edgeType: 'relationship', label: '道侣' },
    { id: 'e5', source: 'hanli', target: 'qilingzi', edgeType: 'friend', label: '师兄弟' },
    { id: 'e6', source: 'hanli', target: 'wenqing', edgeType: 'friend', label: '朋友' }
  )

  // 组织归属关系
  edges.push(
    { id: 'e7', source: 'hanli', target: 'qixuanmen', edgeType: 'belongs_to', label: '加入' },
    { id: 'e8', source: 'hanli', target: 'huangfenggu', edgeType: 'belongs_to', label: '加入' },
    { id: 'e9', source: 'liyuesha', target: 'bingfengzu', edgeType: 'belongs_to', label: '族人' },
    { id: 'e10', source: 'qilingzi', target: 'qixuanmen', edgeType: 'belongs_to', label: '弟子' }
  )

  // 地点关系
  edges.push(
    { id: 'e11', source: 'hanli', target: 'jingzhou', edgeType: 'located_at', label: '出生地' },
    { id: 'e12', source: 'qixuanmen', target: 'tiannan', edgeType: 'located_at', label: '位于' },
    { id: 'e13', source: 'huangfenggu', target: 'tiannan', edgeType: 'located_at', label: '位于' }
  )

  // 物品拥有关系
  edges.push(
    { id: 'e14', source: 'hanli', target: 'jingjingping', edgeType: 'owns', label: '拥有' },
    { id: 'e15', source: 'hanli', target: 'zhujidan', edgeType: 'owns', label: '拥有' },
    { id: 'e16', source: 'hanli', target: 'lvyedan', edgeType: 'owns', label: '拥有' }
  )

  // 技能学习关系
  edges.push(
    { id: 'e17', source: 'hanli', target: 'changchun', edgeType: 'learned', label: '修炼' },
    { id: 'e18', source: 'hanli', target: 'dayan', edgeType: 'learned', label: '修炼' },
    { id: 'e19', source: 'liyuesha', target: 'bingfeng', edgeType: 'learned', label: '修炼' }
  )

  // 事件参与关系
  edges.push(
    { id: 'e20', source: 'hanli', target: 'ruqi', edgeType: 'participated', label: '参与' },
    { id: 'e21', source: 'hanli', target: 'zhujiji', edgeType: 'participated', label: '参与' },
    { id: 'e22', source: 'hanli', target: 'luanxing', edgeType: 'participated', label: '参与' },
    { id: 'e23', source: 'hanli', target: 'jiedan', edgeType: 'participated', label: '参与' }
  )

  return edges
}

// 生成所有节点数据
function generateNodes(): NodeData[] {
  const allEntities = [
    ...MAIN_CHARACTERS,
    ...ORGANIZATIONS, 
    ...LOCATIONS,
    ...ITEMS,
    ...SKILLS,
    ...EVENTS
  ]

  return allEntities.map(entity => ({
    id: entity.id,
    label: entity.label,
    nodeType: entity.type,
    properties: {
      description: entity.desc,
      category: entity.type
    },
    color: NODE_TYPE_CONFIGS[entity.type as keyof typeof NODE_TYPE_CONFIGS]?.color || '#5B8FF9',
    size: NODE_TYPE_CONFIGS[entity.type as keyof typeof NODE_TYPE_CONFIGS]?.size || 30
  }))
}

// 生成演示数据
export function generateDemoData(): GraphData {
  const nodes = generateNodes()
  const edges = generateEdges().map(edge => ({
    ...edge,
    color: EDGE_TYPE_CONFIGS[edge.edgeType as keyof typeof EDGE_TYPE_CONFIGS]?.color || '#e2e2e2'
  }))

  return {
    nodes,
    edges
  }
}

// 根据类型过滤数据
export function filterDataByType(data: GraphData, nodeTypes: string[] = [], edgeTypes: string[] = []): GraphData {
  let filteredNodes = data.nodes
  let filteredEdges = data.edges

  if (nodeTypes.length > 0) {
    filteredNodes = data.nodes.filter(node => nodeTypes.includes(node.nodeType))
  }

  if (edgeTypes.length > 0) {
    filteredEdges = data.edges.filter(edge => edgeTypes.includes(edge.edgeType))
  }

  // 确保边的源节点和目标节点都在过滤后的节点中
  const nodeIds = new Set(filteredNodes.map(node => node.id))
  filteredEdges = filteredEdges.filter(edge => 
    nodeIds.has(edge.source) && nodeIds.has(edge.target)
  )

  return {
    nodes: filteredNodes,
    edges: filteredEdges
  }
}

// 根据关键词搜索节点
export function searchNodes(data: GraphData, keyword: string): NodeData[] {
  if (!keyword.trim()) {
    return data.nodes
  }

  const lowerKeyword = keyword.toLowerCase()
  return data.nodes.filter(node => 
    node.label.toLowerCase().includes(lowerKeyword) ||
    node.properties?.description?.toLowerCase().includes(lowerKeyword)
  )
}
