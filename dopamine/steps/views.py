from django.shortcuts import render

# Create your views here.
# views.py
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.encoding import force_str, force_bytes
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Dopamine, Strides, Steps, ToDo, CustomUser
from rest_framework.filters import SearchFilter
from .serializers import (
    DopamineSerializer,
    StridesSerializer,
    StepsSerializer,
    UserSerializer,
    StepsRetrieveSerializer,
    ToDoSerializer,
    DopamineRetrieveSerializer,
    StridesRetrieveSerializer,
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
    RetrieveAPIView,
    DestroyAPIView,
    UpdateAPIView,
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
from datetime import timedelta, datetime
import jwt
from django.utils import timezone
from rest_framework.exceptions import AuthenticationFailed
import pytz
from django.urls import reverse
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator


@csrf_exempt
def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({"csrf": csrf_token})


class ToDoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        date_str = request.GET.get("deadline")
        try:
            deadline = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response({"error": "Invalid format"})
        print(date_str)
        try:
            item = ToDo.objects.filter(deadline=deadline)
            serializer = ToDoSerializer(item, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request, *args, **kwargs):
        print(request.user)
        request["user"] = request.user.id
        serializer = ToDoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, *args, **kwargs):
        queryset = ToDo.objects.filter(todo_id=pk)
        serializer = ToDoSerializer(queryset, data=request.data)
        print(request, queryset)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, *args, **kwargs):
        try:
            todo_instance = ToDo.objects.get(id=pk)
        except ToDo.DoesNotExist:
            return Response({"message": "Error finding ToDo Instance"})
        serializer = ToDoSerializer(todo_instance, data=request.data, partial=True)
        print(request.data["completed"], todo_instance)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *argw, **kwargs):
        print(request, pk)
        todo = ToDo.objects.get(id=pk)
        todo.delete()
        return Response({'message': 'Deleted'}, status=status.HTTP_204_NO_CONTENT)


class DopamineRetrieveView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    print("get")

    def get(self, request, *args, **kwargs):
        print(request.user.id)
        dopamine = Dopamine.objects.filter(user=request.user.id)
        serializer = DopamineRetrieveSerializer(dopamine, many=True)
        return Response(serializer.data)


class DopamineCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = DopamineSerializer

    def create(self, request, *args, **kwargs):
        todo_serializer = ToDoSerializer(data=request.data["todo"])
        todo_serializer.initial_data["user"] = request.user.id
        print(request.user.id)
        if todo_serializer.is_valid():

            todo = todo_serializer.save(user_id=request.user.id)
        else:
            print(todo_serializer.errors)
            return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        dopamine_serializer = DopamineSerializer(
            data={"todo": todo.id, "user": request.user.id},
            context={"request": request},
        )
        if dopamine_serializer.is_valid():
            dopamine_serializer.save()
            return Response(dopamine_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(dopamine_serializer.errors)

            return Response(
                dopamine_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class DopamineDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DopamineSerializer

    def delete(self, request, pk, *args, **kwargs):
        queryset = Dopamine.objects.filter(id=pk)
        instance = queryset
        print(instance, request, self)
        self.perform_destroy(instance)
        return Response({'message': 'Deleted'}, status=status.HTTP_204_NO_CONTENT)


class DopamineUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DopamineSerializer

    def get_queryset(self):
        # Filter the queryset based on the logged-in user
        return Dopamine.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        # Get the Dopamine instance based on the pk in the URL
        instance = self.get_object()
        print(instance)
        # Get the data for the todo from the request
        todo_data = request.data.pop("todo", None)
        todo_data["user"] = request.user.id
        if todo_data:
            print(todo_data)
            # Get or create the ToDo instance associated with the Dopamine
            todo_instance, _ = ToDo.objects.get_or_create(id=todo_data["id"])
            print(todo_instance)
            # Serialize the todo data and save it
            todo_serializer = ToDoSerializer(todo_instance, data=todo_data)
            print(todo_serializer)
            todo_serializer.is_valid(raise_exception=True)
            todo_serializer.save()

        # Serialize and update the Dopamine instance
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(todo_data)


class StridesCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request, pk, *args, **kwargs):
        print(request.data["todo"])
        todo_serializer = ToDoSerializer(data=request.data["todo"])
        todo_serializer.initial_data["user"] = request.user.id
        if todo_serializer.is_valid():
            todo = todo_serializer.save(user_id=request.user.id)
        else:
            print(todo_serializer.errors)
            return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        strides_serializer = StridesSerializer(data={"todo": todo.id, "key": pk})
        if strides_serializer.is_valid():
            strides_serializer.save()
            return Response(strides_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(strides_serializer.errors)
            return Response(
                strides_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class StridesRetrieveView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        print(pk)
        strides = Strides.objects.filter(key=pk)
        serializer = StridesRetrieveSerializer(strides, many=True)
        return Response(serializer.data)


class StridesUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StridesSerializer

    def get_queryset(self):
        # Filter the queryset based on the logged-in user
        return Dopamine.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        # Get the Dopamine instance based on the pk in the URL
        instance = self.get_object()
        print(instance)
        # Get the data for the todo from the request
        todo_data = request.data.pop("todo", None)
        todo_data["user"] = request.user.id
        if todo_data:
            print(todo_data)
            # Get or create the ToDo instance associated with the Dopamine
            todo_instance, _ = ToDo.objects.get_or_create(id=todo_data["id"])
            print(todo_instance)
            # Serialize the todo data and save it
            todo_serializer = ToDoSerializer(todo_instance, data=todo_data)
            print(todo_serializer)
            todo_serializer.is_valid(raise_exception=True)
            todo_serializer.save()

        # Serialize and update the Dopamine instance
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(todo_data)


class StridesDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StridesSerializer

    def delete(self, request, pk, *args, **kwargs):

        queryset = Strides.objects.filter(key=pk)
        instance = queryset
        self.perform_destroy(instance)
        return Response({'message': 'Deleted'},status=status.HTTP_204_NO_CONTENT)


class StepsCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request, pk, *args, **kwargs):
        print(request.data["todo"])
        todo_serializer = ToDoSerializer(data=request.data["todo"])
        todo_serializer.initial_data["user"] = request.user.id
        if todo_serializer.is_valid():
            todo = todo_serializer.save(user_id=request.user.id)
        else:
            print(todo_serializer.errors)
            return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        steps_serializer = StepsSerializer(data={"todo": todo.id, "key": pk})
        if steps_serializer.is_valid():
            steps_serializer.save()
            return Response(steps_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(steps_serializer.errors)
            return Response(steps_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StepsRetrieviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        steps = Steps.objects.filter(key=pk)
        serializer = StepsRetrieveSerializer(steps, many=True)
        return Response(serializer.data)


class StepsUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DopamineSerializer

    def get_queryset(self):
        # Filter the queryset based on the logged-in user
        return Dopamine.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        # Get the Dopamine instance based on the pk in the URL
        instance = self.get_object()
        print(instance)
        # Get the data for the todo from the request
        todo_data = request.data.pop("todo", None)
        todo_data["user"] = request.user.id
        if todo_data:
            print(todo_data)
            # Get or create the ToDo instance associated with the Dopamine
            todo_instance, _ = ToDo.objects.get_or_create(id=todo_data["id"])
            print(todo_instance)
            # Serialize the todo data and save it
            todo_serializer = ToDoSerializer(todo_instance, data=todo_data)
            print(todo_serializer)
            todo_serializer.is_valid(raise_exception=True)
            todo_serializer.save()

        # Serialize and update the Dopamine instance
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(todo_data)


class StepsDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StepsSerializer

    def delete(self, request, pk, *args, **kwargs):
        queryset = Steps.objects.filter(key=pk)
        instance = queryset
        self.perform_destroy(instance)
        return Response({'message': 'Deleted'}, status=status.HTTP_204_NO_CONTENT)


class UserRegistration(APIView):
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
        data = {"user_id": user.id}
        token, _ = Token.objects.get_or_create(user=user)

        response = Response(data=data, status=status.HTTP_201_CREATED)
        response.set_cookie(
            "token",
            token.key,
            httponly=True,
            secure=settings.SECURE_COOKIES,
            max_age=3600,
            samesite="Strict",
        )
        return response


class UserLogin(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        username = request.data.get("username")
        print(email, password)
        user = authenticate(request, email=email, username=username, password=password)
        print(user)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            response = Response(status=status.HTTP_200_OK)
            response.set_cookie(
                "token",
                token.key,
                httponly=True,
                secure=settings.SECURE_COOKIES,
                samesite="Strict",
            )
            return response
        else:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


class VerifyCookieView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        print(request)
        try:
            print("success")
            return Response({"message": "Authenticated Success"})
        except AuthenticationFailed:
            print("expired")
            return Response(
                {"error": "Token expired"}, status=status.HTTP_401_UNAUTHORIZED
            )


class ResetPasswordView(APIView):
    def post(self, request):
        uidb64 = request.data.get("uidb64")
        token = request.data.get("token")
        password = request.data.get("password")
        print(token, password)
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response(
                {"message": "Password reset success"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Invalid reset link"}, status=status.HTTP_400_BAD_REQUEST
            )


class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")
        user = CustomUser.objects.filter(email=email).first()
        print(email, user)
        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
          
            reset_url = request.build_absolute_uri(f'http://localhost:3000/reset?uidb64={uid}&token={token}')
            subject = "Reset Your Password"
            message = f"Click the following link to reset your password: {reset_url}"
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email],
                fail_silently=False,
            )
            return Response(
                {"message": "Password reset link has been sent to email"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Invalid email"}, status=status.HTTP_400_BAD_REQUEST
            )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        try:
            token = request.auth
            token.delete()
            return Response({"message": "logout success"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
