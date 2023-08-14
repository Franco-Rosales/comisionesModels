from fastapi import APIRouter, Depends
from models.user import UserModel
from starlette import status
from fastapi_jwt_auth import AuthJWT
from utils.auth import *
from schemas.user import UserCreate, UserLogin
from db import db_dependency
from fastapi_jwt_auth.exceptions import AuthJWTException

router_auth = APIRouter(
  tags=['Authentication'],
  prefix='/auth'
)

#*################### AUTHENTICATION ######################
#*        Ruta para autenticar usuario                    #
#*#########################################################

@router_auth.post('/register', status_code=status.HTTP_201_CREATED)
async def register( user: UserCreate, db: db_dependency ):
  await create_user(db, user)
  #return {'msg': 'register successful'}

#file response con html su cuenta ha sido verificada
@router_auth.get('/verify_email/{token}',  status_code=status.HTTP_200_OK)
async def verify( token: str, db: db_dependency):
  await verify_usr_email(token, db)
  #return {'msg': 'email verified'}


@router_auth.get('/resend_email',  status_code=status.HTTP_200_OK)
async def resend_email(usr_id:int, db: db_dependency):
  await resend_email_confirm(usr_id, db)

@router_auth.post('/login',  status_code=status.HTTP_200_OK)
def login( user: UserLogin, db: db_dependency, Authorize: AuthJWT = Depends() ):
  
  user_db = authenticate_user(user, db)
  
  another_claims = {"role": [user_db.usr_role]}
  access_token = Authorize.create_access_token(subject=user_db.usr_id, user_claims=another_claims)
  refresh_token = Authorize.create_refresh_token(subject=user_db.usr_id, user_claims=another_claims)
  
  Authorize.set_access_cookies(access_token)
  Authorize.set_refresh_cookies(refresh_token)
  #return {'msg': 'login successful'}

@router_auth.delete('/logout',  status_code=status.HTTP_200_OK)
def logout(Authorize: AuthJWT = Depends()):
  Authorize.jwt_required()
  Authorize.unset_jwt_cookies()
  #return {"msg":"Successfully logout"}





