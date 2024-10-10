import json
import random
from channels.generic.websocket import AsyncWebsocketConsumer
from .game import Game, Move


def generateRoomName(username):
    return 'game_host_'+username


class GameConsumer(AsyncWebsocketConsumer):
    waiting_room = None
    waiting_user = None
    piece = ['black', 'white']

    games = {}  # Dictionary mapping game room name with game object
    players = {}
    piece_assignment = {}  # Mapping users to their piece color

    async def connect(self):
        self.user = self.scope['url_route']['kwargs']['username']

        # Step 1:  check if user is already involved in a game or not
        if self.user in GameConsumer.players.keys():
            self.game_room_name = GameConsumer.players[self.user]
            await self.channel_layer.group_add(
                self.game_room_name, self.channel_name
            )

        else:
            if GameConsumer.waiting_room is not None:
                # A user is waiting for a match
                # Assign random pieces to both players

                piece_colors = random.sample(GameConsumer.piece, 2)
                GameConsumer.piece_assignment[GameConsumer.waiting_user] = piece_colors[0]
                GameConsumer.piece_assignment[self.user] = piece_colors[1]
                # Create a game object
                if GameConsumer.piece_assignment[GameConsumer.waiting_user] == 'white':
                    GameConsumer.games[GameConsumer.waiting_room] = Game(
                        self.waiting_user, self.user)
                else:
                    GameConsumer.games[GameConsumer.waiting_room] = Game(
                        self.user, self.waiting_user)

                self.game_room_name = GameConsumer.waiting_room
                await self.channel_layer.group_add(
                    GameConsumer.waiting_room, self.channel_name
                )

                # Start game
                await self.channel_layer.group_send(
                    self.game_room_name, {
                        'type': 'game.room', 'event': {'message': 'START', self.user: GameConsumer.piece_assignment[self.user], GameConsumer.waiting_user: GameConsumer.piece_assignment[GameConsumer.waiting_user]
                                                       }}
                )

                GameConsumer.waiting_user = None
                GameConsumer.waiting_room = None
            else:
                # new user started game
                GameConsumer.waiting_user = self.user
                GameConsumer.waiting_room = generateRoomName(self.user)
                self.game_room_name = GameConsumer.waiting_room

                await self.channel_layer.group_add(
                    GameConsumer.waiting_room, self.channel_name
                )

        await self.accept()

    async def disconnect(self, close_code):
        if GameConsumer.waiting_user == self.user:
            GameConsumer.waiting_user = None
        GameConsumer.waiting_room = None

        if self.user in GameConsumer.players:
            del GameConsumer.players[self.user]
            del GameConsumer.piece_assignment[self.user]

        await self.channel_layer.group_discard(self.game_room_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        game_event = text_data_json["event"]

        prev_position = game_event["from"]
        curr_position = game_event["to"]

        game = GameConsumer.games[self.game_room_name]

        move = Move(self.user, prev_position, curr_position)

        # Make the move
        game.make_move(move)

        response = move.to_json()

        if 'message' in response and response["message"] == 'INVALID':
            # send message to particula individual
            await self.channel_layer.send(
                self.channel_name, {"type": "game.room", "event": response}
            )
        else:
            # Send message to room group
            await self.channel_layer.group_send(
                self.game_room_name, {"type": "game.room", "event": response}
            )
        game.print_board()

    async def game_room(self, event):
        game_event = event["event"]
        print(game_event)
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"event": game_event}))
