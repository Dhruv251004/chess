import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChessBoard from '../../components/ChessBoard';
import PlayerCard from '../../components/PlayerCard';
import MoveHistory from '../../components/MoveHistory';
import GameControls from '../../components/GameControls';
import Chat from '../../components/Chat';
import {
	Clock,
	Settings,
	ChevronUp,
	History,
	MessageSquare,
} from 'lucide-react';

const Play = () => {
	const [waiting, setWaiting] = useState(true);
	const [showSettings, setShowSettings] = useState(false);
	const [moves, setMoves] = useState([]);
	const [showMobileHistory, setShowMobileHistory] = useState(false);
	const [showChat, setShowChat] = useState(false);
	const [resign, setResign] = useState(false);
	const [socket, setSocket] = useState(null);

	// User info from Redux
	const firstName = useSelector((state) => state.user.firstName);
	const lastName = useSelector((state) => state.user.lastName);
	const username = useSelector((state) => state.user.username);
	const profilePic = useSelector((state) => state.user.profilePic);

	// Opponent info
	const [opponentInfo, setOpponentInfo] = useState({
		username: '',
		profile_pic: '',
		first_name: '',
		last_name: '',
	});

	const addMove = (move) => {
		setMoves((prevMoves) => [...prevMoves, move]);
	};

	const resignGame = () => {
		setResign(true);
	};

	return (
		<div className='h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden flex flex-col'>
			{/* Top Bar */}
			<div className='w-full bg-black/30 border-b border-blue-500/10 backdrop-blur-sm sticky top-0 z-50'>
				<div className='max-w-[1920px] mx-auto px-6 py-2 flex items-center justify-between'>
					<div className='flex items-center space-x-3'>
						<h1 className='text-2xl font-bold text-white'>Game Room</h1>
						{!waiting && (
							<span className='bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full border border-green-500/20'>
								Live
							</span>
						)}
					</div>
					<div className='flex items-center space-x-4'>
						<button
							onClick={() => {
								setShowChat(!showChat);
							}}
							className='p-2 rounded-lg hover:bg-blue-500/10 transition-colors z-50 relative'>
							<MessageSquare className='w-6 h-6 text-blue-400' />
						</button>
						<button
							onClick={() => setShowMobileHistory(!showMobileHistory)}
							className='lg:hidden p-2 rounded-lg hover:bg-blue-500/10 transition-colors'>
							<History className='w-6 h-6 text-blue-400' />
						</button>
						<button
							onClick={() => setShowSettings(!showSettings)}
							className='p-2 rounded-lg hover:bg-blue-500/10 transition-colors'>
							<Settings className='w-6 h-6 text-blue-400' />
						</button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='flex-1 overflow-hidden'>
				<div className='h-full max-w-[1920px] mx-auto px-6 flex items-center'>
					<div className='flex gap-8 items-center justify-center w-full h-full'>
						{/* Left Column - Game Info */}
						{!waiting && (
							<div className='hidden lg:flex flex-col gap-6 w-96'>
								<PlayerCard
									name={`${opponentInfo.first_name} ${opponentInfo.last_name}`}
									username={opponentInfo.username}
									profilePic={opponentInfo.profile_pic}
									isOpponent
								/>

								<div className='bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-blue-500/20 transition-all'>
									<div className='flex items-center justify-between mb-6'>
										<h3 className='text-lg font-semibold text-white'>
											Game Info
										</h3>
										<div className='bg-blue-500/10 p-2 rounded-lg'>
											<Clock className='w-5 h-5 text-blue-400' />
										</div>
									</div>
									<GameControls
										showChat={showChat}
										setShowChat={setShowChat}
										resignGame={resignGame}
										socket={socket}
									/>
								</div>

								<PlayerCard
									name={`${firstName} ${lastName}`}
									username={username}
									profilePic={profilePic}
								/>
							</div>
						)}

						{/* Center - Chess Board */}
						<div className='flex-shrink-0 flex items-center justify-center'>
							<div className='bg-black/20 backdrop-blur-sm rounded-xl p-2 border border-white/5 hover:border-blue-500/20 transition-all'>
								<ChessBoard
									waiting={waiting}
									setWaiting={setWaiting}
									setOpponentInfo={setOpponentInfo}
									addMove={addMove}
									resign={resign}
									setOuterSocket={setSocket}
								/>
							</div>
						</div>

						{/* Right Column - Move History */}
						{!waiting && (
							<div className='hidden lg:block w-96 h-fit'>
								<div className='bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-blue-500/20 transition-all'>
									<MoveHistory moves={moves} />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Mobile Move History */}
			<div
				className={`lg:hidden fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ${
					showMobileHistory ? 'translate-y-0' : 'translate-y-full'
				}`}>
				<button
					onClick={() => setShowMobileHistory(false)}
					className='absolute -top-12 right-4 bg-black/30 backdrop-blur-sm p-2 rounded-t-lg border-t border-l border-r border-blue-500/10'>
					<ChevronUp className='w-6 h-6 text-blue-400' />
				</button>
				<div className='bg-black/30 backdrop-blur-sm border-t border-blue-500/10 p-6'>
					<MoveHistory
						moves={moves}
						compact
					/>
				</div>
			</div>

			{/* Chat Component */}
			<Chat
				isOpen={showChat}
				onClose={() => setShowChat(false)}
				socket={socket}
			/>
		</div>
	);
};

export default Play;
