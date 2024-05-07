import httpx
import os

# Assuming these environment variables are set:
# NEWS_API_KEY - Your API key for newsdata.io
# NEWS_BASE_URL - The base URL for the newsdata.io API
NEWS_API_KEY = os.getenv('NEWS_API_KEY', 'your_default_api_key_here')
NEWS_BASE_URL = os.getenv('NEWS_BASE_URL', 'https://newsdata.io/api/1/news')

async def getNews(query: str, max_size: int = 8):
    """Fetch news articles based on a search query using the newsdata.io API.

    Args:
        query (str): The search term to query for news articles.
        max_size (int): Maximum number of news articles to fetch.

    Returns:
        dict: A dictionary containing the API response with news articles or None if an error occurs.
    """
    async with httpx.AsyncClient() as client:
        params = {
            'apiKey': NEWS_API_KEY,
            'q': query,
            'size': max_size
        }
        try:
            response = await client.get(NEWS_BASE_URL, params=params)
            response.raise_for_status()  # Raises an exception for 400 and 500 codes
            return response.json()
        except httpx.HTTPStatusError as e:
            # Logs the HTTP status errors that occur from the newsdata.io API
            print(f"HTTP error occurred: {e.response.status_code} - {e.response.text}")
        except httpx.RequestError as e:
            # Logs the network-related errors that occur while trying to send the request.
            print(f"Request error occurred: {e.request.url} - {e.message}")
        return None

