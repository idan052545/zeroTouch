from rest_framework import serializers
from .models import Field

# from .models import ZeroTouch


# class ZeroTouchSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ZeroTouch
#         fields = ["IP", "network", "siteNumber", "numOfUsers"]


class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = ["name", "label", "imageUrl", "status", "isDropdown"]
