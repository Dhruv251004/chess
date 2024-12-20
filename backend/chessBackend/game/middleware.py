from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError
from channels.db import database_sync_to_async


class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        token = self.get_token_from_scope(scope)

        if token:
            try:
                # Validate the token
                validated_token = await database_sync_to_async(JWTAuthentication().get_validated_token)(token)
                user = await database_sync_to_async(JWTAuthentication().get_user)(validated_token)
                scope['user'] = user
            except Exception:
                return
                # raise DenyConnection("Invalid or expired token")
        else:
            return

        return await super().__call__(scope, receive, send)

    def get_token_from_scope(self, scope):
        query_string = scope.get('query_string', b'').decode()
        if not query_string:
            return None

        params = {}
        for param in query_string.split('&'):
            if '=' in param:
                key, value = param.split('=', 1)
                params[key] = value

        token = params.get('token', None)
        return token
