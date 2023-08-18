from .models import Images, ImTags, ImUserState
from rest_framework import serializers


class ImTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImTags
        fields = ["name"]

class AllImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ["uuid", "image"]
        
class ImageSerializer(serializers.ModelSerializer):
    tags = ImTagsSerializer(many=True, required=False)

    class Meta:
        model = Images
        fields = ["uuid", "image", "tags", "uploaded_by"]

    def create(self, validated_data):
        tags = validated_data.pop("tags") if validated_data.get("tags") else None
        image = Images.objects.create(**validated_data)
        
        if tags:
            for tag_name in tags:
                tag, _ = ImTags.objects.get_or_create(name=tag_name["name"])
                image.tags.add(tag)
        return image

    
class ImagePublicSerializer(serializers.ModelSerializer):
    tags = ImTagsSerializer(many=True, required=False)
    uploaded_by = serializers.SlugRelatedField(read_only=True, slug_field="username")
    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()
   
    class Meta:
        model = Images
        fields = ["uuid", "tags", "uploaded_by", "upvotes", "downvotes"]

    def get_upvotes(self, obj):
        image = self.context.get("image")
        return Images.objects.filter(uuid=image.uuid).filter(imuserstate__vote=1).count()
    
    def get_downvotes(self, obj):
        image = self.context.get("image")
        return Images.objects.filter(uuid=image.uuid).filter(imuserstate__vote=-1).count()


#class ImageVoteSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = ImUserState
#        fields = ["image", "user", "vote"]
#        
#    def update(self, instance, validated_data):
#        vote = validated_data.get("vote")
#        instance.vote = vote
#        instance.save()
#        return instance

    
class ImagePrivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImUserState
        fields = ["user", "image", "vote"]
    
    def update(self, instance, validated_data):
        vote = validated_data.get("vote")
        instance.vote = vote
        instance.save()
        return instance
    
#    def get_user_vote(self, obj):
#        request = self.context.get("request")
#        image = self.context.get("image")
#        try:
#            vote = ImVote.objects.filter(image=image.uuid).get(user=request.user).vote
#        except ObjectDoesNotExist:
#            # If there is no vote for this image
#            vote = 0
#        return vote