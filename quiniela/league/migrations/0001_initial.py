# Generated by Django 3.1.7 on 2021-04-18 17:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='League',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True, help_text=('Indica si el registro debe ser tratado como activo.', 'Desmarque esta opción en lugar de borrar el registro'), verbose_name='active')),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='Fecha en que el registro fue creado.', null=True, verbose_name='Fecha de creación')),
                ('modified_at', models.DateTimeField(auto_now=True, help_text='Última fecha en que el registro fue modificado', null=True, verbose_name='Ultima modificación')),
                ('name', models.CharField(max_length=120, verbose_name='Nombre de la liga')),
                ('slug', models.SlugField(default='na', max_length=120)),
                ('picture', models.ImageField(blank=True, max_length=1000, null=True, upload_to='league/picture/%Y/%m/%d/', verbose_name='Avatar')),
                ('created_by', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='league_league_created', to=settings.AUTH_USER_MODEL, verbose_name='Usuario creador')),
                ('modified_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='league_league_modified', to=settings.AUTH_USER_MODEL, verbose_name='Usuario editor')),
            ],
            options={
                'ordering': ['-created_at', '-modified_at'],
                'abstract': False,
            },
        ),
    ]
