class LangChainGraph:
    def __init__(self):
        self.nodes = {}
        self.edges = {}

    def add_node(self, node_id, info):
        self.nodes[node_id] = info

    def add_edge(self, from_node, to_node):
        if from_node in self.nodes and to_node in self.nodes:
            self.edges.setdefault(from_node, []).append(to_node)


graph = LangChainGraph()


def update_conversation_graph(user_id, text):
    node_id = len(graph.nodes) + 1
    graph.add_node(node_id, {"text": text, "user_id": user_id})

    return node_id
