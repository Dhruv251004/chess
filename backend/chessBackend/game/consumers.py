import json
import random
from channels.generic.websocket import AsyncWebsocketConsumer
from .game_essentials.game import Game
from .game_essentials.move import Move
from users.serializers import UserSerializer
from users.models import User
import asyncio


def generateRoomName(user):
    return 'game_host_'+user.username


class GameConsumer(AsyncWebsocketConsumer):
    waiting_room = None
    waiting_user = None
    piece = ['black', 'white']

    games = {}  # Dictionary mapping game room name to game object
    players = {}
    piece_assignment = {}  # Mapping users to their piece color

    def assign_piece(self):
        # White or black
        piece_colors = random.sample(GameConsumer.piece, 2)
        GameConsumer.piece_assignment[GameConsumer.waiting_user.username] = piece_colors[0]
        GameConsumer.piece_assignment[self.user.username] = piece_colors[1]

    async def connect(self):
        self.user = self.scope['user']

        # Step 1:  check if user is already involved in a game or not
        if self.user.username in GameConsumer.players.keys():
            self.game_room_name = GameConsumer.players[self.user.username]
            await self.channel_layer.group_add(
                self.game_room_name, self.channel_name
            )

        else:
            if GameConsumer.waiting_room is not None:
                # A user is waiting for a match

                # Assign random pieces to both players
                self.assign_piece()

                # Create a game object
                self.game_room_name = GameConsumer.waiting_room
                if GameConsumer.piece_assignment[GameConsumer.waiting_user.username] == 'white':
                    GameConsumer.games[self.game_room_name] = Game(
                        self.waiting_user, self.user)
                else:
                    GameConsumer.games[self.game_room_name] = Game(
                        self.user, self.waiting_user)

                await self.channel_layer.group_add(
                    self.game_room_name, self.channel_name
                )

                # Start game

                # Start clock
                asyncio.create_task(
                    GameConsumer.games[self.game_room_name].start_clock())

                await self.channel_layer.group_send(
                    self.game_room_name, {
                        'type': 'game.room',
                        'event': {'message': 'START',
                                  GameConsumer.piece_assignment[self.user.username]: UserSerializer(self.user).data,
                                  GameConsumer.piece_assignment[GameConsumer.waiting_user.username]: UserSerializer(GameConsumer.waiting_user).data,
                                  }
                    }
                )

                GameConsumer.waiting_user = None
                GameConsumer.waiting_room = None
            else:
                # new user started game
                GameConsumer.waiting_user = self.user

                # Generate game room so that opponent can join
                GameConsumer.waiting_room = generateRoomName(self.user)
                self.game_room_name = GameConsumer.waiting_room

                await self.channel_layer.group_add(
                    self.game_room_name, self.channel_name
                )

        await self.accept()

    async def disconnect(self, close_code):
        if GameConsumer.waiting_user == self.user:
            GameConsumer.waiting_user = None
            GameConsumer.waiting_room = None

        if self.user.username in GameConsumer.players:
            del GameConsumer.players[self.user.username]
            del GameConsumer.piece_assignment[self.user.username]

        await self.channel_layer.group_discard(self.game_room_name, self.channel_name)

        if self.game_room_name in GameConsumer.games:
            del GameConsumer.games[self.game_room_name]

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if "chat" in text_data_json:
            chat = text_data_json["chat"]
            await self.channel_layer.group_send(
                self.game_room_name, {
                    'type': 'room.chat',
                    'chat': chat
                }
            )
            return
        game_event = text_data_json["event"]
        prev_position = game_event["from"]
        curr_position = game_event["to"]
        is_resign = game_event["resign"] if "resign" in game_event else False

        promote_to = None if 'promote_to' not in game_event else game_event['promote_to']
        print(game_event)
        game = GameConsumer.games[self.game_room_name]

        move = Move(self.user, prev_position,
                    curr_position, promote_to, is_resign)

        # Make the move
        await game.make_move(move)

        response = move.to_json()

        if 'message' in response and response["message"] == 'INVALID':
            # send message to particular individual
            await self.channel_layer.send(
                self.channel_name, {"type": "game.room", "event": response}
            )
        else:
            # Send message to room group
            await self.channel_layer.group_send(
                self.game_room_name, {"type": "game.room", "event": response}
            )

    async def game_room(self, event):
        game_event = event["event"]
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"event": game_event}))
        if 'ends' in game_event and game_event['ends']:
            await self.close()

    async def room_chat(self, event):
        chat = event['chat']
        # Send message to WebSocket
        # message-> id username text time
        await self.send(text_data=json.dumps({"chat": chat}))
