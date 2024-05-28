# serializers.py
from rest_framework import serializers
from .models import Dopamine, Strides, Steps, ToDo
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = "__all__"


class DopamineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dopamine
        fields = "__all__"

    def create(self, validated_data):
        todo_data = validated_data.get("todo")
        request = self.context.get('request')
        user_instance = get_user_model().objects.get(pk=request.user.id)
        dopamine_instance = Dopamine.objects.create(todo=todo_data, user=user_instance)
        return dopamine_instance


class DopamineRetrieveSerializer(serializers.ModelSerializer):
    private_id = serializers.IntegerField(source="id", read_only=True)
    todo = ToDoSerializer()

    class Meta:
        model = Dopamine
        fields = ["private_id", "todo", "user"]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['private_id'] = instance.id
        return rep


class StepsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Steps
        fields = "__all__"

    def create(self, validated_data):
        todo_data = validated_data.get("todo")

        dopamine_data = validated_data.get("key")
        strides_instance = Steps.objects.create(
            todo=todo_data, key=dopamine_data
        )
        return strides_instance
    
class StepsRetrieveSerializer(serializers.ModelSerializer):
    todo = ToDoSerializer()

    class Meta:
        model = Steps
        fields = ["todo", "key"]

    def to_representation(self, instance):
        print(self)
        rep = super().to_representation(instance)
        print(rep)
        rep['id'] = instance.id
        return rep

class StridesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Strides
        fields = "__all__"

    def create(self, validated_data):
        todo_data = validated_data.get("todo")

        dopamine_data = validated_data.get("key")
        strides_instance = Strides.objects.create(
            todo=todo_data, key=dopamine_data
        )
        return strides_instance
    

class StridesRetrieveSerializer(serializers.ModelSerializer):
    todo = ToDoSerializer()

    class Meta:
        model = Strides
        fields = ["todo", "key"]

    def to_representation(self, instance):
        print(self)
        rep = super().to_representation(instance)
        print(rep)
        rep['id'] = instance.id
        return rep


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ["email", "password", "username"]
        extra_kwargs = {"password": {"write_only": True}}


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
