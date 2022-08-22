from .models import Users
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny


class RegisterView(generics.CreateAPIView):
    queryset = Users.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer