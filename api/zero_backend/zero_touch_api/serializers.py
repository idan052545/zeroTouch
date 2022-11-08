from rest_framework import serializers
from .models import Field, FieldImage, Router, Group
from django.db import transaction

# from .models import ZeroTouch


# class ZeroTouchSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ZeroTouch
#         fields = ["IP", "network", "siteNumber", "numOfUsers"]


class FieldImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        field_id = self.context["field_id"]
        return FieldImage.objects.create(field_id=field_id, **validated_data)

    class Meta:
        model = FieldImage
        fields = ["id", "image"]


class FieldSerializer(serializers.ModelSerializer):
    images = FieldImageSerializer(many=True, read_only=True)

    class Meta:
        model = Field
        fields = ["name", "label", "imageUrl", "status", "isDropdown", "images"]


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["title"]


class RouterSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    groups = GroupSerializer(many=True, read_only=True)

    class Meta:
        model = Router
        fields = [
            "id",
            "hostname",
            "ip",
            "platform",
            "username",
            "password",
            "groups",
            "siteNumber",
            "network",
            "numOfUsers",
            "created_at",
        ]


class CreateRouterSerializer(serializers.Serializer):
    def validate_Router_ip(self, ip):
        if not Router.objects.filter(ip=ip).exists():
            raise serializers.ValidationError("No router with the given ip was found.")
        return ip

    # def save(self, **kwargs):
    #     with transaction.atomic():

    #         return order
