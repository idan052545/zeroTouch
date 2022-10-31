from django_filters.rest_framework import FilterSet
from .models import Router


class RouterFilter(FilterSet):
    class Meta:
        model = Router
        fields = {
            "ip": ["exact"],
            "hostname": ["exact"],
            "platform": ["exact"],
            "groups": ["exact"],
            "platform": ["exact"],
            "siteNumber": ["exact"],
        }
