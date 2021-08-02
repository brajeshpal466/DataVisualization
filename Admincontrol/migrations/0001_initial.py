# Generated by Django 3.0 on 2020-11-05 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CATE',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cate', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, default='slug-empty', null=True)),
            ],
        ),
    ]
