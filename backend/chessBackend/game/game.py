import time
import copy


class Move():
    def __init__(self, user, prev, curr):
        self.user = user
        self.prev = prev
        self.curr = curr

    def get_prev_coordinates(self):
        return [int(self.prev[1]), ord(self.prev[0])-ord('a')+1]

    def get_curr_coordinates(self):
        return [int(self.curr[1]), ord(self.curr[0])-ord('a')+1]

    @staticmethod
    def is_invalid_coordinates(x, y):
        return x <= 0 or y <= 0 or x >= 9 or y >= 9

    @staticmethod
    def cords_to_chess_not(x, y):
        # takes board coordinated and converts it to chess notation
        pass

    def __str__(self):
        return self.curr


class Game():
    def __init__(self, user1, user2):
        self.white = user1
        self.black = user2
        self.moves = []
        self.board = [['' for i in range(9)]
                      for j in range(9)]  # 8 X 8 chess board ( 1 based index )
        self.initialize_board()

    def initialize_board(self):
        for i in range(1, 9):
            self.board[2][i] = 'WP'  # White Pawn
            self.board[7][i] = 'BP'  # Black Pawn

        self.board[1][1] = self.board[1][8] = 'WR'  # White rook
        self.board[8][1] = self.board[8][8] = 'BR'  # Black rook

        self.board[1][2] = self.board[1][7] = 'WN'  # White Knight
        self.board[8][2] = self.board[8][7] = 'BN'  # Black Knight

        self.board[1][3] = self.board[1][6] = 'WB'  # White Bishop
        self.board[8][3] = self.board[8][6] = 'BB'  # Black Bishop

        self.board[1][4] = 'WQ'  # White Queen
        self.board[8][4] = 'BQ'  # Black Queen

        self.board[1][5] = 'WK'  # White King
        self.board[8][5] = 'BK'  # White King

    def make_move(self, move):
        if self.is_valid_move(move):
            self.moves.append(move)
            return True
        else:
            print('INVALID MOVE')
            return False

    def is_valid_move(self, move):
        try:
            [x_prev, y_prev] = move.get_prev_coordinates()
            [x_curr, y_curr] = move.get_curr_coordinates()

            if len(self.moves) == 0 and move.user == self.black:  # Black makes first move?
                return False

            # Same player plays twice?
            if len(self.moves) != 0 and move.user == self.moves[-1].user:
                return False

            # Check if coordinates are valid or not
            if Move.is_invalid_coordinates(x_prev, y_prev) or Move.is_invalid_coordinates(x_curr, y_curr):
                return False

            # check if give pos empty or target position has a piece of same color
            if self.board[x_prev][y_prev] == '' or (self.board[x_curr][y_curr] != '' and self.board[x_curr][y_curr][0] == self.board[x_prev][y_prev][0]):
                return False

            # Check if user can move piece of that color
            piece_color = 'white' if self.board[x_prev][y_prev][0] == 'W' else 'black'

            if piece_color == 'white' and self.white != move.user:
                return False
            elif piece_color == 'black' and self.black != move.user:
                return False

            # Store piece
            piece = self.board[x_prev][y_prev][1]
            is_valid = True
            if piece == 'P':
                # It is a Pawn
                is_valid = self.is_valid_pawn_move(
                    x_prev, y_prev, x_curr, y_curr, piece_color)

            elif piece == 'K':
                # It is a King
                is_valid = self.is_valid_king_move(
                    x_prev, y_prev, x_curr, y_curr, piece_color)

            elif piece == 'Q':
                # It is a Queen
                is_valid = self.is_valid_queen_move(
                    x_prev, y_prev, x_curr, y_curr, piece_color)

            elif piece == 'B':
                # It is a Bishop
                is_valid = self.is_valid_bishop_move(
                    x_prev, y_prev, x_curr, y_curr, piece_color)

            elif piece == 'R':
                # It is a Rook
                is_valid = self.is_valid_rook_move(
                    x_prev, y_prev, x_curr, y_curr, piece_color)

            elif piece == 'N':
                # It is a Knight
                is_valid = self.is_valid_knight_move(
                    x_prev, y_prev, x_curr, y_curr, piece_color)

            else:
                return False

            # Now check if king is on check after the following move or not
            if not is_valid or self.is_king_on_check(x_prev, y_prev, x_curr, y_curr, piece_color):
                return False

            # It is a valid move
            self.board[x_curr][y_curr] = self.board[x_prev][y_prev]
            self.board[x_prev][y_prev] = ''
            return True
        except Exception as e:
            print(e)
            return False

    def is_valid_pawn_move(self, x_prev, y_prev, x_curr, y_curr, piece_color):
        is_valid = True

        if piece_color == 'white':

            # Pawn Moved backwards or ahead by more than 2 sq. or moved horizontally by more than 1 square
            if x_curr-x_prev <= 0 or x_curr-x_prev > 2 or abs(y_prev-y_curr) > 1:
                is_valid = False

            elif x_curr-x_prev == 2 and x_prev != 2:  # Moved two squares while pawn not at 2nd rank
                is_valid = False

            elif x_curr-x_prev == 1:  # Pawn moved ahead by 1 square
                # is it a capture?

                if y_prev == y_curr:  # Not a capture
                    if self.board[x_curr][y_curr] != '':
                        is_valid = False

                else:  # Yes it is a capture
                    if self.board[x_curr][y_curr] == '' or self.board[x_curr][y_curr] == 'BK':  # no piece
                        is_valid = False
                    elif self.board[x_curr][y_curr][0] == 'W':  # White captured white
                        is_valid = False
            elif x_curr-x_prev == 2:  # Pawn moved by 2 places
                if y_curr != y_prev:  # Moved horizontal by 2 and vertical also
                    is_valid = False
                # There was a pice in between
                elif self.board[x_curr][y_curr] != '' or self.board[x_curr-1][y_curr] != '':
                    is_valid = False
        else:

            # Pawn Moved backwards or ahead by more than 2 sq. or moved horizontally by more than 1 square
            if x_prev-x_curr <= 0 or x_prev-x_curr > 2 or abs(y_prev-y_curr) > 1:
                is_valid = False

            elif x_prev-x_curr == 2 and x_prev != 7:  # Moved two squares while pawn not at 7th rank
                is_valid = False

            elif x_prev-x_curr == 1:  # Pawn moved ahead by 1 square
                # is it a capture?

                if y_prev == y_curr:  # Not a capture
                    if self.board[x_curr][y_curr] != '':
                        is_valid = False

                else:  # Yes it is a capture
                    # no piece or captured a king
                    if self.board[x_curr][y_curr] == '' or self.board[x_curr][y_curr] == 'WK':
                        is_valid = False
                    elif self.board[x_curr][y_curr][0] == 'B':  # Black captured Black
                        is_valid = False
            elif x_prev-x_curr == 2:  # Pawn moved by 2 places
                if y_curr != y_prev:  # Moved horizontal by 2 and vertical also
                    is_valid = False
                # There was a pice in between
                elif self.board[x_curr][y_curr] != '' or self.board[x_curr+1][y_curr] != '':
                    is_valid = False

        return is_valid

    def is_valid_king_move(self, x_prev, y_prev, x_curr, y_curr, piece_color):

        # Check if king moved more than one square or did not moved at all
        if abs(x_prev-x_curr) > 1 or abs(y_prev-y_curr) > 1 or (x_prev == x_curr and y_curr == y_prev):
            return False

        is_valid = True
        if piece_color == 'white':
            if self.board[x_curr][y_curr] != '' and self.board[x_curr][y_curr][0] == 'W':
                is_valid = False
        else:
            if self.board[x_curr][y_curr] != '' and self.board[x_curr][y_curr][0] == 'B':
                is_valid = False
        return is_valid

    def is_valid_queen_move(self, x_prev, y_prev, x_curr, y_curr, piece_color):
        # A queen moves like a rook or like a bishop
        return self.is_valid_bishop_move(x_prev, y_prev, x_curr, y_curr, piece_color) or self.is_valid_rook_move(x_prev, y_prev, x_curr, y_curr, piece_color)

    def is_valid_rook_move(self, x_prev, y_prev, x_curr, y_curr, piece_color):

        if (abs(x_curr-x_prev) != 0 and abs(y_curr-y_prev) != 0) or (x_curr == x_prev and y_curr == y_prev):  # Moved both horizontal
            return False

        is_valid = True

        increment = -1 if x_prev > x_curr or y_prev > y_prev else 1

        captures = 0

        if piece_color == 'white':
            if x_prev != x_curr:  # Rook moved vertically
                for i in range(x_prev+increment, x_curr+1, increment):
                    if captures:
                        is_valid = False
                        break
                    if self.board[i][y_curr] != '':
                        if self.board[i][y_curr][0] == 'W':
                            is_valid = False
                            break
                        elif self.board[i][y_curr][0] == 'B':
                            captures += 1
            else:  # Rook moved horizontally
                for i in range(y_prev+increment, y_curr+1, increment):
                    if captures:
                        is_valid = False
                        break
                    if self.board[x_curr][i] != '':
                        if self.board[x_curr][i][0] == 'W':
                            is_valid = False
                            break
                        elif self.board[x_curr][i][0] == 'B':
                            captures += 1
        else:
            if x_prev != x_curr:  # Rook moved vertically
                for i in range(x_prev+increment, x_curr+1, increment):
                    if captures:
                        is_valid = False
                        break
                    if self.board[i][y_curr] != '':
                        if self.board[i][y_curr][0] == 'B':
                            is_valid = False
                            break
                        elif self.board[i][y_curr][0] == 'W':
                            captures += 1
            else:  # Rook moved horizontally
                for i in range(y_prev+increment, y_curr+1, increment):
                    if captures:
                        is_valid = False
                        break
                    if self.board[x_curr][i] != '':
                        if self.board[x_curr][i][0] == 'B':
                            is_valid = False
                            break
                        elif self.board[x_curr][i][0] == 'W':
                            captures += 1

        return is_valid

    def is_valid_bishop_move(self, x_prev, y_prev, x_curr, y_curr, piece_color):

        if x_curr == x_prev or y_curr == y_prev:  # Did not moved
            return False

        slope = abs(x_curr-x_prev)/abs(y_curr-y_prev)

        if slope != 1 and slope != -1:  # Slope can be wither 1 or -1
            return False

        is_valid = True
        x_increment = 1 if x_curr > x_prev else -1
        y_increment = 1 if y_curr > y_prev else -1
        captures = 0

        if piece_color == 'white':
            for i in range(1, abs(x_curr-x_prev)+1):
                new_x = x_prev+x_increment*i
                new_y = y_prev+y_increment*i

                if captures:
                    is_valid = False

                if self.board[new_x][new_y] != '':
                    if self.board[new_x][new_y][0] == 'W':
                        is_valid = False
                        break
                    elif self.board[new_x][new_y][0] == 'B':
                        captures += 1

        else:
            for i in range(1, abs(x_curr-x_prev)+1):
                new_x = x_prev+x_increment*i
                new_y = y_prev+y_increment*i

                if captures:
                    is_valid = False
                    break

                if self.board[new_x][new_y] != '':
                    if self.board[new_x][new_y][0] == 'B':
                        is_valid = False
                        break
                    elif self.board[new_x][new_y][0] == 'W':
                        captures += 1

        return is_valid

    def is_valid_knight_move(self, x_prev, y_prev, x_curr, y_curr, piece_color):

        if x_curr == x_prev or y_curr == y_prev:
            return False

        del_x = [-2, -2, -1, -1, 1, 1, 2, 2]
        del_y = [-1, 1, -2, 2, -2, 2, -1, 1]

        is_valid = False
        for i in range(8):  # All valid position a knight at x_prev and y_prev can move
            new_x = x_prev+del_x[i]
            new_y = y_prev+del_y[i]
            if x_curr == new_x and y_curr == new_y:
                is_valid = True
                break

        if not is_valid:
            return False

        if piece_color == 'white':
            if self.board[x_curr][y_curr] != '' and self.board[x_curr][y_curr][0] == 'W':
                is_valid = False
        else:
            if self.board[x_curr][y_curr] != '' and self.board[x_curr][y_curr][0] == 'B':
                is_valid = False
        return is_valid

    def is_king_on_check(self, x_prev, y_prev, x_curr, y_curr, piece_color):
        board_copy = copy.deepcopy(self.board)
        board_copy[x_curr][y_curr] = board_copy[x_prev][y_prev]
        board_copy[x_prev][y_prev] = ''

        king = 'WK' if piece_color == 'white' else 'BK'
        user_piece = 'W' if piece_color == 'white' else 'B'
        opponent_piece_color = 'B' if piece_color == 'white' else 'W'

        [x, y] = self.get_king_position(board_copy, king)
        on_check = False
        # Check on diagonals

        # upper left
        on_check = (on_check or self.check_on_diagonal(
            board_copy, x, y, 1, -1, opponent_piece_color))
        #  lower left
        on_check = (on_check or self.check_on_diagonal(
            board_copy, x, y, -1, -1, opponent_piece_color))
        #  lower right
        on_check = (on_check or self.check_on_diagonal(
            board_copy, x, y, -1, 1, opponent_piece_color))
        #  upper right
        on_check = (on_check or self.check_on_diagonal(
            board_copy, x, y, 1, 1, opponent_piece_color))
        # Check on file
        # Below
        on_check = (on_check or self.check_on_file(
            board_copy, x, y, x-1, 0, -1, opponent_piece_color))
        # Above
        on_check = (on_check or self.check_on_file(
            board_copy, x, y, x+1, 9, 1, opponent_piece_color))
        # Check on rank
        # right
        on_check = (on_check or self.check_on_rank(
            board_copy, x, y, y+1, 9, 1, opponent_piece_color))
        # Left
        on_check = (on_check or self.check_on_rank(
            board_copy, x, y, y-1, 0, -1, opponent_piece_color))

        # Check for knight
        on_check = (on_check or self.check_for_knight_attack(
            board_copy, x, y, opponent_piece_color))

        # Now check if opponent king is on adjacent square to our king
        [opponent_king_x, opponent_king_y] = self.get_king_position(
            board_copy, opponent_piece_color+'K')

        if abs(x-opponent_king_x) == 1 and abs(y-opponent_king_y) == 1:
            on_check = True

        # Time to check for pawn attack
        if piece_color == 'white':
            if not Move.is_invalid_coordinates(x+1, y-1) and board_copy[x+1][y-1] == opponent_piece_color+'P':
                on_check = True
            elif not Move.is_invalid_coordinates(x+1, y+1) and board_copy[x+1][y+1] == opponent_piece_color+'P':
                on_check = True
        else:
            if not Move.is_invalid_coordinates(x-1, y-1) and board_copy[x-1][y-1] == opponent_piece_color+'P':
                on_check = True
            elif not Move.is_invalid_coordinates(x-1, y+1) and board_copy[x-1][y+1] == opponent_piece_color+'P':
                on_check = True
        return on_check

    def check_on_diagonal(self, board, x, y, del_x, del_y, opponent):
        nx = x+del_x
        ny = y+del_y

        on_check = False

        while not Move.is_invalid_coordinates(nx, ny):
            if board[nx][ny] != '':
                if board[nx][ny][0] != opponent:
                    break
                else:
                    if board[nx][ny][1] == 'B' or board[nx][ny][1] == 'Q':
                        on_check = True
                        break
            nx += del_x
            ny += del_y
        return on_check

    def check_for_knight_attack(self, board, x, y, opponent):
        """
        Return true if square at x,y is under attack by opponent Knight
        """
        on_check = False
        del_x = [-2, -2, -1, -1, 1, 1, 2, 2]
        del_y = [-1, 1, -2, 2, -2, 2, -1, 1]
        for i in range(8):
            nx = x+del_x[i]
            ny = y+del_y[i]
            if not Move.is_invalid_coordinates(nx, ny) and board[nx][ny] != '' and board[nx][ny][0] == opponent and board[nx][ny][1] == 'N':
                on_check = True
                break
        return on_check

    def check_on_file(self, board, x, y, start, end, increment, opponent):
        """
        Returns true if file y has either a rook or a queen
        """
        result = False
        for i in range(start, end, increment):
            if board[i][y] != '':
                if board[i][y][0] != opponent:
                    break
                else:
                    if board[i][y][1] == 'R' or board[i][y][1] == 'Q':
                        result = True
                    break
        return result

    def check_on_rank(self, board, x, y, start, end, increment, opponent):
        """

        Returns true if rank x has either a rook or a queen
        """
        result = False
        for i in range(start, end, increment):
            if board[x][i] != '':
                if board[x][i][0] != opponent:
                    break
                else:
                    if board[x][i][1] == 'R' or board[x][i][1] == 'Q':
                        result = True
                    break
        return result

    def get_king_position(self, board, king):
        x = 0
        y = 0
        for i in range(1, 9):
            found = False
            for j in range(1, 9):
                if board[i][j] == king:
                    x = i
                    y = j
                    found = True
                    break
            if found:
                break
        return [x, y]

    def print_board(self):
        for i in range(8, 0, -1):
            for j in range(1, 9):
                if self.board[i][j] == '':
                    print('  ', end='  ')
                else:
                    print(self.board[i][j], end='  ')
            print()


