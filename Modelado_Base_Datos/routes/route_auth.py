from fastapi import APIRouter, Depends, HTTPException
from Modelado_Base_Datos.utils.notify import send_email_confirm
from fastapi_jwt_auth import AuthJWT
from utils.auth import create_user, verify_usr_email, authenticate_user
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

@router_auth.post('/register')
async def register( user: UserCreate, db: db_dependency ):
  await create_user(db, user)
  return {'msg': 'register successful'}

@router_auth.get('/verify_email/{token}')
def verify( token: str, usr_email:str, db: db_dependency):
  verify_usr_email(token, usr_email, db)
  return {'msg': 'email verified'}

#dos opciones: front me pase todo el user, o solo el email y hago un get de BBDD
@router_auth.get('/resend_email/{user}')
async def resend_email(user:UserCreate):
  try:
    send_email_confirm(user.usr_email)  # Llama a la función para enviar el correo
    return {"msg": "Correo reenviado con éxito"}
  except Exception as e:
    return HTTPException(status_code=500, detail=str(e))

@router_auth.post('/login')
def login( user: UserLogin, db: db_dependency, Authorize: AuthJWT = Depends() ):
  
  user_db = authenticate_user(user, db)
  
  another_claims = {"role": [user_db.usr_role]}
  access_token = Authorize.create_access_token(subject=user_db.usr_id, user_claims=another_claims)
  refresh_token = Authorize.create_refresh_token(subject=user_db.usr_id, user_claims=another_claims)
  
  Authorize.set_access_cookies(access_token)
  Authorize.set_refresh_cookies(refresh_token)
  return {'msg': 'login successful'}

@router_auth.delete('/logout')
def logout(Authorize: AuthJWT = Depends()):
  Authorize.jwt_required()
  Authorize.unset_jwt_cookies()
  return {"msg":"Successfully logout"}





