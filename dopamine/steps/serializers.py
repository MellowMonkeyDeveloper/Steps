# serializers.py
from rest_framework import serializers
from .models import Dopamine, Strides, Steps, ToDo
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from rest_framework import serializers
from django.conf import settings


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = "__all__"


class StepsSerializer(ToDoSerializer):
    class Meta:
        model = Steps
        fields = "__all__"


class StridesSerializer(ToDoSerializer):

    class Meta:
        model = Strides
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ["email", "password", "username"]
        extra_kwargs = {"password": {"write_only": True}}


class DopamineSerializer(serializers.ModelSerializer):
    todo = ToDoSerializer()
    class Meta:
        model = Dopamine
        fields = "__all__"
    
    def create(self, validated_data):
        todo_data = validated_data.pop('todo')
        todo = ToDo.objects.create(**todo_data)
        dopamine = Dopamine.objects.create(todo = todo, **validated_data)
        return dopamine


class PasswordResetSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)  # Adjust min_length as needed

    def validate(self, data):
        uid = data.get("uid")
        token = data.get("token")
        new_password = data.get("new_password")

        # Validate UID
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = settings.AUTH_USER_MODEL.objects.get(pk=uid)
        except (
            TypeError,
            ValueError,
            OverflowError,
            settings.AUTH_USER_MODEL.DoesNotExist,
        ):
            raise serializers.ValidationError({"error": "Invalid user"})

        # Validate token
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise serializers.ValidationError({"error": "Invalid token"})

        # You may add more validation logic here if needed

        return data
