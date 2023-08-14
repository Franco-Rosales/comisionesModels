from fastapi import Depends, FastAPI, Request
from routes.route_auth import router_auth
from fastapi.responses import JSONResponse
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi_jwt_auth import AuthJWT
from schemas.settings import Settings
from db import create_tables
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


#*########################################################
#*                       RUTAS                           #
#*########################################################
app.include_router(router_auth)
origins = [
    "http://localhost:3000",
]

# middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

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