import os
import json
from neo4j import GraphDatabase

class Neo4jImporter:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def import_data(self, graph_data):
        with self.driver.session() as session:
            # 清空现有数据库，以防重复导入
            print("正在清空现有数据库...")
            session.run("MATCH (n) DETACH DELETE n")
            print("数据库已清空。")

            nodes = graph_data.get("nodes", [])
            edges = graph_data.get("edges", [])

            # 使用 UNWIND 批量导入节点
            print(f"正在导入 {len(nodes)} 个节点...")
            session.run("""
            UNWIND $nodes AS node_data
            MERGE (c:Character {name: node_data.id})
            """, nodes=nodes)
            print("节点导入完成。")

            # 使用 UNWIND 批量导入关系
            print(f"正在导入 {len(edges)} 个关系...")
            session.run("""
            UNWIND $edges AS edge_data
            MATCH (a:Character {name: edge_data.source})
            MATCH (b:Character {name: edge_data.target})
            MERGE (a)-[:RELATION {type: edge_data.label}]->(b)
            """, edges=edges)
            print("关系导入完成。")

def main():
    """
    主函数，执行数据导入流程。
    """
    # 从环境变量中获取 Neo4j 的连接信息，请根据实际情况修改
    # 默认密码在 README.md 的 docker run 命令中设置
    NEO4J_URI = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USER = os.environ.get("NEO4J_USER", "neo4j")
    NEO4J_PASSWORD = os.environ.get("NEO4J_PASSWORD", "your_password") # 请替换为你的密码

    json_path = "data/fanren_kg.json"

    try:
        with open(json_path, "r", encoding="utf-8") as f:
            graph_data = json.load(f)
    except FileNotFoundError:
        print(f"错误：未找到数据文件 '{json_path}'")
        print("请先运行 'scripts/extract_kg.py' 生成数据文件。")
        return
    except json.JSONDecodeError:
        print(f"错误：无法解析数据文件 '{json_path}'，请检查文件格式是否正确。")
        return

    importer = Neo4jImporter(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD)
    try:
        print("开始向 Neo4j 导入数据...")
        importer.import_data(graph_data)
        print("数据导入成功！")
    except Exception as e:
        print(f"数据导入过程中发生错误: {e}")
    finally:
        importer.close()

if __name__ == "__main__":
    main() 