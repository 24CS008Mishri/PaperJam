from datetime import datetime, timedelta, timezone
from typing import Any
from uuid import uuid4

import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from app.core.config import get_settings
from app.services.mongo import get_database

bearer = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))


def create_access_token(admin: dict[str, Any]) -> str:
    settings = get_settings()
    if not settings.jwt_secret:
        raise RuntimeError('JWT_SECRET is not configured.')
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(minutes=settings.jwt_expire_minutes)
    return jwt.encode(
        {
            'sub': str(admin['_id']),
            'email': admin['email'],
            'role': admin['role'],
            'jti': uuid4().hex,
            'iat': now,
            'exp': expires_at,
        },
        settings.jwt_secret,
        algorithm='HS256',
    )


def _decode_token(token: str) -> dict[str, Any]:
    settings = get_settings()
    if not settings.jwt_secret:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail='JWT_SECRET is not configured.')
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=['HS256'])
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid or expired token.') from exc
    if payload.get('role') != 'admin' or not payload.get('sub') or not payload.get('jti'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Admin access is required.')
    return payload


def require_admin(credentials: HTTPAuthorizationCredentials | None = Depends(bearer)) -> dict[str, Any]:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Bearer token required.')
    payload = _decode_token(credentials.credentials)
    try:
        database = get_database()
        if database.revoked_tokens.find_one({'jti': payload['jti']}):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token has been revoked.')
        admin = database.admins.find_one({'_id': payload['sub']})
        if admin is None:
            from bson import ObjectId
            admin = database.admins.find_one({'_id': ObjectId(payload['sub'])})
        if not admin or not admin.get('is_active', False):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Admin account is inactive.')
        return {'id': str(admin['_id']), 'email': admin['email'], 'role': admin['role']}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail='Authentication database unavailable.') from exc


def revoke_token(token: str) -> None:
    payload = _decode_token(token)
    expires_at = datetime.fromtimestamp(payload['exp'], tz=timezone.utc)
    get_database().revoked_tokens.update_one({'jti': payload['jti']}, {'$set': {'jti': payload['jti'], 'expires_at': expires_at}}, upsert=True)
