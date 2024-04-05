from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission, BaseUserManager
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, username, and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
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
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None)
    title = models.CharField(max_length=255, unique=True)
    deadline = models.DateField()
    completed = models.BooleanField()
    description = models.CharField(max_length=400)
    motivation = models.CharField(max_length=400)

    @classmethod
    def create_dopamine(cls,user_email, user, title, deadline, completed, description, motivation):
        """
        Create a new Dopamine instance associated with the given user.
        """
        try:
            user_instance = CustomUser.objects.get(email=user_email)
            return cls.objects.create(
                user=user_instance,
                title=title,
                deadline=deadline,
                completed=completed,
                description=description,
                motivation=motivation,
            )
        except ObjectDoesNotExist:
            pass

    def update_dopamine(self, title, deadline, completed, description, motivation):
        """
        Update the attributes of the Dopamine instance.
        """
        self.title = title
        self.deadline = deadline
        self.completed = completed
        self.description = description
        self.motivation = motivation
        self.save()

    def delete_dopamine(self):
        """
        Delete the Dopamine instance.
        """
        self.delete()


class Strides(models.Model):
    dopamine = models.ForeignKey(Dopamine, on_delete=models.CASCADE)
    strides_title = models.CharField(max_length=255, unique=True)
    strides_deadline = models.DateField()
    strides_completed = models.BooleanField()
    strides_description = models.CharField(max_length=400)
    strides_motivation = models.CharField(max_length=400)

    @classmethod
    def create_strides(
        cls,
        dopamine,
        strides_title,
        strides_deadline,
        strides_completed,
        strides_description,
        strides_motivation,
    ):
        """
        Create a new Strides instance associated with the given dopamine.
        """
        return cls.objects.create(
            dopamine=dopamine,
            strides_title=strides_title,
            strides_deadline=strides_deadline,
            strides_completed=strides_completed,
            strides_description=strides_description,
            strides_motivation=strides_motivation,
        )

    def update_strides(
        self,
        strides_title,
        strides_deadline,
        strides_completed,
        strides_description,
        strides_motivation,
    ):
        """
        Update the attributes of the Strides instance.
        """
        self.strides_title = strides_title
        self.strides_deadline = strides_deadline
        self.strides_completed = strides_completed
        self.strides_description = strides_description
        self.strides_motivation = strides_motivation
        self.save()

    def delete_strides(self):
        """
        Delete the Strides instance.
        """
        self.delete()


class Steps(models.Model):
    strides = models.ForeignKey(Strides, on_delete=models.CASCADE)
    steps_title = models.CharField(max_length=255, unique=True)
    steps_deadline = models.DateField()
    steps_completed = models.BooleanField()
    steps_description = models.CharField(max_length=400)
    steps_motivation = models.CharField(max_length=400)

    @classmethod
    def create_steps(
        cls,
        strides,
        steps_title,
        steps_deadline,
        steps_completed,
        steps_description,
        steps_motivation,
    ):
        """
        Create a new Steps instance associated with the given strides.
        """
        return cls.objects.create(
            strides=strides,
            steps_title=steps_title,
            steps_deadline=steps_deadline,
            steps_completed=steps_completed,
            steps_description=steps_description,
            steps_motivation=steps_motivation,
        )

    def update_steps(
        self,
        steps_title,
        steps_deadline,
        steps_completed,
        steps_description,
        steps_motivation,
    ):
        """
        Update the attributes of the Steps instance.
        """
        self.steps_title = steps_title
        self.steps_deadline = steps_deadline
        self.steps_completed = steps_completed
        self.steps_description = steps_description
        self.steps_motivation = steps_motivation
        self.save()

    def delete_steps(self):
        """
        Delete the Steps instance.
        """
        self.delete()
