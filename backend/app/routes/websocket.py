from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models import User
import json

router = APIRouter()
connected_clients = []  # Store connected WebSocket clients

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()  # Keep connection alive
    except WebSocketDisconnect:
        connected_clients.remove(websocket)

async def broadcast_users(db: AsyncSession):
    """Broadcasts the user list to all connected WebSocket clients."""
    result = await db.execute(select(User))
    users = result.scalars().all()
    user_list = [{"id": u.id, "first_name": u.first_name, "last_name": u.last_name, "email": u.email} for u in users]
    print(user_list)

    message = json.dumps(user_list)
    for client in connected_clients:
        await client.send_text(message)
