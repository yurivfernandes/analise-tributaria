from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password', 'phone_number', 'postal_code', 'is_staff')
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', ''),
            postal_code=validated_data.get('postal_code', ''),
            is_staff=validated_data.get('is_staff', False)
        )
        return user
