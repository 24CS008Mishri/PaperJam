from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status

from app.models.auth import AdminLoginRequest, AdminProfile, AdminTokenResponse
from app.services.auth import create_access_token, require_admin, revoke_token, verify_password
from app.services.mongo import get_database

router = APIRouter(prefix='/auth', tags=['authentication'])


@router.post('/admin/login', response_model=AdminTokenResponse)
async def admin_login(request: AdminLoginRequest) -> AdminTokenResponse:
    try:
        admin = get_database().admins.find_one({'email': request.email.lower()})
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail='Authentication database unavailable.') from exc

    if not admin or not admin.get('is_active', False) or not verify_password(request.password, admin['password_hash']):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid email or password.')

    try:
        token = create_access_token(admin)
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc

    from app.core.config import get_settings
    return AdminTokenResponse(
        access_token=token,
        expires_in=get_settings().jwt_expire_minutes * 60,
        admin=AdminProfile(email=admin['email'], role=admin['role'], is_active=admin['is_active']),
    )


@router.get('/me', response_model=AdminProfile)
async def current_admin(admin: dict = Depends(require_admin)) -> AdminProfile:
    return AdminProfile(email=admin['email'], role=admin['role'], is_active=True)


@router.post('/admin/logout')
async def admin_logout(request: Request, _: dict = Depends(require_admin)) -> dict[str, str]:
    authorization = request.headers.get('Authorization', '')
    token = authorization.removeprefix('Bearer ').strip()
    if token:
        revoke_token(token)
    return {'status': 'logged_out'}
