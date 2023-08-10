from fastapi import Depends, FastAPI, Request
from fastapi.responses import Response
from routes.route_auth import router_auth 
from fastapi.responses import JSONResponse
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi_jwt_auth import AuthJWT
from schemas.settings import Settings
from db import create_tables


app = FastAPI()

app.include_router(router_auth)


create_tables()


@AuthJWT.load_config
def get_config():
  return Settings()

@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
  return JSONResponse(
    status_code=exc.status_code,
    content={"detail": exc.message}
  )
  
@app.get('/')
def home():
  return 'home'
