from django import http
from .models import Images
from .serializers import ImageSerializer
from guardian.shortcuts import assign_perm
from django.db.models import Sum
from datetime import timedelta, datetime
from rest_framework import views, response, status


class ListImages(views.APIView):

    def get_images(self, tagged_only=False):
        try:
            imgs = Images.objects.all()
            return imgs.filter(improperties__tagged=True) if tagged_only else imgs
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
            case {"sort": "new", **etc}:
                imgs = self.get_images()
                imgs = imgs.order_by("upload_date")
                serializer = ImageSerializer(imgs, many=True)
                return response.Response(serializer.data)
            case {
                    "sort": "popular", 
                    "delta": ("day" | "week" | "month" | "year" | "all") as delta,
                    **etc
            }:
                imgs = self.get_images()
                imgs = self.apply_timedelta(imgs, delta)
                imgs = imgs.annotate(rating=Sum("userimstat__vote")).order_by("rating")
                serializer = ImageSerializer(imgs, many=True)
                return response.Response(serializer.data)
            case _:
                return response.Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Image(views.APIView):

    def get_image(self, uuid):
        try:
            return Images.objects.get(uuid=uuid)
        except Images.DoesNotExist:
            raise http.Http404

    def get(self, request, uuid):
        img = self.get_image(uuid)
        serializer = ImageSerializer(img)
        return response.Response(serializer.data)
    
    def put(self, request, uuid):
        # TAGME
        ...
    
    def post(self, request, uuid):
        img = self.get_image(uuid)
        user = request.user
        assign_perm("image_ownership", user, img) 
        return response.Response(status=status.HTTP_200_OK)


class ImageVoting(views.APIView):
    ...