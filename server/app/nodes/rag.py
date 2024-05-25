#import chromadb
from langchain import hub
from langchain_core.output_parsers import StrOutputParser
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from typing import Dict, TypedDict
from .scripts import CONTEXT
import os


class GraphState(TypedDict):
    """
    Represents the state of our graph.

    Attributes:
        keys: A dictionary where each key is a string.
    """

    keys: Dict[str, any]

def retrieve(state):
    """
    Retrieve documents
    Args:
        state (dict): The current graph state
    Returns:
        state (dict): New key added to state, documents,
        that contains retrieved documents
    """
    # Split documents

   
    # vectorstore = chromadb.PersistentClient(path="chromadb-client/")
    # retriever = vectorstore.as_retriever()
    print("---RETRIEVE---")
    state_dict = state["keys"]
    question = state_dict["question"]
    # documents = retriever.invoke(question)
    documents = CONTEXT
    return {"keys": {"documents": documents, "question": question}}
def generator(state):
    """
    generator answer
    Args:
        state (dict): The current graph state
    Returns:
        state (dict): New key added to state, generation,
        that contains LLM generation
    """
    print("---generator---")

    state_dict = state["keys"]
    question = state_dict["question"]
    documents = state_dict["documents"]
  
    # Prompt
    prompt = hub.pull("rlm/rag-prompt")

    # LLM Setup
    llm = ChatGroq(temperature=0, model=os.getenv("LOCAL_LLM"))
    # Post-processing
    # def format_docs(docs):
    #     return "\n\n".join(doc.page_content for doc in docs)
    # # Chain
    rag_chain = prompt | llm | StrOutputParser()
    # Run
    generation = rag_chain.invoke({"context": documents, "question": question})

    return {
            "keys": {"documents": documents, "question": question, "generation": generation}
    }
