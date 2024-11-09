from django.urls import path
from .views import loginUser,registerUser,logoutUser,getUserDetails

urlpatterns=[
    path('login/',loginUser,name='login'),
    path('logout/',logoutUser,name='logout'),
    path('register/',registerUser,name='register'),
    path('details/',getUserDetails,name='details'),
]