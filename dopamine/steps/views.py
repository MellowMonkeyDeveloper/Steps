from django.shortcuts import render

# Create your views here.
# views.py
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.encoding import force_str, force_bytes
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Dopamine, Strides, Steps, ToDo
from rest_framework.filters import SearchFilter
from .serializers import (
    DopamineSerializer,
    PasswordResetSerializer,
    StridesSerializer,
    StepsSerializer,
    UserSerializer,
    ToDoSerializer,
)
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView,
    RetrieveDestroyAPIView,
    RetrieveUpdateAPIView,
)
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"})


class ToDoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print(request.user)
        request["user"] = request.user.id
        serializer = ToDoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, *args, **kwargs):
        todo = get_object_or_404(ToDo, pk=pk)
        serializer = ToDoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *argw, **kwargs):
        todo = get_object_or_404(ToDo, pk=pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DopamineRetrieveView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        dopamine = Dopamine.objects.all()
        serializer = DopamineSerializer(dopamine, many=True)
        return Response(serializer.data)


class DopamineCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):

        print(request.data)
        todo_serializer = ToDoSerializer(data=request.data)
        if todo_serializer.is_valid():
            todo = todo_serializer.save(user_id=request.data["user"])
        else:
            print(todo_serializer.errors)
            return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        dopamine_serializer = DopamineSerializer(
            data={"todo": request.data, "user": request.data["user"]}
        )
        print(todo.id)
        if dopamine_serializer.is_valid():
            dopamine_serializer.save()
            return Response(dopamine_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(dopamine_serializer.errors)

            return Response(
                dopamine_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class StridesRetrieveView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        strides = get_object_or_404(Strides, pk=pk)
        serializer = StridesSerializer(strides)
        return Response(serializer.data)


class StepsRetrieviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        steps = get_object_or_404(Steps, pk=pk)
        serializer = StepsSerializer(steps)
        return Response(serializer.data)


class UserRegistration(APIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(UserRegistration, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        print(request.data)
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        User = get_user_model()
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.create_user(
            username=username, email=email, password=password
        )
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "message": "User created successfully"},
            status=status.HTTP_201_CREATED,
        )


class UserLogin(APIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(UserLogin, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        username = request.data.get("username")
        print(email, password)
        user = authenticate(request, email=email, username=username, password=password)
        print(user)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {"token": token.key, "userID": user.id, "message": "Login successful"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


class ForgotPassword(APIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(ForgotPassword, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        email = request.data.get("email")
        try:
            user = settings.AUTH_USER_MODEL.objects.get(email=email)
        except settings.AUTH_USER_MODEL.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_decode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        # Send the reset password link with the token to the user's email
        # Example: reset_password_link = f"https://example.com/reset-password/{token}"
        # Use your own logic to send emails
        resetlink = f"https://dopaminegoals.com/resetpassword/{uid}/{token}"
        send_mail(
            "Reset your password",
            f"Use this link to reset your password: {resetlink}",
            "dopaminesteps@gmail.com",
            [email],
            fail_silently=False,
        )
        return Response(
            {"message": "Reset password email sent"}, status=status.HTTP_200_OK
        )


class PasswordResetAPIView(APIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(PasswordResetAPIView, self).dispatch(request, *args, **kwargs)

    def get(self, request, uidb64, token):
        try:
            # Decode UID from base64 and get the user
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = settings.AUTH_USER_MODEL.objects.get(pk=uid)
        except (
            TypeError,
            ValueError,
            OverflowError,
            settings.AUTH_USER_MODEL.DoesNotExist,
        ):
            user = None

        # Verify the token and the user
        token_generator = PasswordResetTokenGenerator()
        if user is not None and token_generator.check_token(user, token):
            # Display the password reset form or send the password reset token to the frontend
            return Response({"uid": uidb64, "token": token}, status=status.HTTP_200_OK)
        else:
            # Invalid token or user, display an error message
            return Response(
                {"error": "Invalid token or user"}, status=status.HTTP_400_BAD_REQUEST
            )

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        uidb64 = serializer.validated_data.get("uid")
        token = serializer.validated_data.get("token")
        new_password = serializer.validated_data.get("new_password")

        try:
            # Decode UID from base64 and get the user
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = settings.AUTH_USER_MODEL.objects.get(pk=uid)
        except (
            TypeError,
            ValueError,
            OverflowError,
            settings.AUTH_USER_MODEL.DoesNotExist,
        ):
            user = None

        # Verify the token and the user
        if user is not None and PasswordResetTokenGenerator().check_token(user, token):
            # Handle password reset
            user.set_password(new_password)
            user.save()
            return Response(
                {"message": "Password reset successful"}, status=status.HTTP_200_OK
            )
        else:
            # Invalid token or user, display an error message
            return
