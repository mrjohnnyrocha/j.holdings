from abc import ABC, abstractmethod
from typing import List, Dict, Union

class BaseLLM(ABC):
    """Abstract base class for language models."""

    def __init__(self, api_key: Union[str, None] = None, **kwargs):
        self.api_key = api_key
        self.client = None
        self.extra_args = kwargs

    @abstractmethod
    async def __call__(self, model: str, messages: List[Dict], **kwargs):
        """Method to process messages using the model."""
        pass
