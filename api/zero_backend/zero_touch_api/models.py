from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class ZeroTouch(models.Model):

    ip = models.CharField(max_length=30)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.ip
