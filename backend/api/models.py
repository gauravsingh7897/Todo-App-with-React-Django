from django.db import models

# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=50)
    detail = models.TextField(null=True, blank=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
