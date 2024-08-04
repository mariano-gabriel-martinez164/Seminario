# Generated by Django 5.0.6 on 2024-08-03 20:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('basic', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Agenda',
            fields=[
                ('agendaID', models.AutoField(primary_key=True, serialize=False)),
                ('CentroOdontologico', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='basic.centroodontologico')),
                ('odontologo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='basic.odontologo')),
            ],
        ),
        migrations.CreateModel(
            name='turnoTemplate',
            fields=[
                ('turnoTemplateId', models.AutoField(primary_key=True, serialize=False)),
                ('horaInicio', models.TimeField()),
                ('horaFin', models.TimeField()),
                ('diaSemana', models.CharField(choices=[('LUNES', 'Lunes'), ('MARTES', 'Martes'), ('MIERCOLES', 'Miércoles'), ('JUEVES', 'Jueves'), ('VIERNES', 'Viernes'), ('SABADO', 'Sábado'), ('DOMINGO', 'Domingo')], max_length=20)),
                ('agendaID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='turnos', to='Agenda.agenda')),
            ],
        ),
    ]
