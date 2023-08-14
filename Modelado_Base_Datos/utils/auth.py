from fastapi_jwt_auth import AuthJWT
from fastapi import Depends, HTTPException, status
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from jose import JWTError, jwt, ExpiredSignatureError
from config.environments import ALGORITHM, SECRET_KEY
from models.user import UserModel
from schemas.user import UserCreate, UserLogin
from datetime import datetime, timedelta
from utils.notify import send_email_confirm
from utils.notify import send_email_welcome


#*################### HASHING PASSWORD WITH BCRYPT ####################
#*     configuracion para hasheo de password                          #
#*#####################################################################
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto" )
def get_password_hash(password):
  return bcrypt_context.hash(password)
def verify_password(plain_password, hash_password):
  return bcrypt_context.verify(plain_password, hash_password)
#*#####################################################################
  
  

<<<<<<< HEAD
#*################### Create an User ####################################
#*        logica de creacion de usuario                                 #
#*######################################################################
=======
#*################### send_email ######################
#*     configuracion para envio de email              #
#*##################################################### 
async def send_email(token: str, usr_email: str):
  
  conf = ConnectionConfig(
    MAIL_USERNAME="pilcapa2023@gmail.com",
    MAIL_PASSWORD="ofmmifkfjjtwqyfq",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    MAIL_FROM="pilcapa2023@gmail.com",
  )
  
  verification_url = f"http://localhost:8000/auth/verify_email/{token}?usr_email={usr_email}"
  
  #TODO: cambiar el template por el que nos de Gero
  #despues del OK de que se verifique, mostrar segundo template html con otro link a home ya logueado
  template = f"""
    <html>
      <body>
        <p>Hola,</p>
        <p>Gracias por registrarte. Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <p><a href="{verification_url}">verificar</a></p>
      </body>
      </html>
    """
  message = MessageSchema(
    subject="Bienvenido a Comisiones!",
    recipients=[usr_email],
    body=template,
    subtype="html",
  )
  fm = FastMail(conf)
  await fm.send_message(message)
#*#####################################################
  
  
    
#*################### Create an User #####################
#*        logica de creacion de usuario                  #
#*########################################################
>>>>>>> e4621aa (todo regio)
async def create_user(db: Session, user: UserCreate):
  usr_email = db.query(UserModel).filter(UserModel.usr_email == user.usr_email).first() 

  if usr_email:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST, 
      detail="Email registrado"
    )

  hashed_password = get_password_hash(user.usr_password)

  user.usr_password = hashed_password
  db_user = UserModel(**user.dict())
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  
  #creo token de verificacion de email
  token = create_verify_token( 
    db_user.usr_email,
    db_user.usr_id,
    timedelta(minutes=15)
  )
  
  await send_email_confirm(user, token)
  return db_user
#*########################################################



#*################### Verify user email ##################
#*        Verificar email de usuario                     #
#*########################################################

async def verify_usr_email(token: str, db: Session):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    usr_id = payload['id']
    usr_email = payload['mail']

    user_db = db.query(UserModel).filter_by(usr_id = usr_id).first()
    
    user_db.usr_enabled = True
    db.add(user_db)
    db.commit()

    if not user_db:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Usuario no encontrado",
      )
    
    await send_email_welcome(user_db)

  except ExpiredSignatureError:
    user_delete = db.query(UserModel).filter_by(usr_email=usr_email).first()  
    db.delete(user_delete)
    db.commit()
    raise HTTPException(
      status_code=status.HTTP_406_NOT_ACCEPTABLE,
      detail="Su registro ha expirado, por favor registrese nuevamente",
    )
    
  except JWTError:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Error de authenticacion",
   )
  

async def resend_email_confirm(usr_email: str, db: Session):
  #crear un nuevo token y pisarlo al anterior
  try:
    db_user = db.query(UserModel).filter_by(usr_email = usr_email).first()
    
    if not db_user:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Usuario no encontrado",
      )
    
    token = create_verify_token( 
    db_user.usr_email,
    db_user.usr_id,
    timedelta(minutes=15)
    )

    #enviar mail
    await send_email_confirm(db_user, token)

  except ExpiredSignatureError:
    user_delete = db.query(UserModel).filter_by(usr_email=db_user.usr_mail).first()  
    db.delete(user_delete)
    db.commit()
    raise HTTPException(
      status_code=status.HTTP_406_NOT_ACCEPTABLE,
      detail="Su registro ha expirado, por favor registrese nuevamente",
    )
  
  except JWTError:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Error de authenticacion",
    )
#*########################################################



#*################### Create Verify user email ##############
#*        creacion del token de email_verification          #
#*###########################################################
def create_verify_token( usr_email: str, usr_id: int, expires_delta: timedelta):
  encode = {"id": usr_id, "mail": usr_email}
  expires_delta = datetime.utcnow() + expires_delta
  encode.update({"exp": expires_delta})
  return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
#*###########################################################



#*################### AUTHENTICATE USER #######################
#*        logica de autenticacion de usuario                  #
#*#############################################################
def authenticate_user( user: UserLogin, db: Session):
  user_db = db.query(UserModel).filter_by(usr_email = user.usr_email).first()

  if not user_db:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Usuario o contraseña incorrecto",
    )
  if not verify_password(user.usr_password, user_db.usr_password):
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Usuario o contraseña incorrecto",
    )
  if not user_db.usr_enabled:
    raise HTTPException(
      status_code=status.HTTP_406_NOT_ACCEPTABLE,
      detail="Revise su casilla de mensajes y verifique su cuenta",
    ) 
  return user_db
#*#############################################################



#*################### ROLES OF USER ##########################
#*                logica de roles de usuario                  #
#*#############################################################
# def get_current_user_with_role(role: str):
#     def _get_current_user(user_id: int = Depends(get_current_user), auth: AuthJWT = Depends()):
#       try:
#         auth.jwt_required()
#         role_cookie=auth.get_raw_jwt()['role']
#         if role not in role_cookie:
#             raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Usuario no autorizado"
#           )
#       except:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Usuario no autorizado"
#           )
#       return user_id
#     return _get_current_user
#*#############################################################



#*################### OBTENER USER ############################
#*  Obtener user del token e implementacion de refreshToken   #
#*#############################################################
def get_current_user (auth: AuthJWT = Depends()):
  try:
    auth.jwt_required()
    user_id = auth.get_jwt_subject()
  except:
    try:
      auth.jwt_refresh_token_required()
      user_id = auth.get_jwt_subject()
      new_access_token = auth.create_access_token(subject=user_id)  
      auth.set_access_cookies(new_access_token)
    except:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Sesion expirada",
      ) 
  return user_id
################################################################




