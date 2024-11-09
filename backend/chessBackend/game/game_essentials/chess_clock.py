import asyncio
import time


class ChessClock:
    def __init__(self, time_per_player, increment, call_back=None):
        self.white_time = time_per_player  # Time in seconds for white
        self.black_time = time_per_player  # Time in seconds for black
        self.increment = increment         # Increment in seconds
        self.white_turn = True             # True if it's white's turn
        self.running = False               # To control whether the clock is running
        self.call_back = call_back

    async def tick(self):
        """This function is called on every tick (e.g., every 1s)."""
        while self.running:
            await asyncio.sleep(1)  # Tick interval of 1s
            if self.white_turn:
                self.white_time -= 1
                print(f"White time: {round(self.white_time, 1)}")
                if self.white_time <= 0:
                    # print("White time out!")
                    self.call_back('white')
                    self.running = False
            else:
                self.black_time -= 1
                # print(f"Black time: {round(self.black_time, 1)}")
                if self.black_time <= 0:
                    # print("Black time out!")
                    self.call_back('black')
                    self.running = False

    async def switch_turn(self):
        """Switches the player's turn and adds the increment to the previous player's clock."""
        if self.white_turn:
            self.white_time += self.increment
            # print(f"White gains {self.increment} seconds, new time: {
            #       round(self.white_time, 1)}")
        else:
            self.black_time += self.increment
            # print(f"Black gains {self.increment} seconds, new time: {
            #       round(self.black_time, 1)}")
        self.white_turn = not self.white_turn

    async def start(self):
        self.running = True
        await self.tick()

    def stop(self):
        self.running = False

# Example of running a single chess clock:


# async def main():
    # 10 minutes per player, 2-second increment
    # chess_clock = ChessClock(time_per_player=600, increment=2)
    # await chess_clock.start()

# Running the clock with asyncio
# asyncio.run(main())
