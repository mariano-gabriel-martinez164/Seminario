# Generated by Django 5.0.6 on 2024-08-14 22:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Agenda', '0003_alter_turnotemplate_diasemana'),
        ('pacientes', '0001_initial'),
        ('turnos', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='turno',
            options={'ordering': ['fecha', 'horaInicio']},
        ),
        migrations.AlterField(
            model_name='turno',
            name='administrativo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='turnos_administrativo', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='turno',
            name='agenda',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='turnos_agenda', to='Agenda.agenda'),
        ),
        migrations.AlterField(
            model_name='turno',
            name='observaciones',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='turno',
            name='paciente',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='turnos_paciente', to='pacientes.paciente'),
        ),
    ]