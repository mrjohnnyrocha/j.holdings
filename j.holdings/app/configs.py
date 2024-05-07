# configs.py

import os
from dotenv import load_dotenv

load_dotenv()  # Take environment variables from .env file

# API Keys and Base URLs
NEWS_API_KEY = os.getenv('NEWS_API_KEY', 'your_default_news_api_key')
NEWS_BASE_URL = os.getenv('NEWS_BASE_URL', 'https://newsdata.io/api/1/news')

GROQ_API_KEY = os.getenv('GROQ_API_KEY', 'your_default_groq_api_key')
GROQ_MODEL_NAME = os.getenv('GROQ_MODEL_NAME', 'llama3-8b-8192')
