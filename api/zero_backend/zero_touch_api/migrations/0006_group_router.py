# Generated by Django 4.1.2 on 2022-10-25 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("zero_touch_api", "0005_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Group",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="Router",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("hostname", models.CharField(max_length=255)),
                ("ip", models.CharField(max_length=255)),
                ("platform", models.CharField(max_length=255)),
                ("username", models.CharField(max_length=255)),
                ("password", models.CharField(max_length=255)),
                ("siteNumber", models.PositiveSmallIntegerField()),
                ("network", models.CharField(max_length=255)),
                ("numOfUsers", models.PositiveSmallIntegerField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "groups",
                    models.ManyToManyField(blank=True, to="zero_touch_api.group"),
                ),
            ],
        ),
    ]
