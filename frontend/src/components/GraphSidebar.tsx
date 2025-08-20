import { useState, useMemo } from 'react'
import { 
  Card, 
  Input, 
  List, 
  Tag, 
  Typography, 
  Space, 
  Divider, 
  Statistic, 
  Row, 
  Col,
  Drawer,
  Tabs
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { NodeData, GraphData, GraphStats } from '@/types/graph'
import { NODE_TYPE_CONFIGS, EDGE_TYPE_CONFIGS, DEFAULT_SELECTED_NODE_TYPES } from '@/constants/graph'
import { searchNodes } from '@/utils/Data'

const { Text } = Typography

interface GraphSidebarProps {
  selectedNode: NodeData | null
  stats: GraphStats
  data: GraphData
  onNodeSelect: (node: NodeData) => void
  onNodeTypeSelect: (nodeTypes: string[]) => void
  isMobile?: boolean
  open?: boolean
  onClose?: () => void
}

const GraphSidebar: React.FC<GraphSidebarProps> = ({
  selectedNode,
  stats,
  data,
  onNodeSelect,
  onNodeTypeSelect,
  isMobile,
  open,
  onClose
}) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedNodeTypes, setSelectedNodeTypes] = useState<string[]>(DEFAULT_SELECTED_NODE_TYPES)

  // 搜索结果
  const searchResults = useMemo(() => {
    return searchNodes(data, searchKeyword)
  }, [data, searchKeyword])

  // 节点类型统计
  const nodeTypeStats = useMemo(() => {
    const typeCount: Record<string, number> = {}
    data.nodes.forEach(node => {
      typeCount[node.nodeType] = (typeCount[node.nodeType] || 0) + 1
    })
    return Object.entries(typeCount).map(([type, count]) => ({
      type,
      count,
      label: NODE_TYPE_CONFIGS[type as keyof typeof NODE_TYPE_CONFIGS]?.label || type,
      color: NODE_TYPE_CONFIGS[type as keyof typeof NODE_TYPE_CONFIGS]?.color || '#5B8FF9'
    }))
  }, [data.nodes])

  // 边类型统计
  const edgeTypeStats = useMemo(() => {
    const typeCount: Record<string, number> = {}
    data.edges.forEach(edge => {
      typeCount[edge.edgeType] = (typeCount[edge.edgeType] || 0) + 1
    })
    return Object.entries(typeCount).map(([type, count]) => ({
      type,
      count,
      label: EDGE_TYPE_CONFIGS[type as keyof typeof EDGE_TYPE_CONFIGS]?.label || type,
      color: EDGE_TYPE_CONFIGS[type as keyof typeof EDGE_TYPE_CONFIGS]?.color || '#e2e2e2'
    }))
  }, [data.edges])

  const sidebarContent = (
    <>
      {/* 搜索功能 */}
      <div className="graph-search">
        <Input
          placeholder="搜索节点..."
          prefix={<SearchOutlined />}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          allowClear
        />
        
        {searchKeyword && (
          <div style={{ marginTop: 12, maxHeight: '200px', overflow: 'auto' }}>
            <List
              size="small"
              dataSource={searchResults}
              renderItem={(node) => (
                <List.Item
                  style={{ cursor: 'pointer', padding: '8px 0' }}
                  onClick={() => onNodeSelect(node)}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: node.color,
                            display: 'inline-block'
                          }}
                        />
                        {node.label}
                      </Space>
                    }
                    description={
                      <Text type="secondary" style={{ fontSize: '11px' }}>
                        {NODE_TYPE_CONFIGS[node.nodeType as keyof typeof NODE_TYPE_CONFIGS]?.label}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </div>

      <Divider style={{ margin: '12px 0' }} />

      {/* 选中节点信息 */}
      {selectedNode ? (
        <div className="node-info-panel">
          <Card size="small" title="节点详情">
            <div className="node-info-title">{selectedNode.label}</div>
            
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <div className="node-info-item">
                <Text type="secondary">类型：</Text>
                <Tag color={selectedNode.color}>
                  {NODE_TYPE_CONFIGS[selectedNode.nodeType as keyof typeof NODE_TYPE_CONFIGS]?.label || selectedNode.nodeType}
                </Tag>
              </div>
              
              <div className="node-info-item">
                <Text type="secondary">ID：</Text>
                <Text code>{selectedNode.id}</Text>
              </div>
              
              {selectedNode.properties?.description && (
                <div className="node-info-item">
                  <Text type="secondary">描述：</Text>
                  <div style={{ marginTop: 4 }}>
                    <Text>{selectedNode.properties.description}</Text>
                  </div>
                </div>
              )}

              {selectedNode.properties && Object.keys(selectedNode.properties).length > 1 && (
                <div className="node-info-item">
                  <Text type="secondary">其他属性：</Text>
                  <div style={{ marginTop: 4 }}>
                    {Object.entries(selectedNode.properties).map(([key, value]) => {
                      if (key === 'description') return null
                      return (
                        <div key={key} style={{ fontSize: '12px', marginBottom: 2 }}>
                          <Text type="secondary">{key}：</Text>
                          <Text>{String(value)}</Text>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </Space>
          </Card>
        </div>
      ) : (
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Text type="secondary">点击节点查看详细信息</Text>
        </div>
      )}

      <Divider style={{ margin: '12px 0' }} />

      {/* 统计信息 */}
      <div className="graph-stats">
        <Card size="small" title="图谱统计">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic title="节点数量" value={stats.nodeCount} />
            </Col>
            <Col span={12}>
              <Statistic title="边数量" value={stats.edgeCount} />
            </Col>
            <Col span={12}>
              <Statistic title="节点类型" value={stats.nodeTypes} />
            </Col>
            <Col span={12}>
              <Statistic title="关系类型" value={stats.edgeTypes} />
            </Col>
          </Row>
        </Card>
      </div>

      <Divider style={{ margin: '12px 0' }} />

      {/* 节点类型图例 */}
      <div className="graph-legend">
        <Card size="small" title="节点类型">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {nodeTypeStats.map(({ type, count, label, color }) => (
              <div
                key={type}
                className="legend-item"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const newSelectedNodeTypes = selectedNodeTypes.includes(type)
                    ? selectedNodeTypes.filter(t => t !== type)
                    : [...selectedNodeTypes, type]
                  setSelectedNodeTypes(newSelectedNodeTypes)
                  onNodeTypeSelect(newSelectedNodeTypes)
                }}
              >
                <div
                  className="legend-color"
                  style={{
                    backgroundColor: selectedNodeTypes.includes(type) ? color : 'white',
                    border: `2px solid ${color}`,
                    opacity: selectedNodeTypes.includes(type) ? 1 : 0.5 // 增加透明度以示区分
                  }}
                />
                <Text style={{ flex: 1, fontSize: '12px' }}>{label}</Text>
                <Text type="secondary" style={{ fontSize: '11px' }}>({count})</Text>
              </div>
            ))}
          </Space>
        </Card>
      </div>

      <Divider style={{ margin: '12px 0' }} />

      {/* 关系类型图例 */}
      <div className="graph-legend">
        <Card size="small" title="关系类型">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {edgeTypeStats.map(({ type, count, label, color }) => (
              <div key={type} className="legend-item">
                <div
                  style={{
                    width: '12px',
                    height: '2px',
                    backgroundColor: color,
                    marginRight: '8px',
                    marginTop: '5px'
                  }}
                />
                <Text style={{ flex: 1, fontSize: '12px' }}>{label}</Text>
                <Text type="secondary" style={{ fontSize: '11px' }}>({count})</Text>
              </div>
            ))}
          </Space>
        </Card>
      </div>
    </>
  )

  const mobileSidebarContent = (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="节点详情" key="1">
        {/* 搜索功能 */}
        <div className="graph-search">
          <Input
            placeholder="搜索节点..."
            prefix={<SearchOutlined />}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            allowClear
          />
          
          {searchKeyword && (
            <div style={{ marginTop: 12, maxHeight: '150px', overflow: 'auto' }}>
              <List
                size="small"
                dataSource={searchResults}
                renderItem={(node) => (
                  <List.Item
                    style={{ cursor: 'pointer', padding: '8px 0' }}
                    onClick={() => {
                      onNodeSelect(node)
                      if (onClose) onClose()
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <Space>
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: node.color,
                              display: 'inline-block'
                            }}
                          />
                          {node.label}
                        </Space>
                      }
                      description={
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {NODE_TYPE_CONFIGS[node.nodeType as keyof typeof NODE_TYPE_CONFIGS]?.label}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>
        <Divider style={{ margin: '12px 0' }} />
        {/* 选中节点信息 */}
        {selectedNode ? (
          <div className="node-info-panel">
            <Card size="small" title="节点详情">
              <div className="node-info-title">{selectedNode.label}</div>
              
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div className="node-info-item">
                  <Text type="secondary">类型：</Text>
                  <Tag color={selectedNode.color}>
                    {NODE_TYPE_CONFIGS[selectedNode.nodeType as keyof typeof NODE_TYPE_CONFIGS]?.label || selectedNode.nodeType}
                  </Tag>
                </div>
                
                <div className="node-info-item">
                  <Text type="secondary">ID：</Text>
                  <Text code>{selectedNode.id}</Text>
                </div>
                
                {selectedNode.properties?.description && (
                  <div className="node-info-item">
                    <Text type="secondary">描述：</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text>{selectedNode.properties.description}</Text>
                    </div>
                  </div>
                )}

                {selectedNode.properties && Object.keys(selectedNode.properties).length > 1 && (
                  <div className="node-info-item">
                    <Text type="secondary">其他属性：</Text>
                    <div style={{ marginTop: 4 }}>
                      {Object.entries(selectedNode.properties).map(([key, value]) => {
                        if (key === 'description') return null
                        return (
                          <div key={key} style={{ fontSize: '12px', marginBottom: 2 }}>
                            <Text type="secondary">{key}：</Text>
                            <Text>{String(value)}</Text>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </Space>
            </Card>
          </div>
        ) : (
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <Text type="secondary">点击节点查看详细信息</Text>
          </div>
        )}
      </Tabs.TabPane>
      <Tabs.TabPane tab="图谱统计" key="2">
        <div className="graph-stats">
          <Card size="small" title="图谱统计">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="节点数量" value={stats.nodeCount} />
              </Col>
              <Col span={12}>
                <Statistic title="边数量" value={stats.edgeCount} />
              </Col>
              <Col span={12}>
                <Statistic title="节点类型" value={stats.nodeTypes} />
              </Col>
              <Col span={12}>
                <Statistic title="关系类型" value={stats.edgeTypes} />
              </Col>
            </Row>
          </Card>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="图例" key="3">
        {/* 节点类型图例 */}
        <div className="graph-legend">
          <Card size="small" title="节点类型">
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {nodeTypeStats.map(({ type, count, label, color }) => (
                <div
                  key={type}
                  className="legend-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const newSelectedNodeTypes = selectedNodeTypes.includes(type)
                      ? selectedNodeTypes.filter(t => t !== type)
                      : [...selectedNodeTypes, type]
                    setSelectedNodeTypes(newSelectedNodeTypes)
                    onNodeTypeSelect(newSelectedNodeTypes)
                  }}
                >
                  <div
                    className="legend-color"
                    style={{
                      backgroundColor: selectedNodeTypes.includes(type) ? color : 'white',
                      border: `2px solid ${color}`,
                      opacity: selectedNodeTypes.includes(type) ? 1 : 0.5 // 增加透明度以示区分
                    }}
                  />
                  <Text style={{ flex: 1, fontSize: '12px' }}>{label}</Text>
                  <Text type="secondary" style={{ fontSize: '11px' }}>({count})</Text>
                </div>
              ))}
            </Space>
          </Card>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* 关系类型图例 */}
        <div className="graph-legend">
          <Card size="small" title="关系类型">
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {edgeTypeStats.map(({ type, count, label, color }) => (
                <div key={type} className="legend-item">
                  <div
                    style={{
                      width: '12px',
                      height: '2px',
                      backgroundColor: color,
                      marginRight: '8px',
                      marginTop: '5px'
                    }}
                  />
                  <Text style={{ flex: 1, fontSize: '12px' }}>{label}</Text>
                  <Text type="secondary" style={{ fontSize: '11px' }}>({count})</Text>
                </div>
              ))}
            </Space>
          </Card>
        </div>
      </Tabs.TabPane>
    </Tabs>
  )
  
  if (isMobile) {
    return (
      <Drawer
        title="详细信息"
        placement="bottom"
        open={open}
        onClose={onClose}
        height="80%"
      >
        {mobileSidebarContent}
      </Drawer>
    )
  }

  return (
    <div className="graph-sidebar">
      {sidebarContent}
    </div>
  )
}

export default GraphSidebar
