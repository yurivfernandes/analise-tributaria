from django.urls import path

from . import views

urlpatterns = [
    path("csrf/", views.csrf_token, name="csrf"),
    path("register/", views.register, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
]
