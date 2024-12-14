import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from game import routing
from game.middleware import JWTAuthMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chessBackend.settings')

# Make sure Django is properly set up
django.setup()

# Get the ASGI application
django_asgi_app = get_asgi_application()

# Get the port dynamically from the environment variable
port = os.environ.get("PORT", 8000)  # Default to 8000 for local development

# Configure the application to bind to the correct interface and port
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": JWTAuthMiddleware(
        URLRouter(routing.websocket_urlpatterns),
    ),
})

# Run the server using daphne or the appropriate ASGI server
if __name__ == "__main__":
    import daphne.server
    daphne.server.Daphne().run("0.0.0.0", port)
