# urls.py
from django.urls import path
from .views import (
    DopamineListCreateAPIView,
    DopaminePatchStridesView,
    DopamineRetrieveAPIView,
    DopaminePatchExistingView,
    DopaminePatchStepsView,
    StepsPatchExistingView,
    StridesPatchExistingView,
    UserLogin,
    UserRegistration,
    ForgotPassword,
    logout_view
)

urlpatterns = [
    path(
        "api/dopamine/",
        DopamineListCreateAPIView.as_view(),
        name="dopamine-list-create",
    ),
    path(
        "api/existing/dopamine/<str:title>/",
        DopaminePatchExistingView.as_view(),
        name="dopamine-patch-existing",
    ),path(
        "api/existing/dopamine/<str:title>/strides/<str:strides_title>/",
        StridesPatchExistingView.as_view(),
        name="strides-patch-existing",
    ),path(
        "api/existing/dopamine/<str:title>/strides/<str:strides_title>/steps/<str:steps_title>/",
        StepsPatchExistingView.as_view(),
        name="steps-patch-existing",
    ),
    path(
        "api/create/steps/dopamine/<str:title>/strides/<str:strides_title>/",
        DopaminePatchStepsView.as_view(),
        name="dopamine-create-steps",
    ),
    path(
        "api/dopamine/<str:title>/",
        DopaminePatchStridesView.as_view(),
        name="dopamine-update-destroy",
    ),
    path(
        "api/hyper/dopamine",
        DopamineRetrieveAPIView.as_view(),
        name="dopamine-retrieve",
    ),
    path(
        'register/', UserRegistration.as_view(), name='register'
    ),
    path(
        'login/', UserLogin.as_view(), name='login'
    ),path(
        'forgot-password/', ForgotPassword.as_view(), name='forgot-password'
    ),
    
    path(
        'logout/', logout_view, name='logout'
    )
   ]
