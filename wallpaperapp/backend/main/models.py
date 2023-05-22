import os
import uuid
import hashlib
from PIL import Image
from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from authentication.models import Users
from django.core.exceptions import ValidationError


def hash_upload(instance, filename):
    """ 
    Upon upload rename file according to its contents' sha512 hash.
    """
    im = Image.open(instance.image)
    fname, ext = os.path.splitext(filename)
    hashname = hashlib.sha256(im.tobytes()).hexdigest()
    return f"{hashname}{ext}"

class Images(models.Model):
    """ Images
        - uuid
        - image: path to underlying media
        - upload_date: date when image was uploaded
        - stat: user related statistics for image 
    """
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to=hash_upload)
    thumbnail = ImageSpecField(source="image", processors=[ResizeToFill(300, 300)], format="PNG",
                                      options={"quality": 60})
    upload_date = models.DateField(auto_now_add=True)
    uploaded_by = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="uploaded_images")
    state = models.ManyToManyField(Users, through="ImUserState", related_name="state_images")
    tags = models.ManyToManyField("ImTags")
    
    def __str__(self):
        return f"Image<{self.uuid}>: {self.image.name}"


class ImUserState(models.Model):
    class Meta:
        unique_together = ["image", "user"]
    
    class Votes(models.IntegerChoices):
        NOVOTE = 0
        UPVOTE = 1
        DOWNVOTE = -1
    
    image = models.ForeignKey(Images, on_delete=models.CASCADE)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    vote = models.IntegerField(choices=Votes.choices)


class ImTags(models.Model):
    """ Image tags
        - name: tag name
    """
    name = models.CharField(max_length=256)

    def __str__(self):
        return f"Tag<{self.id}>: {self.name}"