from django.urls import path
from .views import RegisterView, User, CookieTokenObtainPairView, CookieTokenRefreshView, CookieTokenBlacklistView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="auth_register"),
    path("login/", CookieTokenObtainPairView.as_view(), name="auth_login"),
    path("login/refresh/", CookieTokenRefreshView.as_view(), name="auth_refresh"),
    path("user/logout/", CookieTokenBlacklistView.as_view(), name="auth_logout"),
    path("user/", User.as_view(), name="auth_user"),
]