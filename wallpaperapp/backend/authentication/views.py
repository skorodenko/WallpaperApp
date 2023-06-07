from .models import Users
from .serializers import RegisterSerializer, UserSerializer, CookieTokenRefreshSerializer
from rest_framework import generics, views, permissions, response, status
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView, TokenBlacklistView


class RegisterView(generics.CreateAPIView):
    queryset = Users.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class CookieTokenObtainPairView(TokenObtainPairView):
  def finalize_response(self, request, response, *args, **kwargs):
    if response.data.get("refresh"):
        cookie_max_age = 3600 * 24 * 3 # 3 days
        response.set_cookie("refresh_token", response.data["refresh"], max_age=cookie_max_age, httponly=True )
        del response.data["refresh"]
    return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            cookie_max_age = 3600 * 24 * 3 # 3 days
            response.set_cookie("refresh_token", response.data["refresh"], max_age=cookie_max_age, httponly=True )
            del response.data["refresh"]
        return super().finalize_response(request, response, *args, **kwargs)
    serializer_class = CookieTokenRefreshSerializer


class CookieTokenBlacklistView(TokenBlacklistView):
    def initial(self, request, *args, **kwargs):
        if refresh := request.COOKIES.get("refresh_token"):
            request.data["refresh"] = refresh
        return super().initial(request, *args, **kwargs)


class User(views.APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def delete(self, request):
        user = request.user
        user.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT) 

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return response.Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
