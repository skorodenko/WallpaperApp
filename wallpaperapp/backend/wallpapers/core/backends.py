from rest_framework_simplejwt.authentication import JWTAuthentication
from .celery import app


class UserData:
    is_authenticated = True

    def __init__(self, my_dict):
        for key in my_dict:
            setattr(self, key, my_dict[key])
            

class MicroJWTAuth(JWTAuthentication):
    
    def get_validated_token(self, raw_token):
        return raw_token.decode()
    
    def get_user(self, validated_token):
        t = app.send_task("authenticate", (validated_token,))
        user_dict = t.get()
        return UserData(user_dict)
