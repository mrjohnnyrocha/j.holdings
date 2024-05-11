from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, HTMLResponse
from groq import AsyncGroq
from pprint import pprint
from logging import getLogger

from agent import SentimentAnalysisAgent
from configs import GROQ_API_KEY, GROQ_MODEL_NAME
from news import getNews
from prompts import SYSTEM_PROMPT, KNOWLEDGE_PROMPT
from server.app.ai.graph import Graph
from agent import ContextManagerAgent

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


        message = request['message']
        sentiment_summary, sentiment_score = agent.handle(message)
     

        # Run
        inputs = {
            "keys": {
                "question": message,
            }
        }

        graph = Graph()
        graph = graph.build()
        for output in graph.stream(inputs):
            for key, value in output.items():
                # Node
                print(f"Node '{key}':")
                # Optional: print full state at each node
                # pprint.pprint(value["keys"], indent=2, width=80, depth=None)
            pprint.pprint("\n---\n")

        # Final generation
        pprint.pprint(value['keys']['generation'])
        response_content = value['keys']['generation']
        try:
            return HTMLResponse(
                content=f"<html><body><p>{response_content}</p></body></html>",
                status_code=200,
            )
        except Exception as e:
            print("Error during API call:", e)
          
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
            print("Chat completion:", response_content)
            return HTMLResponse(
                content=f"<html><body><p>{response_content}</p></body></html>",
                status_code=200,
            )
    except Exception as e:
        print("Error during API call:", e)
        return HTMLResponse(
            content="<html><body><p>Error processing your message.</p></body></html>",
            status_code=500,
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
