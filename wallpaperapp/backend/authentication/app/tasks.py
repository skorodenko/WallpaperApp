from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer
from celery import shared_task

@shared_task(name="authenticate")
def test(token):
    api = JWTAuthentication()
    token = api.get_validated_token(token)
    user = api.get_user(token)
    serializer = UserSerializer(user)
    return serializer.data