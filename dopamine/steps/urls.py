# urls.py
from django.urls import path
from .views import (
    DopamineRetrieveView,
    DopamineCreateView,
    UserLogin,
    UserRegistration,
    ForgotPassword,
    logout_view
)

urlpatterns = [
    path(
        "api/create/dopamine/",
        DopamineCreateView.as_view(),
        name="dopamine-list-create",
    ),
    
    path(
        "api/get/dopamine",
        DopamineRetrieveView.as_view(),
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
