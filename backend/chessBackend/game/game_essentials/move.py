
class Move():
    def __init__(self, player, prev, curr, promote_to=None, is_resign=False):

        # Player
        self.player = player

        # Coordinates of move
        self.prev = prev
        self.curr = curr

        # Valid or not
        self.is_valid = True

        # Castle
        self.is_castle = False
        self.castle = {}

        # En passant
        self.is_enpassant = False
        self.enpass_square = ''

        # Pawn promotion
        self.promotion = False
        self.promote_to = promote_to

        # Ending game
        self.is_checkmate = False
        self.is_stalemate = False
        self.is_capture = False
        self.is_threefold = False
        self.is_insufficient_material = False
        self.game_ends = False

        # Which piece moved
        self.is_pawn_move = False
        self.is_king_move = False
        self.is_queen_move = False
        self.is_rook_move = False
        self.is_bishop_move = False
        self.is_knight_move = False

        # Timings
        self.time_left_white = 0
        self.time_left_black = 0

        # Notation
        self.algebraic_notation = ""

        self.resign = is_resign
        self.winner = None

    def get_prev_coordinates(self):
        return [int(self.prev[1]), ord(self.prev[0])-ord('a')+1]

    def get_curr_coordinates(self):
        return [int(self.curr[1]), ord(self.curr[0])-ord('a')+1]

    @staticmethod
    def is_invalid_coordinates(x, y):
        return x <= 0 or y <= 0 or x >= 9 or y >= 9

    @staticmethod
    def move_to_algebraic_notation(move, board):
        """
        Converts a Move object into algebraic chess notation.

        Args:
            move (Move): The move object containing move details.
            board (list): 2D list representing the chessboard.

        Returns:
            str: The move in algebraic chess notation.
        """
        # Determine the piece that moved
        piece = ""
        if move.is_pawn_move:
            piece = ""  # Pawns don't use a letter
        elif move.is_knight_move:
            piece = "N"
        elif move.is_bishop_move:
            piece = "B"
        elif move.is_rook_move:
            piece = "R"
        elif move.is_queen_move:
            piece = "Q"
        elif move.is_king_move:
            piece = "K"

        # Handle special moves
        if move.is_castle:
            if move.castle.get('side') == 'kingside':
                return "O-O"
            elif move.castle.get('side') == 'queenside':
                return "O-O-O"

        # Capture handling
        capture = "x" if move.is_capture else ""

        # Target square
        target_square = Move.cords_to_chess_not(
            int(move.curr[1]), ord(move.curr[0]) - ord('a') + 1
        )

        # For pawn captures, include the source file
        if move.is_pawn_move and move.is_capture:
            source_file = move.prev[0]  # File of the pawn before moving
            move_notation = f"{source_file}{capture}{target_square}"
        else:
            move_notation = f"{piece}{capture}{target_square}"

        # Promotion
        if move.promotion:
            move_notation += f"={move.promote_to.upper()}"

        # Check or checkmate
        if move.is_checkmate:
            move_notation += "#"
        elif move.is_stalemate:
            move_notation += " (stalemate)"
        elif board[move.get_curr_coordinates()[0] - 1][move.get_curr_coordinates()[1] - 1] == "K":
            move_notation += "+"

        return move_notation

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
                response['ends'] = True

            if self.resign:
                response['resign'] = True
                response['winner'] = self.winner
            else:
                response['notation'] = self.algebraic_notation

            return response
        else:
            return {
                'message': 'INVALID'
            }

    def __str__(self):
        return self.curr
