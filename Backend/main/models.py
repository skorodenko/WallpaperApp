import os
import uuid
import hashlib
from PIL import Image
from django.db import models
from authentication.models import Users


def hash_upload(instance, filename):
    """ 
    Upon upload rename file according to its contents' sha512 hash.
    """
    im = Image.open(instance.image)
    fname, ext = os.path.splitext(filename)
    hashname = hashlib.sha512(im.tobytes()).hexdigest()
    return f"{hashname}{ext}"

class Images(models.Model):
    """ Images
        - uuid
        - image_path: path to underlying media
        - upload_date: date when image was uploaded
        - stat: user related statistics for image 
    """
    class Meta:
        permissions = (
            ("image_ownership", "Own image permission"),
        )

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to=hash_upload)
    upload_date = models.DateField(auto_now_add=True)
    stat = models.ManyToManyField(Users, through="UserImStat")

    def __str__(self):
        return f"Image<{self.uuid}>: {self.image.name}"


class UserImStat(models.Model):
    """ User Image Statistics
        - user_uuid
        - image_uuid
        - vote
    """
    class Votes(models.IntegerChoices):
        UPVOTE = 1
        DOWNVOTE = -1

    user_uuid = models.ForeignKey(Users, on_delete=models.CASCADE)
    image_uuid = models.ForeignKey(Images, on_delete=models.CASCADE)
    vote = models.IntegerField(choices=Votes.choices)


class ImProperties(models.Model):
    """ Image properties
        - image_uuid
        - tags
        - tagged: True if image was tagged by users, False otherwise
    """
    image_uuid = models.ForeignKey(Images, on_delete=models.CASCADE)
    image_uuid.db_column = "image_uuid"
    tags = models.ManyToManyField("ImTags")
    tagged = models.BooleanField(default=False)

    def __str__(self):
        return f"ImageProperties<{self.image_uuid}>: is_tagged({self.tagged})"


class ImTags(models.Model):
    """ Image tags
        - name: tag name
    """
    name = models.CharField(max_length=60)

    def __str__(self):
        return f"Tag<{self.id}>: {self.name}"