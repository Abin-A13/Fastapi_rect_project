from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes, websocket
from app.database import engine, Base

app = FastAPI()

# Add CORS middleware before including any routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Register routers
app.include_router(user_routes.router)
app.include_router(websocket.router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "FastAPI WebSockets Example"}

# Create DB tables on startup
@app.on_event("startup")
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
