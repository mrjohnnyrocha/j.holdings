from langchain import hub
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import GPT4AllEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import GPT4AllEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from typing import Dict, TypedDict

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

    url = "https://lilianweng.github.io/posts/2023-06-23-agent/"
    loader = WebBaseLoader(url)
    docs = loader.load()
    # Split
    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=500, chunk_overlap=100
    )
    all_splits = text_splitter.split_documents(docs)
    # Embed and index
    embeddings = GPT4AllEmbeddings()
    # Index
    vectorstore = Chroma.from_documents(
            documents=all_splits,
        collection_name="rag-chroma",
        embedding=embeddings,
    )
    retriever = vectorstore.as_retriever()
    print("---RETRIEVE---")
    state_dict = state["keys"]
    question = state_dict["question"]
    documents = retriever.get_relevant_documents(question)
    
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
    llm = ChatGroq(temperature=0, model_name=os.getenv("LOCAL_LLM"))
    # Post-processing
    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)
    # Chain
    rag_chain = prompt | llm | StrOutputParser()
    # Run
    generation = rag_chain.invoke({"context": documents, "question": question})
    return {
            "keys": {"documents": documents, "question": question, "generation": generation}
    }
