# urls.py
from django.urls import path
from .views import (
    DopamineRetrieveView,
    DopamineCreateView,
    DopamineUpdateView,
    DopamineDeleteView,
    UserLogin,
    UserRegistration,
    get_csrf_token,
    StridesCreateView,
    StridesRetrieveView,
    StridesDeleteView,
    StridesUpdateView,
    StepsCreateView,
    StepsRetrieviewView,
    StepsUpdateView,
    StepsDeleteView,
    VerifyCookieView,
    ToDoView,
    LogoutView,
    ForgotPasswordView,
    ResetPasswordView
)

urlpatterns = [
    path("api/get/csrf/", get_csrf_token, name="csrf"),
    path("api/verify/", VerifyCookieView.as_view(), name="verify-token"),
    path(
        "api/create/dopamine/",
        DopamineCreateView.as_view(),
        name="dopamine-create",
    ),
    path(
        "api/create/strides/<int:pk>/",
        StridesCreateView.as_view(),
        name="strides-create",
    ),
    path(
        "api/create/steps/<int:pk>/",
        StepsCreateView.as_view(),
        name="steps-create",
    ),
    path(
        "api/delete/dopamine/<int:pk>/",
        DopamineDeleteView.as_view(),
        name="dopamine-delete",
    ),
    path(
        "api/delete/strides/<int:pk>/",
        StridesDeleteView.as_view(),
        name="strides-delete",
    ),
    path(
        "api/delete/steps/<int:pk>/",
        StepsDeleteView.as_view(),
        name="steps-delete",
    ),
    path(
        "api/get/dopamine/",
        DopamineRetrieveView.as_view(),
        name="dopamine-retrieve",
    ),
    path(
        "api/get/strides/<int:pk>/",
        StridesRetrieveView.as_view(),
        name="strides-retrieve",
    ),
    path(
        "api/get/steps/<int:pk>/",
        StepsRetrieviewView.as_view(),
        name="steps-retrieve",
    ),
    path(
        "api/update/dopamine/<int:pk>/",
        DopamineUpdateView.as_view(),
        name="dopamine-update",
    ),
    path(
        "api/update/strides/<int:pk>/",
        StridesUpdateView.as_view(),
        name="strides-update",
    ),
    path(
        "api/update/steps/<int:pk>/",
        StepsUpdateView.as_view(),
        name="steps-update",
    ),
    path(
        "api/get/deadlines",
        ToDoView.as_view(),
        name="get-deadlines",
    ),
    path(
        'api/update/todo/<int:pk>/',
        ToDoView.as_view(),
        name="update-deadlines"
    ),
    path(
        'api/delete/todo/<int:pk>/',
        ToDoView.as_view(),
        name='delete-deadlines'
    ),
    path("register/", UserRegistration.as_view(), name="register"),
    path("login/", UserLogin.as_view(), name="login"),
    path("forgot/", ForgotPasswordView.as_view(), name="forgot-password"),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('reset/', ResetPasswordView.as_view(), name='reset-password')
]
