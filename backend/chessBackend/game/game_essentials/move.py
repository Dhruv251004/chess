
class Move():
    def __init__(self, player, prev, curr, promote_to=None):

        self.player = player

        self.prev = prev
        self.curr = curr

        self.is_valid = True

        self.is_castle = False
        self.castle = {}

        self.is_enpassant = False
        self.enpass_square = ''

        self.promotion = False
        self.promote_to = promote_to

        self.is_checkmate = False

        self.is_stalemate = False

        self.is_capture = False

        self.is_threefold = False

        self.is_insufficient_material = False

        self.game_ends = False

        self.time_left_white = 0
        self.time_left_black = 0

    def get_prev_coordinates(self):
        return [int(self.prev[1]), ord(self.prev[0])-ord('a')+1]

    def get_curr_coordinates(self):
        return [int(self.curr[1]), ord(self.curr[0])-ord('a')+1]

    @staticmethod
    def is_invalid_coordinates(x, y):
        return x <= 0 or y <= 0 or x >= 9 or y >= 9

    @staticmethod
    def cords_to_chess_not(x, y):
        """
        Converts 1-based board coordinates (x, y) to standard chess notation.

        Args:
            x (int): The 1-based x-coordinate (rank, row) ranging from 1 to 8.
            y (int): The 1-based y-coordinate (file, column) ranging from 1 to 8.

        Returns:
            str: The chess notation (e.g., 'e4').
        """
        # Map x (1-8) to files ('a' to 'h')
        files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        # Convert x to the corresponding file, and x is already the rank
        rank = str(x)        # x is already 1-based, so no adjustment needed
        file = files[y - 1]  # Adjust y to be 0-based for the list index

        # Return the chess notation (file + rank)
        return file + rank

    def to_json(self):
        if self.is_valid:
            response = {
                'from': self.prev,
                'to': self.curr,
                'white_time': self.time_left_white,
                'black_time': self.time_left_black
            }
            if self.is_castle:
                response['castle'] = self.castle
            elif self.is_enpassant:
                response['en_passant'] = self.enpass_square

            elif self.promotion:
                response['promote_to'] = self.promote_to

            if self.is_checkmate:
                response['checkmate'] = True
                response['winner'] = self.player.username

            elif self.is_stalemate:
                response['stalemate'] = True

            if self.is_capture:
                response['capture'] = True

            if self.is_threefold:
                response['draw'] = True
                response['threefold'] = True

            if self.is_insufficient_material:
                response['draw'] = True
                response['insufficient material'] = True

            if self.game_ends:
                response['ends']=True

            return response
        else:
            return {
                'message': 'INVALID'
            }

    def __str__(self):
        return self.curr
