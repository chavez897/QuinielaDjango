# Generated by Django 3.1.7 on 2021-11-09 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('league', '0004_auto_20210915_1338'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofileleagueenrollment',
            name='team_picture',
            field=models.ImageField(blank=True, max_length=1000, null=True, upload_to='team/picture/%Y/%m/%d/', verbose_name='Team Picture'),
        ),
    ]
