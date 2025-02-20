from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserResponse
from sqlalchemy.future import select
from app.routes.websocket import broadcast_users  # Import WebSocket function

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = User(first_name=user.first_name, last_name=user.last_name, email=user.email)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    
    # Send real-time updates to WebSocket clients
    await broadcast_users(db)
    
    return db_user

@router.get("/", response_model=list[UserResponse])
async def get_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users

@router.delete("/", response_model=dict)
async def delete_all_users(db: AsyncSession = Depends(get_db)):
    # Fetch all users
    result = await db.execute(select(User))
    users = result.scalars().all()
    
    # Delete each user
    for user in users:
        await db.delete(user)
    await db.commit()
    
    # Broadcast updates to WebSocket clients
    await broadcast_users(db)
    
    return {"message": "All users deleted"}

@router.delete("/{user_id}", response_model=dict)
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    await db.delete(user)
    await db.commit()
    
    # Broadcast updates to WebSocket clients
    await broadcast_users(db)
    
    return {"message": f"User {user_id} deleted"}
