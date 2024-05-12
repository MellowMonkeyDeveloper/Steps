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
    DopamineRetrieveSerializer,
    StridesRetrieveSerializer
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

@csrf_exempt
def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf': csrf_token})


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
    print('get')
    def get(self, request,pk, *args, **kwargs):
        
        dopamine = Dopamine.objects.filter(user=pk)
        serializer = DopamineRetrieveSerializer(dopamine, many=True)
        return Response(serializer.data)


class DopamineCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def create(self, request,pk, *args, **kwargs):
        print(self)
        todo_serializer = ToDoSerializer(data=request.data['todo'])
        if todo_serializer.is_valid():

            todo = todo_serializer.save(user_id=pk)
        else:
            print(todo_serializer.errors)
            return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        dopamine_serializer = DopamineSerializer(
            data={"todo": todo.id, "user": pk}
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

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class DopamineUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DopamineSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        todo_data = request.data.pop("todo", None)
        if todo_data:
            todo_instance = instance.todo
            todo_serializer = ToDoSerializer(todo_instance, data=todo_data)
            todo_serializer.save(user_id=request.data["user"])
            if todo_serializer.is_valid():
                todo_serializer.save()
            else:
                return Response(
                    todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class StridesCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def create(self, request, pk, *args, **kwargs):
        print(request.data['todo'])
        todo_serializer = ToDoSerializer(data=request.data['todo'])
        if todo_serializer.is_valid():
            todo = todo_serializer.save(user_id=request.data['todo']["user"])
        else:
            print(todo_serializer.errors)
            return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        strides_serializer = StridesSerializer(
            data={"todo": todo.id, "key": pk}
        )
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

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        todo_data = request.data.pop("todo", None)
        if todo_data:
            todo_instance = instance.todo
            todo_serializer = ToDoSerializer(todo_instance, data=todo_data)
            todo_serializer.save(user_id=request.data["user"])
            if todo_serializer.is_valid():
                todo_serializer.save()
            else:
                return Response(
                    todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class StridesDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StridesSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class StepsCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):

        print(request.data)
        todo_serializer = ToDoSerializer(data=request.data)
        if todo_serializer.is_valid():
            todo = todo_serializer.save(user_id=request.data["user"])
        else:
            print(todo_serializer.errors)
            return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        steps_serializer = StepsSerializer(
            data={"todo": request.data, "strides": request.data["strides"]}
        )
        print(todo.id)
        if steps_serializer.is_valid():
            steps_serializer.save()
            return Response(steps_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(steps_serializer.errors)

            return Response(steps_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StepsRetrieviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        strides = get_object_or_404(Strides, pk=pk)
        steps = Steps.objects.filter(key=strides)
        serializer = StepsSerializer(steps, many=True)
        return Response(serializer.data)


class StepsUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StepsSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        todo_data = request.data.pop("todo", None)
        if todo_data:
            todo_instance = instance.todo
            todo_serializer = ToDoSerializer(todo_instance, data=todo_data)
            todo_serializer.save(user_id=request.data["user"])
            if todo_serializer.is_valid():
                todo_serializer.save()
            else:
                return Response(
                    todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class StepsDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StepsSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


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
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "message": "User created successfully"},
            status=status.HTTP_201_CREATED,
        )


class UserLogin(APIView):


    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        username = request.data.get("username")
        print(email, password)
        user = authenticate(request, email=email, username=username, password=password)
        print(user)
        if user:
            login(request, user)
            token_payload = {
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(days=1)
            }
            
            response = JsonResponse({"message": "Login successful", "userID": user.id})
            response.set_cookie("auth_token", token.key, httponly=True)
            return response
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
