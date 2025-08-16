#!/bin/bash

# 定义输入文件和输出目录
INPUT_PDF="data/凡人修仙传.pdf"
OUTPUT_DIR="data/chapters_advanced"
MAX_PAGES=800
# 在目标页码前后寻找章节标题的范围
SEARCH_WINDOW=50

# 检查依赖
if ! command -v qpdf &> /dev/null || ! command -v pdftotext &> /dev/null; then
    echo "错误：qpdf 或 pdftotext 未安装。"
    echo "在 macOS 上，请运行: brew install qpdf poppler"
    echo "在 Debian/Ubuntu 上，请运行: sudo apt-get install qpdf poppler-utils"
    exit 1
fi

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 定义卷名和页码范围
CHAPTERS=(
    "第一卷 七玄门风云:4-410"
    "第二卷 初踏修仙路:411-757"
    "第三卷 魔道入侵:758-1876"
    "第四卷 风起海外:1877-3185"
    "第五卷 名震一方:3186-4285"
    "第六卷 通天灵宝:4286-6315"
    "第七卷 纵横人界:6316-7234"
    "第八卷 初入灵界:7235-7857"
    "第九卷 灵界百族:7858-10545"
    "第十卷 魔界之战:10546-13320"
    "第十一卷 真仙降世:13321-15172"
)

# --- 函数定义 ---

# 将中文数字转换为阿拉伯数字
chinese_to_arabic() {
    case "$1" in
        "一") echo "1" ;; "二") echo "2" ;; "三") echo "3" ;;
        "四") echo "4" ;; "五") echo "5" ;; "六") echo "6" ;;
        "七") echo "7" ;; "八") echo "8" ;; "九") echo "9" ;;
        "十") echo "10" ;; "十一") echo "11" ;;
        *) echo "$1" ;;
    esac
}

# 格式化文件名
format_filename() {
    local full_name="$1"
    local part_num="$2"
    local number_only_chinese=$(echo "$full_name" | sed -E 's/第([一二三四五六七八九十]+)卷.*/\1/')
    local number_arabic=$(chinese_to_arabic "$number_only_chinese")
    local sub_title=$(echo "$full_name" | sed -E 's/第[一二三四五六七八九十]+卷 *(.*)/\1/')
    local base_name="凡人修仙传_第${number_arabic}卷_$(echo "$sub_title" | tr ' ' '_')"
    
    if [ -n "$part_num" ]; then
        echo "${base_name}_part${part_num}.pdf"
    else
        echo "${base_name}.pdf"
    fi
}

# 执行 qpdf 分割
split_pdf() {
    local start_p="$1"
    local end_p="$2"
    local out_file="$3"
    echo "  -> 正在创建文件: $out_file (页码 $start_p-$end_p)"
    qpdf "$INPUT_PDF" --pages . "$start_p-$end_p" -- "$OUTPUT_PDF_PATH"
}

# --- 主逻辑 ---

echo "开始高级 PDF 分割..."

for CHAPTER_INFO in "${CHAPTERS[@]}"; do
    IFS=':' read -r FULL_CHAPTER_NAME PAGE_RANGE <<< "$CHAPTER_INFO"
    IFS='-' read -r CHAPTER_START_PAGE CHAPTER_END_PAGE <<< "$PAGE_RANGE"
    
    echo "处理: $FULL_CHAPTER_NAME (页码 $CHAPTER_START_PAGE-$CHAPTER_END_PAGE)"
    
    TOTAL_PAGES=$((CHAPTER_END_PAGE - CHAPTER_START_PAGE + 1))
    
    if (( TOTAL_PAGES <= MAX_PAGES )); then
        # 页数小于等于800，直接分割
        OUTPUT_FILENAME=$(format_filename "$FULL_CHAPTER_NAME")
        OUTPUT_PDF_PATH="${OUTPUT_DIR}/${OUTPUT_FILENAME}"
        split_pdf "$CHAPTER_START_PAGE" "$CHAPTER_END_PAGE" "$OUTPUT_FILENAME"
    else
        # 页数大于800，需要子分割
        CURRENT_START_PAGE=$CHAPTER_START_PAGE
        PART_NUM=1
        
        while (( CURRENT_START_PAGE <= CHAPTER_END_PAGE )); do
            REMAINING_PAGES=$((CHAPTER_END_PAGE - CURRENT_START_PAGE + 1))
            
            if (( REMAINING_PAGES <= MAX_PAGES )); then
                # 剩余页数不足，直接分割剩余部分
                OUTPUT_FILENAME=$(format_filename "$FULL_CHAPTER_NAME" "$PART_NUM")
                OUTPUT_PDF_PATH="${OUTPUT_DIR}/${OUTPUT_FILENAME}"
                split_pdf "$CURRENT_START_PAGE" "$CHAPTER_END_PAGE" "$OUTPUT_FILENAME"
                break
            fi
            
            TARGET_SPLIT_PAGE=$((CURRENT_START_PAGE + MAX_PAGES - 1))
            
            # 定义搜索范围
            SEARCH_START=$((TARGET_SPLIT_PAGE - SEARCH_WINDOW))
            SEARCH_END=$((TARGET_SPLIT_PAGE + SEARCH_WINDOW))
            # 确保搜索范围不越界
            [ $SEARCH_START -lt $CURRENT_START_PAGE ] && SEARCH_START=$CURRENT_START_PAGE
            [ $SEARCH_END -gt $CHAPTER_END_PAGE ] && SEARCH_END=$CHAPTER_END_PAGE
            
            echo "  -> 卷太大，寻找分割点... 目标页: $TARGET_SPLIT_PAGE, 搜索范围: $SEARCH_START-$SEARCH_END"
            
            # 提取文本并寻找最近的章节页码
            # 使用 `pdftotext -layout` 保留布局，并用 awk 处理
            BEST_PAGE=$(pdftotext -f "$SEARCH_START" -l "$SEARCH_END" -layout "$INPUT_PDF" - | \
                awk -v target="$TARGET_SPLIT_PAGE" '
                BEGIN { best_p=0; min_diff=99999; page=f }
                /\f/ { page++; next }
                /^ *第[一二三四五六七八九十百千万零]+章/ {
                    current_p = f + page
                    diff = (current_p > target) ? (current_p - target) : (target - current_p)
                    if (diff < min_diff) {
                        min_diff = diff
                        best_p = current_p
                    }
                }
                END { print best_p }' f="$SEARCH_START")

            
            local SPLIT_END_PAGE
            if [[ -n "$BEST_PAGE" && "$BEST_PAGE" -gt "$CURRENT_START_PAGE" ]]; then
                echo "  -> 找到最近的章节在第 $BEST_PAGE 页"
                SPLIT_END_PAGE=$((BEST_PAGE - 1))
            else
                echo "  -> 未在范围内找到章节标题，强制在 ${MAX_PAGES} 页处分割"
                SPLIT_END_PAGE=$((CURRENT_START_PAGE + MAX_PAGES - 1))
            fi

            OUTPUT_FILENAME=$(format_filename "$FULL_CHAPTER_NAME" "$PART_NUM")
            OUTPUT_PDF_PATH="${OUTPUT_DIR}/${OUTPUT_FILENAME}"
            split_pdf "$CURRENT_START_PAGE" "$SPLIT_END_PAGE" "$OUTPUT_FILENAME"
            
            CURRENT_START_PAGE=$((SPLIT_END_PAGE + 1))
            ((PART_NUM++))
        done
    fi
done

echo "PDF 高级分割完成。文件保存在 $OUTPUT_DIR 目录下。"
