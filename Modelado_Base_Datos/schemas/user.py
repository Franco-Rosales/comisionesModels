from pydantic import BaseModel, EmailStr, Field

class UserLogin(BaseModel):
  usr_email: EmailStr
  usr_password: str = Field(min_length=6, max_length=20)
  
class UserCreate(UserLogin):
  usr_name: str = Field(regex=r"^(?!.*\s)[a-zA-Z0-9_-]+(?<!-)$", min_length=3, max_length=50)
  usr_role: str
  
  
class User(UserCreate):
  usr_id: int
  usr_enabled: bool = False
  
  class Config:
    orm_mode = True







