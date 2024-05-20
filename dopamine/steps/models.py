from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission, BaseUserManager
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, username, and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, username, password, **extra_fields)


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    # Add any additional fields you may need for your user model
    groups = models.ManyToManyField(
        Group, verbose_name=("groups"), blank=True, related_name="customuser_set"
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=("user permissions"),
        blank=True,
        related_name="customuser_set",
    )

    def can_modify_dopamine(self, dopamine_instance):
        """
        Check if the user has permission to modify the given Dopamine instance.
        """
        return dopamine_instance.user == self


class Dopamine(models.Model):
    todo = models.OneToOneField("ToDo", on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class ToDo(models.Model):
    title = models.CharField(max_length=1000)
    deadline = models.DateField()
    completed = models.BooleanField()
    description = models.CharField(max_length=1000)
    motivation = models.CharField(max_length=1000)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type = models.CharField(max_length=255)

    @classmethod
    def create_todo(
        cls,
        title,
        deadline,
        completed,
        description,
        motivation,
    ):
        """
        Create a new Strides instance associated with the given dopamine.
        """
        return cls.objects.create(
            title=title,
            deadline=deadline,
            completed=completed,
            description=description,
            motivation=motivation,
        )

    def update(
        self,
        title,
        deadline,
        completed,
        description,
        motivation,
    ):
        
        self.title = title
        self.deadline = deadline
        self.completed = completed
        self.description = description
        self.motivation = motivation
        self.save()



class Strides(models.Model):
    key = models.ForeignKey("Dopamine", on_delete=models.CASCADE)
    todo = models.OneToOneField("ToDo", on_delete=models.CASCADE)


class Steps(models.Model):
    key = models.ForeignKey("Strides", on_delete=models.CASCADE)
    todo = models.OneToOneField("ToDo", on_delete=models.CASCADE)
