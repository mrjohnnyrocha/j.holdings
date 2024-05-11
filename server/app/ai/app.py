from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, HTMLResponse
from langchain_core.messages import HumanMessage
from groq import AsyncGroq
from pprint import pprint
import logging

logger = logging.getLogger(__name__)

from agent import SentimentAnalysisAgent
from configs import GROQ_API_KEY, GROQ_MODEL_NAME
from news import getNews
from prompts import SYSTEM_PROMPT, KNOWLEDGE_PROMPT
from graph import Graph


client = AsyncGroq(api_key=GROQ_API_KEY)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3017", "http://localhost:7860"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Welcome to the AI News Search API"}


@app.get("/api/chat")
async def fetch_news(query: str = "hi"):
    """
    Endpoint to fetch news and generate a summary based on a user query.
    Utilizes a stream response to handle potentially long-running AI generation tasks.
    """
    news_items = await getNews(query)
    if not news_items or "results" not in news_items:
        raise HTTPException(
            status_code=404, detail="No news items found for the given query"
        )

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": f"Query: {query}\nNews Items: {news_items['results']}",
        },
    ]

    return StreamingResponse(generate_responses(messages), media_type="text/plain")


class ChatResponse(BaseModel):
    message: str
    sentiment_summary: str
    sentiment_score: float

@app.post("/api/chat", response_model=ChatResponse)
async def generate_responses(
    request
):
    """
    Generate responses from the LLM in a streaming fashion using the Groq API and return them as HTML.
    """

    try:
        agent = SentimentAnalysisAgent()


        message = request
        sentiment_summary, sentiment_score = agent.handle(message)

        # Run
        inputs = {
            "keys": {
                "question": message,
            }
        }

        graph = Graph()
        app = graph.build()

        outputs = app.invoke(inputs)

        try:
            return HTMLResponse(
                content=f"<html><body><p>{outputs}</p></body></html>",
                status_code=200,
            )
        except Exception as e:
            print("Error during Agent processing:", e)
          
            chat_completion = await client.chat.completions.create(

                messages=[
                    {
                        "role": "user",
                        "content": message + sentiment_summary + KNOWLEDGE_PROMPT #+ context_analysis + str(sentiment_score),
                    }
                ],
                model=GROQ_MODEL_NAME,
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
