# Generated by Django 5.0.6 on 2024-10-07 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0003_alter_turno_monto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='turno',
            name='monto',
            field=models.FloatField(),
        ),
    ]
