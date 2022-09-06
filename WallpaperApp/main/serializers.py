from .models import Images
from rest_framework import serializers


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Images
        fields = ["uuid", "image", "upload_date", "vote", "tags"]

    def create(self, validated_data):
        return Images(**validated_data)