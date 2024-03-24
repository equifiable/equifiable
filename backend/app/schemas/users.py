from datetime import datetime
from pydantic import BaseModel, EmailStr


class User(BaseModel):
    user_id: str

    class Config:
        from_attributes = True


class UserPost(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserResponse(User):
    name: str
    created_at: datetime


class UserUpdate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserDelete(User):
    pass


class UserLogin(BaseModel):
    email: EmailStr
    password: str
