from rest_framework import serializers
from .models import ZeroTouch


class ZeroTouchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZeroTouch
        fields = [
            "ip",
        ]
