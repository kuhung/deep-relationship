#!/bin/bash

# 定义输入文件和输出目录
INPUT_PDF="data/凡人修仙传.pdf"
OUTPUT_DIR="data/chapters"

# 检查 qpdf 是否安装
if ! command -v qpdf &> /dev/null
then
    echo "qpdf 未安装。请安装 qpdf。在 Debian/Ubuntu 上，运行: sudo apt-get install qpdf"
    echo "在 macOS 上，运行: brew install qpdf"
    exit 1
fi

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 定义卷名和页码范围
# 格式: "卷名 副标题:起始页-结束页"
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

echo "开始按卷分割 PDF..."

for CHAPTER_INFO in "${CHAPTERS[@]}"
do
    # 分割字符串获取卷名和页码范围
    IFS=':' read -r FULL_CHAPTER_NAME PAGE_RANGE <<< "$CHAPTER_INFO"
    
    # 分割页码范围获取起始页和结束页
    IFS='-' read -r START_PAGE END_PAGE <<< "$PAGE_RANGE"

    # 提取卷的数字部分和副标题
    # 例如 "第一卷 七玄门风云"
    CHAPTER_PREFIX_CHINESE=$(echo "$FULL_CHAPTER_NAME" | sed -E 's/(第[一二三四五六七八九十]+卷).*/\1/') # 例如 "第一卷"
    CHAPTER_NUMBER_ONLY_CHINESE=$(echo "$CHAPTER_PREFIX_CHINESE" | sed -E 's/第([一二三四五六七八九十]+)卷/\1/') # 例如 "一"
    
    # 将中文数字转换为阿拉伯数字
    CHAPTER_NUMBER_ARABIC=""
    case "$CHAPTER_NUMBER_ONLY_CHINESE" in
        "一") CHAPTER_NUMBER_ARABIC="1" ;;
        "二") CHAPTER_NUMBER_ARABIC="2" ;;
        "三") CHAPTER_NUMBER_ARABIC="3" ;;
        "四") CHAPTER_NUMBER_ARABIC="4" ;;
        "五") CHAPTER_NUMBER_ARABIC="5" ;;
        "六") CHAPTER_NUMBER_ARABIC="6" ;;
        "七") CHAPTER_NUMBER_ARABIC="7" ;;
        "八") CHAPTER_NUMBER_ARABIC="8" ;;
        "九") CHAPTER_NUMBER_ARABIC="9" ;;
        "十") CHAPTER_NUMBER_ARABIC="10" ;;
        "十一") CHAPTER_NUMBER_ARABIC="11" ;;
        *) CHAPTER_NUMBER_ARABIC="${CHAPTER_NUMBER_ONLY_CHINESE}" ;;
    esac

    FINAL_CHAPTER_PREFIX="第${CHAPTER_NUMBER_ARABIC}卷" # 例如 "第1卷"

    SUB_TITLE=$(echo "$FULL_CHAPTER_NAME" | sed -E 's/第[一二三四五六七八九十]+卷 *(.*)/\1/')
    if [ -n "$SUB_TITLE" ]; then
        FORMATTED_CHAPTER_NAME="${FINAL_CHAPTER_PREFIX}_$(echo "$SUB_TITLE" | tr ' ' '_')"
    else
        FORMATTED_CHAPTER_NAME="${FINAL_CHAPTER_PREFIX}"
    fi

    OUTPUT_PDF="${OUTPUT_DIR}/凡人修仙传_${FORMATTED_CHAPTER_NAME}.pdf"
    echo "正在分割 ${FULL_CHAPTER_NAME} (页码 ${START_PAGE}-${END_PAGE}) 到 ${OUTPUT_PDF}"
    qpdf "$INPUT_PDF" --pages . "$START_PAGE-$END_PAGE" -- "$OUTPUT_PDF"
done

echo "PDF 按卷分割完成。文件保存在 $OUTPUT_DIR 目录下。"
