# Generated by Django 4.1 on 2022-08-25 19:09

from django.conf import settings
from django.db import migrations, models
import main.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImTags',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
            ],
        ),
        migrations.RemoveField(
            model_name='images',
            name='user_id',
        ),
        migrations.AddField(
            model_name='images',
            name='owner_ids',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='improperties',
            name='tagged',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='images',
            name='image',
            field=models.ImageField(upload_to=main.models.hash_upload),
        ),
        migrations.RemoveField(
            model_name='improperties',
            name='tags',
        ),
        migrations.AddField(
            model_name='improperties',
            name='tags',
            field=models.ManyToManyField(to='main.imtags'),
        ),
    ]