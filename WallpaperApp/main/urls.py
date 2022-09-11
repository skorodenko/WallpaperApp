from django.urls import path
from .views import ListImages, Image

urlpatterns = [
    path("images/", ListImages.as_view(), name="images"),
    path("image/<uuid>/", Image.as_view(), name="image"),
]
    