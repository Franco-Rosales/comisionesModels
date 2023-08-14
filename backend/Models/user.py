from sqlalchemy import Column, Integer, String, Boolean
from db import Base



class UserModel(Base):
  __tablename__ = "users"
  usr_id = Column(Integer, primary_key=True, index=True)
  usr_email = Column(String, unique=True, index=True)
  usr_password = Column(String)
  usr_name = Column(String)
  usr_enabled = Column(Boolean, default=False)
  usr_role = Column(String, default='client')
