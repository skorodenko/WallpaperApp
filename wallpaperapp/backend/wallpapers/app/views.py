import mimetypes
from django import http
from .models import Images, ImUserState
from .serializers import ImageSerializer, AllImageSerializer, ImagePublicSerializer, ImagePrivateSerializer
from django.db.models import Sum
from django.db.models.functions import Coalesce
from datetime import timedelta, datetime
from drf_nested_forms.parsers import NestedMultiPartParser
from rest_framework import views, response, status, permissions, pagination


class ListImages(views.APIView, pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    parser_classes = [NestedMultiPartParser]

    def get_paginated_response(self, data):
        return response.Response({
            "next": self.page.next_page_number() if self.page.has_next() else None,
            "previous": self.page.previous_page_number() if self.page.has_previous() else None,
            "count": self.page.paginator.count,
            "data": data
        })

    def get_images(self):
        try:
            return Images.objects.all()
        except Images.DoesNotExist:
            return http.Http404
    
    def apply_timedelta(self, queryset, delta):
        match delta:
            case "day":
                return queryset.filter(upload_date__gt=datetime.now()-timedelta(days=1))
            case "week":
                return queryset.filter(upload_date__gt=datetime.now()-timedelta(days=7))
            case "month":
                return queryset.filter(upload_date__gt=datetime.now()-timedelta(days=30))
            case "year":
                return queryset.filter(upload_date__gt=datetime.now()-timedelta(days=365))
            case "all":
                return queryset

    def get(self, request):
        match request.query_params:
            case {
                    "sort": "new", 
                    **etc
            }:
                imgs = self.get_images()
                imgs = imgs.order_by("-upload_date")
                imgs = self.paginate_queryset(imgs, self.request)
                serializer = AllImageSerializer(imgs, many=True)
                return self.get_paginated_response(serializer.data)
            case {
                    "sort": "popular", 
                    "delta": ("day" | "week" | "month" | "year" | "all") as delta,
                    **etc
            }:
                imgs = self.get_images()
                imgs = self.apply_timedelta(imgs, delta)
                imgs = imgs.annotate(rating=Coalesce(Sum("imuserstate__vote"), 0)).order_by("-rating")
                imgs = self.paginate_queryset(imgs, self.request)
                serializer = AllImageSerializer(imgs, many=True)
                return self.get_paginated_response(serializer.data)
            case _:
                return response.Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = ImageSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            user = request.user
            serializer.save(uploaded_by=user)
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Image(views.APIView):
    def get_image(self, uuid):
        try:
            return Images.objects.get(uuid=uuid)
        except Images.DoesNotExist:
            raise http.Http404
    
    def get(self, request, uuid):
        image = self.get_image(uuid)

        if request.query_params.get("thumbnail"):
            file = image.thumbnail
        else:
            file = image.image
        
        size = file.size

        content_type_file = mimetypes.guess_type(file.path)[0]

        response = http.response.FileResponse(open(file.path, "rb"), content_type=content_type_file)
        response["Content-Disposition"] = f"attachment; filename={file}"
        response["Content-Length"] = size

        return response


class ImageInfo(views.APIView):
    def get_image(self, uuid):
        try:
            return Images.objects.get(uuid=uuid)
        except Images.DoesNotExist:
            raise http.Http404
    
    def get(self, request, uuid):
        image = self.get_image(uuid)
        serializer = ImagePublicSerializer(image, context={"request": request, "image": image})
        return response.Response(serializer.data)
    
    
class ImagePrivateInfo(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_private_info(self, image_uuid, user_uuid):
        return ImUserState.objects.filter(image=image_uuid).get(user=user_uuid)

    def get(self, request, uuid):
        try: 
            state = self.get_private_info(uuid, request.user.id)
            serializer = ImagePrivateSerializer(state)
        except ImUserState.DoesNotExist:
            user = request.user
            serializer = ImagePrivateSerializer(data={"image": uuid, "user": user.id, "vote": 0})
            if serializer.is_valid():
                return response.Response(serializer.data)
        
        return response.Response(serializer.data)
    
    def post(self, request, uuid):
        user = request.user
        try:
            imvote = ImUserState.objects.filter(image=uuid).get(user=user.id)
            serializer = ImagePrivateSerializer(imvote, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
            else:
                return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ImUserState.DoesNotExist:
            serializer = ImagePrivateSerializer(data={**request.data, "user": user.id}, partial=True)
            if serializer.is_valid():
                serializer.save()
            else:
                return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return response.Response(serializer.data)

class UserImages(views.APIView, pagination.PageNumberPagination):
    permission_classes = [permissions.IsAuthenticated]
    page_size = 20
    page_size_query_param = "page_size"
    parser_classes = [NestedMultiPartParser]

    def get_paginated_response(self, data):
        return response.Response({
            "next": self.page.next_page_number() if self.page.has_next() else None,
            "previous": self.page.previous_page_number() if self.page.has_previous() else None,
            "count": self.page.paginator.count,
            "data": data
        })
    
    def get_images(self):
        try:
            return Images.objects.all()
        except Images.DoesNotExist:
            return http.Http404
    
    def get(self, request):
        match request.query_params:
            case {
                    "tab": "uploaded", 
                    **etc
            }:
                user = request.user
                imgs = self.get_images()
                imgs = imgs.filter(uploaded_by=user)
                imgs = imgs.order_by("-upload_date")
                imgs = self.paginate_queryset(imgs, self.request)
                serializer = AllImageSerializer(imgs, many=True)
                return self.get_paginated_response(serializer.data)
            case {
                    "tab": "upvoted", 
                    **etc
            }:
                user = request.user
                imgs = self.get_images()
                imgs = imgs.filter(imuserstate__vote=1)
                imgs = imgs.filter(imuserstate__user=user.id)
                imgs = imgs.distinct()
                imgs = imgs.order_by("-upload_date")
                imgs = self.paginate_queryset(imgs, self.request)
                serializer = AllImageSerializer(imgs, many=True)
                return self.get_paginated_response(serializer.data)
            case _:
                return response.Response(status=status.HTTP_400_BAD_REQUEST)
        