# Generated by Django 5.0.6 on 2024-10-07 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='prestacion',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]