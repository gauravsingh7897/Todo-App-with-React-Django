# Generated by Django 3.1.3 on 2020-11-11 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='title',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='todo',
            name='detail',
            field=models.TextField(blank=True, null=True),
        ),
    ]
