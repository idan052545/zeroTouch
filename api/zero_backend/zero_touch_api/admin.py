from django.contrib import admin, messages
from django.db.models.aggregates import Count
from django.db.models.query import QuerySet
from django.utils.html import format_html, urlencode
from django.urls import reverse
from . import models

# Register your models here.


@admin.register(models.Field)
class ProductAdmin(admin.ModelAdmin):
    # autocomplete_fields = ["fields"]
    # prepopulated_fields = {"slug": ["name"]}
    # actions = ['clear_inventory']
    # inlines = [ProductImageInline]
    list_display = ["name", "label", "imageUrl", "status", "isDropdown"]
