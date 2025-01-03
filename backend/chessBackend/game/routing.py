# game/routing.py
from django.urls import re_path
from game.consumers import GameConsumer

websocket_urlpatterns = [
    re_path(r"^ws/chess/", GameConsumer.as_asgi()),
]
