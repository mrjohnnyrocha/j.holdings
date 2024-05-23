from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, HTMLResponse
from langchain_core.messages import HumanMessage
from groq import AsyncGroq
from pprint import pprint
import requests
import logging
import os
from dotenv import load_dotenv

env = load_dotenv()
logger = logging.getLogger(__name__)

from scripts import CONTEXT, SAFETY_GATE
from graph import Graph


client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3000", "http://localhost:3001" "http://localhost:9000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Welcome to the j API"}


@app.get("/api/chat")
async def fetch_news(query: str = "hi"):
    """
    Endpoint to fetch news and generate a summary based on a user query.
    Utilizes a stream response to handle potentially long-running AI generation tasks.
    """
    news_items = "results"
    if not news_items or "results" not in news_items:
        raise HTTPException(
            status_code=404, detail="No news items found for the given query"
        )

    messages = [
        {"role": "system", "content": SYSTEM},
        {
            "role": "user",
            "content": f"Query: {query}\nNews Items: {news_items['results']}",
        },
    ]

    return StreamingResponse(generate_responses(messages), media_type="text/plain")


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    message: str
    sentiment_summary: str
    sentiment_score: float


@app.post("/api/chat", response_model=ChatResponse, response_class=HTMLResponse)
async def generate_responses(
    request: ChatRequest,
):
    """
    Generate responses from the LLM in a streaming fashion using the Groq API and return them as HTML.
    """

    try:
        #agent = SentimentAnalysisAgent()

        message = request.message
        print("Message:", message)
        #sentiment_summary, sentiment_score = agent.handle(message)

        inputs = {
            "keys": {
                "question": message,
            }
        }

        graph = Graph()

        app = graph.build()

        outputs = app.invoke(inputs)
        output = outputs['keys']['generation']

        content =  f"Regenerate in a professional and concise manner the answer {output} to the question {message}. Just output the generated answer and nothing else." 
        
        chat_completion = await client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": content
                }
            ],
            model=os.getenv("LOCAL_LLM"),
        )
        response_content = chat_completion.choices[0].message.content

        return HTMLResponse(
            content=f"<html><body><p>{response_content}</p></body></html>",
            status_code=200,
        )

    except Exception as e:
        print("Error during API call:", e)
        return HTMLResponse(
            content=f"<html><body><p>Error processing your message. {e}</p></body></html>",
            status_code=500,
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
