from __future__ import annotations

from pydantic import BaseModel, EmailStr, Field


class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class AdminTokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    expires_in: int
    admin: 'AdminProfile'


class AdminProfile(BaseModel):
    email: EmailStr
    role: str
    is_active: bool = True
