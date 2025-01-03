from django.contrib import admin
from django.urls import path
from users.views import register, login_view, logout_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', register, name='register'),
    path('api/login/', login_view, name='login'),
    path('api/logout/', logout_view, name='logout'),
]
