from typing import Annotated
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from config.prod import URL_DATABASE 

engine = create_engine(URL_DATABASE)

session_local = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()


def create_tables():
  Base.metadata.create_all(bind= engine)

def get_db() :
  db = session_local()
  try: 
    yield db
    db.commit()
  finally:
    db.close()

db_dependency = Annotated[ Session, Depends(get_db) ]