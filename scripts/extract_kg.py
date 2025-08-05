import os
import json
from kg_gen import KGGen

def extract_knowledge():
    """
    从小说文本中抽取知识图谱。
    """
    # 确保已设置环境变量 OPENAI_API_KEY
    # 为了保证抽取质量，建议使用能力较强的LLM，如 gpt-4o
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("请设置 OPENAI_API_KEY 环境变量")

    kg = KGGen(model="openai/gpt-4o", api_key=api_key)

    # 读取小说文本
    try:
        with open("data/fanren_xiuxian_zhuan.txt", "r", encoding="utf-8") as f:
            novel_text = f.read()
    except FileNotFoundError:
        print("错误：未找到小说文本文件 'data/fanren_xiuxian_zhuan.txt'")
        print("请先将小说文本放置到正确的位置。")
        return

    # 定义指导LLM进行抽取的提示（Prompt）
    context_prompt = """
    你是一个熟读《凡人修仙传》的专家。请从以下文本中，严格按照 (人物A, 关系, 人物B) 的格式，抽取所有人物之间的关系三元组。
    关系类型请从以下列表中选择：[师徒, 父子, 母子, 夫妻, 敌人, 盟友, 同门]。
    如果存在书中未明确但可以合理推断的关系，也请抽取出来。只输出三元组列表，不要任何其他解释。
    """

    print("开始从文本中抽取知识图谱，这可能需要很长时间...")
    # 以5000个字符为一块进行处理，以避免超出LLM的上下文窗口
    graph = kg.generate(input_data=novel_text, chunk_size=5000, context=context_prompt)
    print("知识图谱抽取完成！")

    # 将初步结果保存为JSON文件，用于快速验证和后续导入
    graph_data = {
        "nodes": [{"id": entity} for entity in graph.entities],
        "edges": [{"source": r[0], "target": r[2], "label": r[1]} for r in graph.relations]
    }

    output_path = "data/fanren_kg.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(graph_data, f, ensure_ascii=False, indent=2)

    print(f"抽取的知识图谱已保存到 {output_path}")
    print(f"共抽取到 {len(graph.entities)} 个实体，{len(graph.relations)} 个关系。")

if __name__ == "__main__":
    extract_knowledge() 