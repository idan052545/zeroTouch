from django.contrib import admin, messages
from django.db.models.aggregates import Count
from django.db.models.query import QuerySet
from django.utils.html import format_html, urlencode
from django.urls import reverse
from . import models

# Register your models here.


@admin.register(models.Field)
class FieldAdmin(admin.ModelAdmin):
    # autocomplete_fields = ["fields"]
    # prepopulated_fields = {"slug": ["name"]}
    list_display = ["name", "label", "imageUrl", "status", "isDropdown"]


@admin.register(models.Router)
class ProductAdmin(admin.ModelAdmin):
    # autocomplete_fields = ["groups"]
    # prepopulated_fields = {
    #     'slug': ['title']
    # }
    list_display = [
        "hostname",
        "ip",
        "platform",
        "username",
        "password",
        "siteNumber",
        "network",
        "numOfUsers",
        "created_at",
    ]
    # list_editable = ['unit_price']
    # list_filter = ['collection', 'last_update', InventoryFilter]
    list_per_page = 10
    # search_fields = ['title']
