# Generated by Django 4.1 on 2022-08-30 07:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_userimstat_remove_images_owner_ids_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userimstat',
            old_name='image',
            new_name='image_uuid',
        ),
        migrations.RenameField(
            model_name='userimstat',
            old_name='user',
            new_name='user_uuid',
        ),
    ]
