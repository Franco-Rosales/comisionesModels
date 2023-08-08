from fastapi_jwt_auth import AuthJWT
from fastapi import Depends, HTTPException, status
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from jose import JWTError, jwt, ExpiredSignatureError
from config.enviroments import ALGORITHM, SECRET_KEY
from Models.user import UserModel
from schemas.user import UserCreate, UserLogin
from datetime import datetime, timedelta



#*################### HASHING PASSWORD WITH BCRYPT ####################
#*     configuracion para hasheo de password                          #
#*#####################################################################
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto" )
def get_password_hash(password):
  return bcrypt_context.hash(password)
def verify_password(plain_password, hash_password):
  return bcrypt_context.verify(plain_password, hash_password)
#*#####################################################################
    
    

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
    subject="Bienvenido a Capa",
    # List of recipients, as many as you can pass
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
  
  token = create_verify_token( 
    db_user.usr_id, 
    timedelta(minutes=2)
  )
  
  await send_email(token, user.usr_email)
  return db_user
#*########################################################
    
    
    
#*################### Verify user email ##################
#*        Verificar email de usuario                     #
#*########################################################
def verify_usr_email(token: str, usr_email: str, db: Session):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    usr_id = payload['id']
      
    user_db = db.query(UserModel).filter_by(usr_id = usr_id).first()
    
    user_db.usr_enabled = True
    db.add(user_db)
    db.commit()
    
    if not user_db:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Usuario no encontrado",
      )
    
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
#*########################################################



#*################### Create Verify user email ##############
#*        creacion del token de email_verification          #
#*###########################################################
def create_verify_token( usr_id: int, expires_delta: timedelta):
  encode = {"id": usr_id}
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

def get_current_user_with_role(role: str):
    def _get_current_user(user_id: int = Depends(get_current_user), auth: AuthJWT = Depends()):
      try:
        auth.jwt_required()
        role_cookie=auth.get_raw_jwt()['role']
        if role not in role_cookie:
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no autorizado"
          )
      except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no autorizado"
          )
      return user_id
    return _get_current_user

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




