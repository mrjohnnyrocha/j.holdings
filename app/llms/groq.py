from .base import BaseLLM
import traceback
from typing import List, Dict, Union
import httpx
import os
import backoff
from httpx import AsyncClient
from groq import Groq, AsyncGroq


class GroqLLM(BaseLLM):
    """Class to interface with Groq's API for Llama 3 model."""

    def __init__(self, api_key: Union[str, None] = None):
        super().__init__(api_key)

    @backoff.on_exception(backoff.expo, httpx.HTTPStatusError, max_tries=3)
    async def __call__(self, model: str, messages: List[Dict], **kwargs):
        try:
            self.client = Groq(
                api_key=os.environ.get("GROQ_API_KEY"),
            )
            chat_completion = self.client.chat.completions.create(
                messages, model=os.environ.get("GROQ_MODEL_NAME")
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            print(f"ERROR: {str(e)}")
            print(f"{traceback.format_exc()}")
            return ""


class GroqLLMStream(BaseLLM):
    """Stream processing class for Groq API interactions."""

    async def __call__(self, model: str, messages: List[Dict], **kwargs) -> None:
        self.client = AsyncGroq(
            api_key=os.environ.get("GROQ_API_KEY"),
        )
        chat_completion = await self.client.chat.completions.create(
            messages,
            model=os.environ.get("GROQ_MODEL_NAME"),
      )
        return chat_completion.choices[0].message.content
