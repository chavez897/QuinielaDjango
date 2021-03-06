# Generated by Django 3.1.7 on 2021-04-19 16:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_userprofile_leagues'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('league', '0002_auto_20210418_1327'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserprofileLeagueEnrollment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True, help_text=('Indica si el registro debe ser tratado como activo.', 'Desmarque esta opción en lugar de borrar el registro'), verbose_name='active')),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='Fecha en que el registro fue creado.', null=True, verbose_name='Fecha de creación')),
                ('modified_at', models.DateTimeField(auto_now=True, help_text='Última fecha en que el registro fue modificado', null=True, verbose_name='Ultima modificación')),
                ('created_by', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='league_userprofileleagueenrollment_created', to=settings.AUTH_USER_MODEL, verbose_name='Usuario creador')),
                ('league', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='league.league', verbose_name='Liga')),
                ('modified_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='league_userprofileleagueenrollment_modified', to=settings.AUTH_USER_MODEL, verbose_name='Usuario editor')),
                ('userprofile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.userprofile', verbose_name='Perfil de Usuario')),
            ],
            options={
                'verbose_name': 'Inscripción Liga',
                'verbose_name_plural': 'Inscripciones Ligas',
            },
        ),
    ]
