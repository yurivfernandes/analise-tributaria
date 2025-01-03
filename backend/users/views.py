from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import UserSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = serializer.save()
            login(request, user)
            return Response(
                {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "phone_number": user.phone_number,
                    "postal_code": user.postal_code,
                    "is_staff": user.is_staff,
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email e senha são obrigatórios"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Usando email como username pois configuramos assim no modelo
    user = authenticate(request, username=email, password=password)

    if user is not None and user.is_active:
        login(request, user)
        return Response(
            {"id": user.id, "name": user.name, "email": user.email}
        )
    return Response(
        {"error": "Credenciais inválidas"}, status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(["POST"])
def logout_view(request):
    logout(request)
    return Response({"message": "Logout realizado com sucesso"})


@api_view(["GET"])
@permission_classes([AllowAny])
def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})
