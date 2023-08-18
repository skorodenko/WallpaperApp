from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    """ Users table

    TODO
    :param AbstractUser: _description_
    :type AbstractUser: _type_
    """
    id = models.UUIDField(primary_key=True, default=uuid4)
    first_name = None
    last_name = None
    last_login = None