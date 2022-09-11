from django.urls import path
from .views import RegisterView, User
from rest_framework_simplejwt.views import TokenObtainSlidingView, TokenRefreshSlidingView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="auth_register"),
    path("login/", TokenObtainSlidingView.as_view(), name="auth_login"),
    path("login/refresh/", TokenRefreshSlidingView.as_view(), name="auth_refresh"),
    path("user/", User.as_view(), name="auth_user"),
]