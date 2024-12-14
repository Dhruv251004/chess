import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chessBackend.settings')
import django
from django.core.asgi import get_asgi_application
# Get the ASGI application
django_asgi_app = get_asgi_application()
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from game.middleware import JWTAuthMiddleware


# Make sure Django is properly set up
django.setup()

# Now import routing after setting up Django
from game import routing


application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": JWTAuthMiddleware(
        URLRouter(routing.websocket_urlpatterns),
    ),
})
