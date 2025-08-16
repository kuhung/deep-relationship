#!/bin/bash

# 定义输入文件和输出目录
INPUT_PDF="data/凡人修仙传.pdf"
OUTPUT_DIR="data/split_pdfs"
NUM_PARTS=15

# 检查 qpdf 是否安装
if ! command -v qpdf &> /dev/null
then
    echo "qpdf 未安装。请安装 qpdf。在 Debian/Ubuntu 上，运行: sudo apt-get install qpdf"
    echo "在 macOS 上，运行: brew install qpdf"
    exit 1
fi

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 获取总页数
TOTAL_PAGES=$(qpdf --show-npages "$INPUT_PDF")

# 计算每部分的页数
PAGES_PER_PART=$(( (TOTAL_PAGES + NUM_PARTS - 1) / NUM_PARTS )) # 向上取整

echo "PDF 总页数: $TOTAL_PAGES"
echo "每部分大约页数: $PAGES_PER_PART"

# 分割 PDF
for (( i=0; i<NUM_PARTS; i++ ))
do
    START_PAGE=$(( i * PAGES_PER_PART + 1 ))
    END_PAGE=$(( (i + 1) * PAGES_PER_PART ))

    # 确保结束页不超过总页数
    if (( END_PAGE > TOTAL_PAGES )); then
        END_PAGE=$TOTAL_PAGES
    fi

    # 如果开始页大于结束页，则跳过（避免创建空文件）
    if (( START_PAGE > END_PAGE )); then
        continue
    fi

    OUTPUT_PDF="${OUTPUT_DIR}/凡人修仙传_part_$(printf %02d $((i+1))).pdf"
    echo "正在分割第 $((i+1)) 部分 (页码 $START_PAGE-$END_PAGE) 到 $OUTPUT_PDF"
    qpdf "$INPUT_PDF" --pages . "$START_PAGE-$END_PAGE" -- "$OUTPUT_PDF"
done

echo "PDF 分割完成。文件保存在 $OUTPUT_DIR 目录下。"
