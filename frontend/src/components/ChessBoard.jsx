import React, { useEffect, useRef, useState } from 'react';
import ChessSquare from './ChessSquare';
import initialBoard from '../utils/chessBoard';
import { useSelector } from 'react-redux';
import { useWithSound } from '../utils/useWithSound';
import selfMoveSound from '../assets/sounds/move-self.mp3';
import captureSound from '../assets/sounds/capture.mp3';
import opponentMoveSound from '../assets/sounds/move-opponent.mp3';
import checkSound from '../assets/sounds/move-check.mp3';
import promoteSound from '../assets/sounds/promote.mp3';
import illegalMoveSound from '../assets/sounds/illegal.mp3';
import castleSound from '../assets/sounds/castle.mp3';
import gameStartSound from '../assets/sounds/game-start.mp3';
import gameEndSound from '../assets/sounds/game-start.mp3';
import WaitingScreen from '../pages/play/WaitingScreen';
import GameResult from './GameResult';

const ChessBoard = ({ waiting, setWaiting, setOpponentInfo }) => {
	const accessToken = useSelector((state) => state.user.accessToken);
	const username = useSelector((state) => state.user.username);
	const [chessBoard, setChessBoard] = useState(initialBoard);
	const [from, setFrom] = useState('');
	const [socket, setSocket] = useState('');
	const [gameEnded, setGameEnded] = useState(false);

	// Sounds
	const playSelfMoveSound = useWithSound(selfMoveSound).playSound;
	const playOpponentMoveSound = useWithSound(opponentMoveSound).playSound;
	const playCaptureSound = useWithSound(captureSound).playSound;
	const playCastleSound = useWithSound(castleSound).playSound;
	const playGameEndSound = useWithSound(gameEndSound).playSound;
	const playGameStartSound = useWithSound(gameStartSound).playSound;
	const playIllegalMoveSound = useWithSound(illegalMoveSound).playSound;
	const playCheckSound = useWithSound(checkSound).playSound;
	const playPromoteSound = useWithSound(promoteSound).playSound;

	const [closeSocket, setCloseSocket] = useState(null);

	const [pieceColor, setPieceColor] = useState(null);

	// const socketRef = useRef(null);

	useEffect(() => {
		if (username && accessToken) {
			const baseUrl = import.meta.env.VITE_WEBSOCKET_URL;
			console.log('Access token is ', baseUrl);
			const newSocket = new WebSocket(`${baseUrl}/chess/?token=${accessToken}`);
			setSocket(newSocket);
			const closeSocketHandler = (newSocket.onopen = (e) => {
				newSocket.onmessage = (e) => {
					const data = JSON.parse(e.data);
					console.log(data);
					if (data.event.message == 'INVALID') {
						playIllegalMoveSound();
						return;
					}
					if (data.event.message === 'START') {
						setWaiting(false);

						if (data.event.white.username === username) {
							setPieceColor('white');
							setOpponentInfo(data.event.black);
						} else {
							setPieceColor('black');
							setOpponentInfo(data.event.white);
						}

						playGameStartSound();
					}
					if (data.event.message != 'START') {
						//Do something
						let prev = data.event.from;
						let curr = data.event.to;
						setChessBoard((prevBoard) => {
							const board = JSON.parse(JSON.stringify(prevBoard));
							board[curr].piece = board[prev].piece;
							board[curr].pieceColor = board[prev].pieceColor;

							// Clear the previous square
							board[prev].piece = '';
							board[prev].pieceColor = '';

							return board; // Return the updated board
						});

						if (data.event.castle) {
							let prev = data.event.castle.from;
							let curr = data.event.castle.to;
							setChessBoard((prevBoard) => {
								const board = JSON.parse(JSON.stringify(prevBoard));
								board[curr].piece = board[prev].piece;
								board[curr].pieceColor = board[prev].pieceColor;

								// Clear the previous square
								board[prev].piece = '';
								board[prev].pieceColor = '';

								return board; // Return the updated board
							});
						}

						if (data.event.en_passant) {
							let position = data.event.en_passant;
							setChessBoard((prevBoard) => {
								const board = JSON.parse(JSON.stringify(prevBoard));
								// Clear the square
								board[position].piece = '';
								board[position].pieceColor = '';
								return board; // Return the updated board
							});
						}

						if (data.event.ends) playGameEndSound();
						else if (data.event.promote_to) playPromoteSound();
						else if (data.event.capture) playCaptureSound();
						else if (data.event.castle) playCastleSound();
						else playSelfMoveSound();

						if (data.event.ends) {
							// game ends
							// a pop up required
							setGameEnded(true);
						}
					}
				};

				// Cleanup WebSocket connection when component unmounts
				return () => {
					console.log('closing');
					setSocket(null);
					newSocket.close(1000, 'Client closed connection');
				};
			});

			setCloseSocket(closeSocketHandler);
		}
	}, [username, accessToken]);

	const [file, setFile] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
	const [rank, setRank] = useState([8, 7, 6, 5, 4, 3, 2, 1]);

	useEffect(() => {
		if (pieceColor === 'black') {
			const reversedFile = file.reduce((acc, curr) => [curr, ...acc], []);
			const reversedRank = rank.reduce((acc, curr) => [curr, ...acc], []);
			setFile(reversedFile);
			setRank(reversedRank);
		}
	}, [pieceColor]);

	const selectSquare = (square) => {
		if (from == '') {
			setFrom(square);
		} else {
			const message = {
				event: {
					from,
					to: square,
				},
			};
			setFrom('');
			console.log('sending ', message);
			socket.send(JSON.stringify(message));
		}
	};

	if (waiting)
		return (
			<WaitingScreen
				closeSocket={closeSocket}
				setWaiting={setWaiting}
			/>
		);

	return (
		<div className='h-fit w-fit flex justify-center items-center'>
			{gameEnded && (
				<div className='absolute z-30 font-mono'>
					<GameResult />
				</div>
			)}
			<div className='relative rounded-lg overflow-hidden shadow-2xl grid grid-rows-8 grid-cols-8 w-fit h-fit bg-white-400'>
				{rank.map((r) => {
					return file.map((f) => {
						let key = f + r;
						let square = chessBoard[key];
						return (
							<div
								className='w-14 h-14 md:h-16 md:w-16 lg:w-20 lg:h-20'
								key={key}
								onClick={() => selectSquare(key)}>
								<ChessSquare
									selectedFrom={from === key}
									square={square}
									color={square.squareColor}
								/>
							</div>
						);
					});
				})}
			</div>
		</div>
	);
};

export default ChessBoard;
