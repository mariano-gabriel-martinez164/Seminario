# Generated by Django 5.0.6 on 2024-08-09 02:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Agenda', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='agenda',
            old_name='agendaID',
            new_name='id',
        ),
        migrations.RenameField(
            model_name='turnotemplate',
            old_name='agendaID',
            new_name='agenda',
        ),
        migrations.RenameField(
            model_name='turnotemplate',
            old_name='turnoTemplateId',
            new_name='id',
        ),
    ]