# game = Game('U1', 'U2')


# moves = [Move('U1', 'e2', 'e4'), Move(
#     'U2', 'e7', 'e5'), Move('U1', 'g1', 'f3'), Move('U2', 'b8', 'c6'), Move('U1', 'f1', 'c4'), Move('U2', 'f8', 'c5'), Move('U1', 'b1', 'c3'), Move('U2', 'g8', 'f6'), Move('U1', 'd2', 'd3'), Move('U2', 'd7', 'd5'), Move('U1', 'e4', 'd5'), Move('U2', 'd8', 'd5'), Move('U1', 'c4', 'd5'), Move('U2', 'f6', 'd5'), Move('U1', 'f3', 'e5'), Move('U2', 'e8', 'e7'), Move('U1', 'e5', 'c6'), Move('U2', 'e7', 'd7'), Move('U1', 'a2', 'a4'), Move('U2', 'h8', 'e8'), Move('U1', 'd1', 'e2'), Move('U2', 'e8', 'e2'), Move('U1', 'e1', 'e2'), Move('U2', 'b7', 'c6'), Move('U1', 'b2', 'b4'), Move('U2', 'd7', 'd6'), Move('U1', 'b4', 'c5'), Move('U2', 'd6', 'c5'), Move('U1', 'c1', 'a3'), Move('U2', 'c5', 'd4'), Move('U1', 'e2', 'e1'), Move('U2', 'd4', 'c3'), Move('U1', 'a1', 'b1'), Move('U2', 'c3', 'c2')]
# for move in moves:
#     game.make_move(move)

# for i in range(8, 0, -1):
#     for j in range(1, 9):
#         if game.board[i][j] == '':
#             print('  ', end='  ')
#         else:
#             print(game.board[i][j], end='  ')
#     print()


# print(game.board)