import uuid
from django.db import models
from django.contrib.auth.models import User


class Images(models.Model):
    """ Images
        - uuid
        - user_id: id of media uploader
        - image_path: path to underlying media
    """
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    user_id.db_column = "user_id"
    #TODO do something with this :) 
    image = models.ImageField(upload_to="wallpapers/")

    def __str__(self):
        return f"Image: {self.image.name}"


class ImStatistics(models.Model):
    """ Statistics on particular image
        - image_uuid
        - upvotes: number of upvotes (likes)
        - downvotes: number of downvotes (dislikes)
        - views: number of media views
    """
    image_uuid = models.ForeignKey(Images, on_delete=models.CASCADE)
    image_uuid.db_column = "image_uuid"
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    views = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Image<{self.image_uuid}>: up({self.upvotes}) \
            down({self.downvotes}) views({self.views})"


class ImProperties(models.Model):
    """ Image properties
        - image_uuid
        - height
        - width
        - tags
    """
    image_uuid = models.ForeignKey(Images, on_delete=models.CASCADE)
    image_uuid.db_column = "image_uuid"
    height = models.PositiveSmallIntegerField()
    width = models.PositiveSmallIntegerField()
    #TODO do something with this :) 
    tags = models.JSONField()

    def __str__(self):
        return f"Image<{self.image_uuid}>: {self.width}x{self.height}"