# Generated by Django 4.0.5 on 2022-07-26 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zero_touch_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='zerotouch',
            name='network',
            field=models.CharField(default='', max_length=30),
            preserve_default=False,
        ),
    ]
