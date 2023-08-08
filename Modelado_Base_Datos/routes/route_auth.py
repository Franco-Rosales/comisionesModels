from fastapi import APIRouter, Depends
from schemas.user import UserCreate, UserLogin
from db import db_dependency
from utils.auth import create_user, veryfy_usr_email
from fastapi_jwt_auth import AuthJWT

router_auth = APIRouter(
    tags=["Authentications"],
    prefix="/auth",
)

@router_auth.get('/register')
async def register(user: UserCreate, db: db_dependency):
    await create_user(db,user )
    return {"message": "User created successfully"}

@router_auth.get('/veryfy_email/{token}')
def veryfy(token:str, usr_email: str, db: db_dependency):
    veryfy_usr_email(db, usr_email, token)
    return {"message": "User veryfied successfully"}

@router_auth.get('/login')
def login(user:UserLogin, db: db_dependency, Authorize: AuthJWT = Depends()):
    pass

@router_auth.delete('/logout')
def logout(Authorize: AuthJWT = Depends()):
  Authorize.jwt_required()
  Authorize.unset_jwt_cookies()
  return {"msg":"Successfully logout"}