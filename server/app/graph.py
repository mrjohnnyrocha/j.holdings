from langgraph.graph import END, StateGraph
from typing import Any, Dict, TypedDict


from .nodes.grader import grade_documents
from .nodes.syncer import syncer
from .nodes.transformer import transformer
from .nodes.rag import retrieve, generator


class GraphState(TypedDict):
    """
    Represents the state of our graph.

    Attributes:
        keys: A dictionary where each key is a string.
    """

    keys: Dict[str, any]


def decide_to_generate(state):
    """
    Determines whether to generator an answer or re-generator a question
    for web search.

    Args:
        state (dict): The current state of the agent, including all keys.

    Returns:
        str: Next node to call
    """

    print("---DECIDE TO generator---")
    state_dict = state["keys"]
    question = state_dict["question"]
    filtered_documents = state_dict["documents"]
    search = state_dict.get("run_web_search")

    if search == "Yes":
        # All documents have been filtered check_relevance
        # We will re-generator a new query
        print("---DECISION: TRANSFORM QUERY and RUN WEB SEARCH---")
        return "transformer"
    else:
        # We have relevant documents, so generator answer
        print("---DECISION: generator---")
        return "generator"


class Graph:
    """
    Define the graph structure for the AI agent.
    """

    def __init__(self):
        pass

    def build(self):
        workflow = StateGraph(GraphState)

        # Define the nodes
        workflow.add_node("retrieve", retrieve)  # retrieve
       # workflow.add_node("grader", grade_documents)  # grade documents
        workflow.add_node("generator", generator)  # generator
        workflow.add_node("transformer", transformer)  # transformer
        workflow.add_node("syncer", syncer)  # web search

        # Build graph
        workflow.set_entry_point("retrieve")
    #    workflow.add_edge("retrieve", "grader")
        workflow.add_conditional_edges(
          #  "grader",
           "retrieve",
            decide_to_generate,
            {
                "transformer": "transformer",
                "generator": "generator",
            },
        )
        workflow.add_edge("transformer", "syncer")
        workflow.add_edge("syncer", "generator")
        workflow.add_edge("generator", END)

        # Compile
        app = workflow.compile()
        return app
