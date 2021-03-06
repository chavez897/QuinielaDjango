# Generated by Django 3.1.7 on 2021-11-15 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('league', '0005_userprofileleagueenrollment_team_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='league',
            name='name',
            field=models.CharField(max_length=120, unique=True, verbose_name="League's name"),
        ),
        migrations.AlterField(
            model_name='league',
            name='slug',
            field=models.SlugField(default='na', max_length=120, unique=True),
        ),
    ]
