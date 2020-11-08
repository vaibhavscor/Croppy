# Generated by Django 3.1.2 on 2020-11-08 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.ImageField(upload_to='images')),
                ('uploaded', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
