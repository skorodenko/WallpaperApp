import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    """ Users
        - id: replaces int id with uuid
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = None
    last_name = None
    last_login = None