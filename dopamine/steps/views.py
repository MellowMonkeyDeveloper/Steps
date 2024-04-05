from django.shortcuts import render

# Create your views here.
# views.py
from django.utils.encoding import force_str, force_bytes
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Dopamine, Strides, Steps, CustomUser
from rest_framework.filters import SearchFilter
from .serializers import (
    DopamineSerializer,
    PasswordResetSerializer,
    StridesSerializer,
    StepsSerializer,
    UserSerializer,
)
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.views import APIView
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication

def csrf_token(request):
    token = get_token(request)
    return JsonResponse({"csrfToken": token})


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"})


class DopamineListCreateAPIView(generics.ListCreateAPIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(DopamineListCreateAPIView, self).dispatch(request, *args, **kwargs)
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Dopamine.objects.all()
    serializer_class = DopamineSerializer
    
    def perform_create(self, serializer):
        print(self.request.user)
        user_instance = self.request.user 
        serializer.save(user=user_instance)

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class DopaminePatchExistingView(generics.RetrieveUpdateAPIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(DopaminePatchExistingView, self).dispatch(request, *args, **kwargs)

    queryset = Dopamine.objects.all()
    serializer_class = DopamineSerializer
    lookup_field = "title"
    permission_classes = [IsAuthenticated]

    def patch(self, request, title, *args, **kwargs):
        try:
            dopamine_instance = self.get_object()
        except Dopamine.DoesNotExist:
            return Response(
                {"error": "Dopamine instance not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = self.serializer_class(
            dopamine_instance, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DopaminePatchStridesView(generics.RetrieveUpdateAPIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(DopaminePatchStridesView, self).dispatch(request, *args, **kwargs)

    queryset = Dopamine.objects.all()
    serializer_class = DopamineSerializer
    lookup_field = "title"

    def patch(self, request, title, *args, **kwargs):
        try:
            dopamine_instance = self.get_queryset().get(title=title)
        except Dopamine.DoesNotExist:
            return Response(
                {"error": "Dopamine instance not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Extract data to be appended to strides array
        new_strides_data = request.data

        # Create or update Strides objects and append to Dopamine instance
        stride_serializer = StridesSerializer(data=new_strides_data)
        if stride_serializer.is_valid():
            stride_instance = stride_serializer.save()
            dopamine_instance.strides.add(stride_instance)

        return Response(
            self.serializer_class(dopamine_instance).data, status=status.HTTP_200_OK
        )


class DopaminePatchStepsView(generics.RetrieveUpdateAPIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(DopaminePatchStepsView, self).dispatch(request, *args, **kwargs)

    queryset = Dopamine.objects.all()
    serializer_class = DopamineSerializer
    lookup_field = (
        "title"  # Assuming you're using 'title' as the lookup field for Dopamine
    )

    def patch(self, request, title, strides_title, *args, **kwargs):
        try:
            dopamine_instance = self.get_queryset().get(title=title)
        except Dopamine.DoesNotExist:
            return Response(
                {"error": "Dopamine instance not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Find the Stride instance with the specified title within the Dopamine's strides
        try:
            stride_instance = dopamine_instance.strides.get(strides_title=strides_title)
        except Strides.DoesNotExist:
            return Response(
                {"error": "Stride instance not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Extract data for creating Steps object
        steps_data = request.data

        # Create Steps object and append it to the steps array within the Stride instance
        steps_serializer = StepsSerializer(data=steps_data)
        if steps_serializer.is_valid():
            steps_instance = steps_serializer.save()
            stride_instance.steps.add(steps_instance)
            return Response(
                self.serializer_class(dopamine_instance).data, status=status.HTTP_200_OK
            )
        else:
            return Response(steps_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DopamineRetrieveAPIView(generics.ListAPIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(DopamineRetrieveAPIView, self).dispatch(request, *args, **kwargs)

    queryset = Dopamine.objects.all()
    serializer_class = DopamineSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Dopamine.objects.filter(user=user)


class StridesPatchExistingView(generics.RetrieveUpdateAPIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(StridesPatchExistingView, self).dispatch(request, *args, **kwargs)

    queryset = Dopamine.objects.all()
    serializer_class = DopamineSerializer
    lookup_field = (
        "title"  # Assuming you're using 'title' as the lookup field for Dopamine
    )

    def patch(self, request, title, strides_title, *args, **kwargs):
        try:
            dopamine_instance = self.get_queryset().get(title=title)
        except Dopamine.DoesNotExist:
            return Response(
                {"error": "Dopamine instance not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Find the Stride instance with the specified title within the Dopamine's strides
        try:
            strides_instance = dopamine_instance.strides.get(
                strides_title=strides_title
            )
        except Strides.DoesNotExist:
            return Response(
                {"error": "Stride instance not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Create Steps object and append it to the steps array within the Stride instance
        strides_serializer = StridesSerializer(
            instance=strides_instance, data=request.data, partial=True
        )
        if strides_serializer.is_valid():
            strides_serializer.save()
            return Response(
                self.serializer_class(dopamine_instance).data, status=status.HTTP_200_OK
            )
        else:
            return Response(
                strides_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class StepsPatchExistingView(generics.RetrieveUpdateAPIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(StepsPatchExistingView, self).dispatch(request, *args, **kwargs)

    queryset = Dopamine.objects.all()
    serializer_class = DopamineSerializer
    lookup_field = (
        "title"  # Assuming you're using 'title' as the lookup field for Dopamine
    )

    def patch(self, request, title, strides_title, steps_title, *args, **kwargs):
        try:
            dopamine_instance = self.get_queryset().get(title=title)
        except Dopamine.DoesNotExist:
            return Response(
                {"error": "Dopamine instance not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Find the Stride instance with the specified title within the Dopamine's strides
        try:
            strides_instance = dopamine_instance.strides.get(
                strides_title=strides_title
            )
        except Strides.DoesNotExist:
            return Response(
                {"error": "Stride instance not found"}, status=status.HTTP_404_NOT_FOUND
            )
        try:
            steps_instance = strides_instance.steps.get(steps_title=steps_title)
        except Strides.DoesNotExist:
            return Response(
                {"error": "Stride instance not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Create Steps object and append it to the steps array within the Stride instance
        steps_serializer = StepsSerializer(
            instance=steps_instance, data=request.data, partial=True
        )
        if steps_serializer.is_valid():
            steps_serializer.save()

            return Response(
                self.serializer_class(dopamine_instance).data, status=status.HTTP_200_OK
            )
        else:
            return Response(steps_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserRegistration(APIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(UserRegistration, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if CustomUser.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
        user = CustomUser.objects.create_user(email=email, password=password)
        user.save()
        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )


class UserLogin(APIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(UserLogin, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        print(email, password)
        user = authenticate(request, email=email, password=password)
        print(user)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "message": "Login successful"}, status=status.HTTP_200_OK)
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
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
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
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
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
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
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
