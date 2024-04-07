# serializers.py
from rest_framework import serializers
from .models import Dopamine, Strides, Steps
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from rest_framework import serializers
from django.conf import settings


class StepsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Steps
        fields = '__all__'

class StridesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Strides
        fields = '__all__'


    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['email', 'password', 'username']
        extra_kwargs = {'password': {'write_only': True}}
   

class DopamineSerializer(serializers.ModelSerializer):
    strides = StridesSerializer(many=True, required=False)
    steps = StepsSerializer(many=True, required = False)
    class Meta:
        model = Dopamine
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if 'strides' in representation:
            representation['strides'] = [
                {
                    **stride_data,
                    'steps': StepsSerializer(stride.steps.all(), many=True).data
                }
                for stride_data, stride in zip(representation['strides'], instance.strides.all())
            ]
        return representation

class PasswordResetSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)  # Adjust min_length as needed

    def validate(self, data):
        uid = data.get('uid')
        token = data.get('token')
        new_password = data.get('new_password')

        # Validate UID
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = settings.AUTH_USER_MODEL.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError,  settings.AUTH_USER_MODEL.DoesNotExist):
            raise serializers.ValidationError({'error': 'Invalid user'})

        # Validate token
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise serializers.ValidationError({'error': 'Invalid token'})
        
        # You may add more validation logic here if needed
        
        return data