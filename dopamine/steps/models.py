from django.db import models
from django.contrib.auth.models import AbstractUser, Permission


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    custom = models.ManyToManyField(
        Permission,
        verbose_name=('groups'),
        blank=True,
        related_name="%(class)s_groups",
        related_query_name="%(class)s_group",
        
    )


class Dopamine(models.Model):
    title = models.CharField(max_length=255, unique=True)
    deadline = models.DateField()
    completed = models.BooleanField()
    description = models.CharField(max_length=400)
    motivation = models.CharField(max_length=400)
    strides = models.ManyToManyField("Strides", blank=True, related_name='dopamine_users')


class Strides(models.Model):
    strides_title = models.CharField(max_length=255, unique=True)
    strides_deadline = models.DateField()
    strides_completed = models.BooleanField()
    strides_description = models.CharField(max_length=400)
    strides_motivation = models.CharField(max_length=400)
    steps = models.ManyToManyField("Steps", blank=True, related_name='strides_users')


class Steps(models.Model):
    steps_title = models.CharField(max_length=255, unique=True)
    steps_deadline = models.DateField()
    steps_completed = models.BooleanField()
    steps_description = models.CharField(max_length=400)
    steps_motivation = models.CharField(max_length=400)
