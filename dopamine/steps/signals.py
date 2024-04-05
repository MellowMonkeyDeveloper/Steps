from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from .models import CustomUser

@receiver(post_save, sender=CustomUser)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.filter(user=instance).delete()
        Token.objects.create(user=instance)
post_save.connect(create_auth_token, sender=CustomUser)
