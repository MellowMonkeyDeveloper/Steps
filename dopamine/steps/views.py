from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Dopamine, Strides, Steps
from rest_framework.filters import SearchFilter
from .serializers import DopamineSerializer, PasswordResetSerializer, StridesSerializer, StepsSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.views import APIView

class DopamineListCreateAPIView(generics.ListCreateAPIView):
    queryset = Dopamine.objects.all()
    serializer_class = DopamineSerializer
    

class DopaminePatchExistingView(generics.RetrieveUpdateAPIView):
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
    queryset = Dopamine.objects.all()
    serializer_class = DopamineSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Dopamine.objects.filter(user=user)


class StridesPatchExistingView(generics.RetrieveUpdateAPIView):
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
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
        User.objects.create_user(email=email, password=password)
        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )


class UserLogin(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)
        if user:
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


class ForgotPassword(APIView):
    def post(self, request):
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        token = PasswordResetTokenGenerator().make_token(user)
        # Send the reset password link with the token to the user's email
        # Example: reset_password_link = f"https://example.com/reset-password/{token}"
        # Use your own logic to send emails
        resetlink = f"https://dopaminegoals.com/resetpassword/{token}"
        send_mail(
            "Reset your password",
            f"Use this link to reset your password: {resetlink}",
            "hart.edward91@gmail.com",
            [email],
            fail_silently=False,
        )
        return Response(
            {"message": "Reset password email sent"}, status=status.HTTP_200_OK
        )

class PasswordResetAPIView(APIView):
    def get(self, request, uidb64, token):
        try:
            # Decode UID from base64 and get the user
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        
        # Verify the token and the user
        if user is not None and PasswordResetTokenGenerator().check_token(user, token):
            # Display the password reset form or send the password reset token to the frontend
            return Response({'uid': uidb64, 'token': token}, status=status.HTTP_200_OK)
        else:
            # Invalid token or user, display an error message
            return Response({'error': 'Invalid token or user'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        uidb64 = serializer.validated_data.get('uid')
        token = serializer.validated_data.get('token')
        new_password = serializer.validated_data.get('new_password')
        
        try:
            # Decode UID from base64 and get the user
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        
        # Verify the token and the user
        if user is not None and PasswordResetTokenGenerator().check_token(user, token):
            # Handle password reset
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password reset successful'}, status=status.HTTP_200_OK)
        else:
            # Invalid token or user, display an error message
            return