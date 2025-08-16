import { Button, Select, Switch, Slider, Space, Tooltip } from 'antd'
import { 
  ReloadOutlined, 
  DownloadOutlined,
  FullscreenOutlined
} from '@ant-design/icons'
import { GraphConfig } from '@/types/graph'
import { GraphLayoutType } from '@/constants/graph'

interface GraphToolbarProps {
  config: GraphConfig
  onLayoutChange: (layout: GraphLayoutType) => void
  onConfigChange: (config: Partial<GraphConfig>) => void
  onDataRefresh: () => void
}

const GraphToolbar: React.FC<GraphToolbarProps> = ({
  config,
  onLayoutChange,
  onConfigChange,
  onDataRefresh
}) => {
  const layoutOptions = [
    { label: '力导向布局', value: GraphLayoutType.FORCE },
    { label: '环形布局', value: GraphLayoutType.CIRCULAR },
    { label: '径向布局', value: GraphLayoutType.RADIAL },
    { label: 'Dagre布局', value: GraphLayoutType.DAGRE },
    { label: '网格布局', value: GraphLayoutType.GRID },
    { label: '同心圆布局', value: GraphLayoutType.CONCENTRIC }
  ]

  const handleDownload = () => {
    // 这里可以添加导出图片的功能
    console.log('导出功能暂未实现')
  }

  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    }
  }

  return (
    <div className="graph-toolbar">
      <Space direction="vertical" size="middle">
        {/* 布局选择 */}
        <div>
          <div style={{ marginBottom: 8, fontSize: '12px', fontWeight: 500 }}>布局算法</div>
          <Select
            value={config.layout as GraphLayoutType}
            onChange={onLayoutChange}
            style={{ width: 120 }}
            size="small"
            options={layoutOptions}
          />
        </div>

        {/* 节点大小控制 */}
        <div>
          <div style={{ marginBottom: 8, fontSize: '12px', fontWeight: 500 }}>节点大小</div>
          <Slider
            min={10}
            max={60}
            value={config.nodeSize}
            onChange={(value) => onConfigChange({ nodeSize: value })}
            style={{ width: 100 }}
          />
          <div style={{ fontSize: '11px', color: '#666', textAlign: 'center' }}>
            {config.nodeSize}px
          </div>
        </div>

        {/* 标签显示控制 */}
        <div>
          <div style={{ marginBottom: 8, fontSize: '12px', fontWeight: 500 }}>标签显示</div>
          <Space direction="vertical" size="small">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px' }}>节点标签</span>
              <Switch
                size="small"
                checked={config.showNodeLabel}
                onChange={(checked) => onConfigChange({ showNodeLabel: checked })}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px' }}>边标签</span>
              <Switch
                size="small"
                checked={config.showEdgeLabel}
                onChange={(checked) => onConfigChange({ showEdgeLabel: checked })}
              />
            </div>
          </Space>
        </div>

        {/* 动画控制 */}
        <div>
          <div style={{ marginBottom: 8, fontSize: '12px', fontWeight: 500 }}>动画效果</div>
          <Switch
            size="small"
            checked={config.enableAnimation}
            onChange={(checked) => onConfigChange({ enableAnimation: checked })}
          />
        </div>

        {/* 操作按钮 */}
        <div>
          <div style={{ marginBottom: 8, fontSize: '12px', fontWeight: 500 }}>操作</div>
          <Space direction="vertical" size="small">
            <Tooltip title="刷新数据">
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={onDataRefresh}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                刷新
              </Button>
            </Tooltip>
            
            <Tooltip title="导出图片">
              <Button
                type="text"
                size="small"
                icon={<DownloadOutlined />}
                onClick={handleDownload}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                导出
              </Button>
            </Tooltip>
            
            <Tooltip title="全屏显示">
              <Button
                type="text"
                size="small"
                icon={<FullscreenOutlined />}
                onClick={handleFullscreen}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                全屏
              </Button>
            </Tooltip>
          </Space>
        </div>
      </Space>
    </div>
  )
}

export default GraphToolbar
