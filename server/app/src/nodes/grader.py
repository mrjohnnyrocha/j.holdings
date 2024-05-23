 #nodes/grader.py
from langchain.output_parsers import PydanticOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from logging import getLogger
logger = getLogger(__name__)
import json
import os
import re

def find_json_in_string(input_string):
    # Regex pattern to match simple JSON objects or arrays
    json_pattern = r'(\{[^{}]*\}|\[[^\[\]]*\])'
    
    matches = re.findall(json_pattern, input_string)
    if matches:
        matches = [json.loads(match) for match in matches]
    return matches


def grade_documents(state):
    """
    Determines whether the retrieved documents are relevant to the question.

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): Updates documents key with relevant documents
    """

    logger.debug("---CHECK RELEVANCE---")
    
    state_dict = state["keys"]
    question = state_dict["question"]
    documents = state_dict["documents"]
  
    llm = ChatGroq(temperature=0, model=os.getenv("LOCAL_LLM"))

    # Data model
    class Grade(BaseModel):
        """Binary score for relevance check."""

        score: str = Field(description="Relevance score 'yes' or 'no'")

    # Set up a parser + inject instructions into the prompt template.
    logger.debug("---Grade: DOCUMENT RELEVANCE---")
    parser = PydanticOutputParser(pydantic_object=Grade)
    logger.debug("---Grade: DOCUMENT RELEVANCE---")
    from langchain_core.output_parsers import JsonOutputParser

    parser = JsonOutputParser(pydantic_object=Grade)
    logger.debug("---Grade: DOCUMENT RELEVANCE---")
    prompt = PromptTemplate(
        template="""You are a Grader assessing relevance of a retrieved 
                     document to a user question. \n 
        Here is the retrieved document: \n\n {context} \n\n
        Here is the user question: {question} \n
        If the document contains keywords related to the user question, 
           Grade it as relevant. \n
        It does not need to be a stringent test. The goal is to filter out 
        erroneous retrievals. \n
        Give a binary score 'yes' or 'no' score to indicate whether the 
        document is relevant to the question. \n
        Provide the binary score as a JSON with no premable or 
        explaination and use these instructons to format the output: 
        {format_instructions}""",
        input_variables=["query"],
        partial_variables={"format_instructions":
                  parser.get_format_instructions()},
    )

    chain = prompt | llm 
    logger.debug("Prompt: ", prompt)

    # Score
    filtered_docs = []
    search = "No"  # Default do not opt for web search to supplement retrieval
    for d in documents:
        logger.debug("---Grade: DOCUMENT RELEVANCE---")
        logger.debug("Document: ", d.page_content)
        logger.debug("Question: ", question)
        logger.debug("Format Instructions: ", parser.get_format_instructions())
        logger.debug("Parser: ", parser)
        prompt_value = prompt.invoke({"context": d.page_content, "question": question})
        logger.debug("Prompt: ", prompt)
        logger.debug("LLM: ", llm)
        response = llm.invoke(prompt_value).content
        # score = chain.invoke(
        #     {
        #         "question": question,
        #         "context": d.page_content
        #     }
        # )

    
        score = find_json_in_string(response)
        logger.debug("Found JSON expressions:", score)

      
        logger.debug("Score: ", score)
        Grade = score[0]['score']
        logger.debug("Grade: ", Grade)
        if Grade == "yes":
            logger.debug("---Grade: DOCUMENT RELEVANT---")
            filtered_docs.append(d)
        else:
            logger.debug("---Grade: DOCUMENT NOT RELEVANT---")
            search = "Yes"  # Perform web search
            continue

    return {
        "keys": {
            "documents": filtered_docs,
            "question": question,

            "run_web_search": search,
        }
    }
