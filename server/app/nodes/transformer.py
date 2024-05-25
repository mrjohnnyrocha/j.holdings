from langchain_core.output_parsers import StrOutputParser
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
import os

def transformer(state):
    """
    Transform the query to produce a better question.

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): Updates question key with a re-phrased question
    """

    print("---TRANSFORM QUERY---")
    state_dict = state["keys"]
    question = state_dict["question"]
    documents = state_dict["documents"]


    # Create a prompt template with format instructions and the query
    prompt = PromptTemplate(
        template="""You are generating questions that is well optimized for 
                    retrieval. \n 
        Look at the input and try to reason about the underlying sematic 
        intent / meaning. \n 
        Here is the initial question:
        \n ------- \n
        {question} 
        \n ------- \n
        Provide an improved question without any preamble, only respond 
        with the updated question: """,
        input_variables=["question"],
    )

    # Grader
    llm = ChatGroq(temperature=0, model=os.getenv("LOCAL_LLM"))
    # Prompt
    chain = prompt | llm | StrOutputParser()
    better_question = chain.invoke({"question": question})

    return {
        "keys": {"documents": documents, "question": better_question, 
}
    }
