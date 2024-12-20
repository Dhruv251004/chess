from django.urls import path
from .views import loginUser, registerUser, logoutUser, getUserDetails, changeProfilePic

urlpatterns = [
    path('login/', loginUser, name='login'),
    path('logout/', logoutUser, name='logout'),
    path('register/', registerUser, name='register'),
    path('details/', getUserDetails, name='details'),
    path('changeProfilePic/', changeProfilePic, name='profile_pic'),
]
