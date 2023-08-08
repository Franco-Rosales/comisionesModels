from sqlalchemy.orm import Session
from schemas.user import UserCreate



async def create_user(db:Session, user:UserCreate):
    pass

def veryfy_usr_email(token:str, usr_email:str, db:Session):
    pass