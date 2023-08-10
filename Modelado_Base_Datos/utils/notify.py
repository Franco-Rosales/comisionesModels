from fastapi import HTTPException,status
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from typing import List
from models.user import UserModel
from config.environments import *
from config.prod import *
import jwt
from sqlalchemy.orm import Session
import os
from datetime import date, timedelta, datetime

#TODO: hacerlo variables de entorno
conf = ConnectionConfig(
    MAIL_USERNAME = 'pilcapa2023@gmail.com',
    MAIL_PASSWORD= 'ofmmifkfjjtwqyfq',
    MAIL_FROM= 'pilcapa2023@gmail.com',
    MAIL_PORT= 587,
    MAIL_SERVER= 'smtp.gmail.com',
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    #con jinja? template folder del template
    #getcwd() returns current working directory of a process.
    TEMPLATE_FOLDER = os.getcwd() + TEMPLATE_ROUTE
)

async def send_email_confirm(instance: UserModel, token: str):

    message = MessageSchema(
        subject="Bienvenido a Comisiones!",
        recipients=[instance.usr_email],
        #el template body pasa parametros al html para q los use
        template_body={"name":instance.usr_name, "token":token, "DNS_VERIFICATION":DNS_VERIFICATION},
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message=message, template_name=TEMPLATE_CONFIRM)


#otra funcion para que envie el segundo mail que va a estar triggereada en el boton de verificar