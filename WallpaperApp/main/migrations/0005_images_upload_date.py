# Generated by Django 4.1 on 2022-08-17 11:42

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0004_remove_images_user_uuid_images_user_id_delete_users"),
    ]

    operations = [
        migrations.AddField(
            model_name="images",
            name="upload_date",
            field=models.DateField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]
