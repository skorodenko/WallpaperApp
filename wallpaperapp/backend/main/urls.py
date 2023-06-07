from django.urls import path
from .views import ListImages, Image, ImageInfo, ImagePrivateInfo, UserImages

urlpatterns = [
    path("images/", ListImages.as_view(), name="images"),
    path("image/<uuid>/", Image.as_view(), name="image"),
    path("image/<uuid>/info", ImageInfo.as_view(), name="image_info"),
    path("image/<uuid>/info_private", ImagePrivateInfo.as_view(), name="image_info_private"),
    path("user/images", UserImages.as_view(), name="user_images")
]
    