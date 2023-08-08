from pydantic import BaseSettings


class Settings(BaseSettings):
  authjwt_secret_key: str = "secret"
  authjwt_token_location: set = {"cookies"}
  authjwt_cookie_csrf_protect: bool = False