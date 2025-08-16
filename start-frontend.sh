#!/bin/bash

# 凡人修仙传人物关系图谱前端应用启动脚本
# 作者: kuhung <hi@kuhung.me>
# 时间: 2025年

echo "🚀 启动凡人修仙传人物关系图谱前端应用..."
echo "=============================================="

# 检查 Node.js 版本
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js (>= 18.0.0)"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2)
echo "✅ Node.js 版本: $NODE_VERSION"

# 检查是否在正确的目录
if [ ! -d "frontend" ]; then
    echo "❌ 请确保在项目根目录下运行此脚本"
    exit 1
fi

# 进入前端目录
cd frontend

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败，请检查网络连接"
        exit 1
    fi
    
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已存在"
fi

echo ""
echo "🌟 正在启动开发服务器..."
echo "📱 应用将在 http://localhost:3000 启动"
echo "🔄 支持热重载，修改代码后自动刷新"
echo ""
echo "💡 使用 Ctrl+C 停止服务器"
echo "=============================================="

# 启动开发服务器
npm run dev
