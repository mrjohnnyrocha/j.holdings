# database.py
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str
    DATABASE_NAME: str

settings = Settings()

client = AsyncIOMotorClient(settings.MONGODB_URI)
database = client[settings.DATABASE_NAME]
