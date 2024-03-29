from email.policy import default
import json
from random import choices
from djongo import models
from uuid import uuid4
from .validators import validate_file_size

# from django.db import models
# from django.contrib.auth.models import User
# from mongoengine import *
from json import JSONEncoder

# C:\Projects\zero_touch\api\fields.json
# C:\Projects\zero_touch\api\zero_backend\zero_touch_api\models.py
# fields = json.loads(fieldsData)
# Document, fields ,connect.
# connect("zeroTouchDB")


# Create your models here.
# class ZeroTouch(models.Model):

#     IP = models.CharField(max_length=30)
#     network = models.CharField(max_length=30)
#     siteNumber = models.IntegerField
#     numOfUsers = models.IntegerField

#     # user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

#     def __str__(self):
#         return self.ip
class Group(models.Model):
    title = models.CharField(max_length=255)


class Router(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    hostname = models.CharField(max_length=255)
    ip = models.CharField(max_length=255)
    platform = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    groups = models.ManyToManyField(Group, blank=True)
    siteNumber = models.PositiveSmallIntegerField()
    network = models.CharField(max_length=255)
    numOfUsers = models.PositiveSmallIntegerField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["ip", "network"]


class Field(models.Model):
    STATUS_FIXED = "F"
    STATUS_REGULAR = "R"
    STATUS = [(STATUS_FIXED, "fixed"), (STATUS_REGULAR, "")]

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    label = models.CharField(max_length=50)
    # imageUrl = models.CharField(max_length=6000)
    status = models.CharField(max_length=50, choices=STATUS, default=STATUS_REGULAR)
    isDropdown = models.BooleanField()


class FieldImage(models.Model):
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="./images", validators=[validate_file_size])


# class Field(Document):
#     STATUS_FIXED = "F"
#     STATUS_REGULAR = "R"
#     STATUS = [(STATUS_FIXED, "fixed"), (STATUS_REGULAR, "")]

#     id = IntField(primary_key=True)
#     name = StringField(max_length=50)
#     label = StringField(max_length=50)
#     imageUrl = StringField(max_length=6000)
#     status = StringField(max_length=50, choices=STATUS, default=STATUS_REGULAR)
#     isDropdown = BooleanField()


# # fields = json.loads(fieldsData)

# field1 = Field(
#     id=1,
#     name="IP",
#     label="IP",
#     imageUrl="""data:image/png;base64,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""",  # noqa
#     status="F",
#     isDropdown=False,
# )

# field2 = Field(
#     id=2,
#     name="network",
#     label="רשת",
#     imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHvcX_pPhPdhpKi5SYX1JYgTt89Nd9dEF5vA&usqp=CAU",  # noqa
#     status="R",
#     isDropdown=True,
# )

# field3 = Field(
#     id=3,
#     name="siteNumber",
#     label="מספר אתר",
#     imageUrl="""data:image/png;base64,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""",  # noqa
#     status="F",
#     isDropdown=True,
# )

# field4 = Field(
#     id=4,
#     name="numOfUsers",
#     label="מספר משתמשים",
#     imageUrl="""data:image/png;base64,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""",  # noqa
#     status="F",
#     isDropdown=False,
# )

# fields = [field1, field2, field3, field4]
# for field in fields:
#     field.save()
