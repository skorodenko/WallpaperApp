from django import http
from .models import Users
from .serializers import RegisterSerializer, UserSerializer
from rest_framework import generics, views, permissions, response, status


class RegisterView(generics.CreateAPIView):
    queryset = Users.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class User(views.APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def get_user(self, uuid):
        try:
            return Users.objects.get(id=uuid)
        except Users.DoesNotExist:
            raise http.Http404

    def delete(self, request, uuid):
        user = self.get_user(uuid)
        user.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT) 

    def get(self, request, uuid):
        user = self.get_user(uuid)
        serializer = UserSerializer(user)
        return response.Response(serializer.data)

    def put(self, request, uuid):
        user = self.get_user(uuid)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
