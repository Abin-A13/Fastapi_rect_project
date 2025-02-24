import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv


# Load environment variables
load_dotenv()

# Read the DATABASE_URL from .env file
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./test.db")

# Create an asynchronous engine for SQLite
engine = create_async_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})

# Create session factory
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# Base class for SQLAlchemy models
Base = declarative_base()

# Dependency to get an async database session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
