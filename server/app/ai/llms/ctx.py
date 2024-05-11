from transformers import AutoTokenizer
from typing import List, Dict
class ContextManagement:
    """Utility class to manage context length for LLM requests."""
    
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B")

    def manage_context(self, messages: List[Dict], max_length: int = 7000):
        """Ensure that the total token count of the messages does not exceed max_length."""
        managed_messages = []
        current_length = 0

        for message in messages:
            content = message['content']
            tokens = self.tokenizer.tokenize(content)
            token_count = len(tokens) + 2  # For special tokens

            if current_length + token_count > max_length:
                break  # Stop adding messages if max_length is exceeded

            managed_messages.append(message)
            current_length += token_count

        return managed_messages
