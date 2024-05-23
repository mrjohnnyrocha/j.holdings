from langchain.schema import Document
from langchain_community.retrievers import TavilySearchAPIRetriever


def syncer(state):
    """
    Web search based on the re-phrased question using Tavily API.

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): Web results appended to documents.
    """

    print("---WEB SEARCH---")
    state_dict = state["keys"]
    question = state_dict["question"]
    documents = state_dict["documents"]

    try:
 
        tool = TavilySearchAPIRetriever(k=3)

        docs = tool.invoke(question)
     
        web_results = "\n".join([d["content"] for d in docs])
        web_results = Document(page_content=web_results)
        documents.append(web_results)
    except Exception as error:
        print(error)

    return {"keys": {"documents": documents, "question": question}}
