from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = 'django.contrib.auth.models.User'  # Reference by string
        fields = ['first_name', 'last_name', 'email', 'username']
