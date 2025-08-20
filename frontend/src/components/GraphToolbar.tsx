import { Button, Select, Switch, Slider, Space, Tooltip, Drawer } from 'antd'
import { 
    // ReloadOutlined, 
  CoffeeOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { GraphConfig } from '@/types/graph'
import { GraphLayoutType } from '@/constants/graph'

interface GraphToolbarProps {
  config: GraphConfig
  onLayoutChange: (layout: GraphLayoutType) => void
  onConfigChange: (config: Partial<GraphConfig>) => void
  onDataRefresh: () => void
  onShowSponsorModal: () => void
  onShowJoinGroupModal: () => void
  isMobile?: boolean
  open?: boolean
  onClose?: () => void
}

const GraphToolbar: React.FC<GraphToolbarProps> = ({
  config,
  onLayoutChange,
  onConfigChange,
  // onDataRefresh,
  onShowSponsorModal,
  onShowJoinGroupModal,
  isMobile,
  open,
  onClose
}) => {
  const layoutOptions = [
    { label: '力导向布局', value: GraphLayoutType.FORCE },
    // { label: '环形布局', value: GraphLayoutType.CIRCULAR }, 数据量大的时候出现卡顿
    // { label: '径向布局', value: GraphLayoutType.RADIAL },
    // { label: 'Dagre布局', value: GraphLayoutType.DAGRE }, 布局不好看
    { label: '网格布局', value: GraphLayoutType.GRID },
    { label: '同心圆布局', value: GraphLayoutType.CONCENTRIC }
  ]


  const toolbarContent = (
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
          <div style={{ marginBottom: 8, fontSize: '12px', fontWeight: 500 }}>效果显示</div>
          <Space direction="vertical" size="small">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', marginRight: '8px' }}>节点标签</span>
              <Switch
                size="small"
                checked={config.showNodeLabel}
                onChange={(checked) => onConfigChange({ showNodeLabel: checked })}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', marginRight: '8px' }}>边标签</span>
              <Switch
                size="small"
                checked={config.showEdgeLabel}
                onChange={(checked) => onConfigChange({ showEdgeLabel: checked })}
              />
            </div>
            {/* 动画控制 */}
            {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', marginRight: '8px' }}>开启动画</span>
              <Switch
                size="small"
                checked={config.enableAnimation}
                onChange={(checked) => onConfigChange({ enableAnimation: checked })}
              />
            </div> */}
          </Space>
        </div>

        {/* 操作按钮 */}
        <div>
          <div style={{ marginBottom: 8, fontSize: '12px', fontWeight: 500 }}>更多操作</div>
          <Space direction="vertical" size="small">
            {/* <Tooltip title="导出图片">
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
            </Tooltip> */}

            <Tooltip title="反馈交流">
              <Button
                type="text"
                size="small"
                icon={<TeamOutlined />}
                onClick={onShowJoinGroupModal}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                加群
              </Button>
            </Tooltip>
            <Tooltip title="打赏支持">
              <Button
                type="text"
                size="small"
                icon={<CoffeeOutlined />}
                onClick={onShowSponsorModal}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                打赏
              </Button>
            </Tooltip>
            {/* <Tooltip title="刷新数据">
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={onDataRefresh}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                刷新
              </Button>
            </Tooltip> */}
          </Space>
        </div>
    </Space>
  )

  if (isMobile) {
    return (
      <Drawer
        title="设置"
        placement="right"
        open={open}
        onClose={onClose}
        width={240}
      >
        <div className="graph-toolbar-mobile">
          {toolbarContent}
        </div>
      </Drawer>
    )
  }


  return (
    <div className="graph-toolbar">
      {toolbarContent}
    </div>
  )
}

export default GraphToolbar
