from django.shortcuts import render
from users.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from chessBackend.utils.api_reponse import APIResponse
from .utils.get_token import get_tokens_for_user
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from .utils.cloudinary import upload_image_to_cloudinary
# Create your views here.


@api_view(['POST'])
@permission_classes([AllowAny])  # Allow any user to log in
def loginUser(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            # Serialize user data
            data = UserSerializer(user).data

            # Add tokens to the response
            data['refresh'] = str(refresh)
            data['access'] = str(access)

            # Return success response with user data and tokens
            return APIResponse.success(message='Login successful', data=data)

        # If authentication fails, return error response
        return APIResponse.error(errors='Invalid username or password', status=401)
    except Exception:
        return APIResponse.error(errors="Some error occured")


@api_view(['POST'])
@permission_classes([AllowAny])
def registerUser(request):

    try:
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )
        print(type(user))
        data = UserSerializer(user).data
        tokens = get_tokens_for_user(user)
        data['refresh'] = tokens['refresh']
        data['access'] = tokens['access']

        return APIResponse.success(message='Registered Successfully', data=data)
    except IntegrityError:
        return APIResponse.error(errors="User with this username or email already exists")
    except Exception as e:
        print(e)
        return APIResponse.error(errors="Some error occured")


@api_view(['POST'])
def logoutUser(request):
    try:
        # Get the refresh token from the request data
        refresh_token = request.data.get('refresh')

        if refresh_token is None:
            return APIResponse.error(message='Refresh token is required', status=400)

        # Blacklist the refresh token
        token = RefreshToken(refresh_token)
        token.blacklist()

        return APIResponse.success(message='Logout successful')

    except Exception as e:
        return APIResponse.error(errors='Failed to logout', status=400)


@api_view(['GET'])
def getUserDetails(request):
    try:
        user = request.user  # Fetch the authenticated user
        serializer = UserSerializer(user)  # Serialize the user data
        return APIResponse.success(message="User details fetched successfully", data=serializer.data)
    except:
        return APIResponse.error(errors='Some error occurred')


@api_view(['POST'])
def changeProfilePic(request):
    try:
        print('hi')
        user = request.user
        user.profile_pic = upload_image_to_cloudinary(
            request.FILES['file'], user.username)
        print(user.profile_pic)
        user.save()
        return APIResponse.success(message='Changed profile picture successfully',data=user.profile_pic)
    except:
        return APIResponse.error(errors='Some error occurred. Try again later')
