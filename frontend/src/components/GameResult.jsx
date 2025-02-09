import React from 'react';
import {
	Trophy,
	Swords,
	RotateCcw,
	LogOut,
	Clock,
	Target,
	Share2,
	Medal,
} from 'lucide-react';

const GameResult = ({ winner, player, opponent }) => {
	const isWinner = winner === player;

	return (
		<div className='bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-blue-500/20 p-8 shadow-xl w-[30rem]'>
			{/* Result Banner */}
			<div className='text-center'>
				<div className='mx-auto h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4'>
					{isWinner ? (
						<Trophy className='h-10 w-10 text-blue-400' />
					) : (
						<Swords className='h-10 w-10 text-blue-400' />
					)}
				</div>
				<h1 className='text-3xl font-bold text-white mb-2'>
					{isWinner ? 'Victory!' : 'Defeat'}
				</h1>
				<p className='text-lg text-gray-400'>
					{isWinner
						? `Excellent strategy, ${player}!`
						: `A worthy battle, ${player}.`}
				</p>
			</div>

			{/* Game Stats */}
			<div className='mt-8 grid grid-cols-3 gap-4'>
				<div className='bg-blue-500/10 rounded-lg p-3 text-center'>
					<Clock className='h-5 w-5 text-blue-400 mx-auto mb-1' />
					<p className='text-sm text-gray-400'>Time</p>
					<p className='text-lg font-semibold text-white'>12:45</p>
				</div>
				<div className='bg-blue-500/10 rounded-lg p-3 text-center'>
					<Target className='h-5 w-5 text-blue-400 mx-auto mb-1' />
					<p className='text-sm text-gray-400'>Moves</p>
					<p className='text-lg font-semibold text-white'>24</p>
				</div>
				<div className='bg-blue-500/10 rounded-lg p-3 text-center'>
					<Medal className='h-5 w-5 text-blue-400 mx-auto mb-1' />
					<p className='text-sm text-gray-400'>Rating</p>
					<p className='text-lg font-semibold text-white'>+15</p>
				</div>
			</div>

			{/* Game Summary */}
			<div className='mt-8 bg-blue-500/5 rounded-xl p-6 border border-blue-500/10'>
				<h2 className='text-lg font-semibold text-white mb-4 text-center'>
					Match Summary
				</h2>
				{/* Players */}
				<div className='flex items-center justify-between'>
					{/* Player */}
					<div className='flex flex-col items-center'>
						<div className='relative'>
							<div className='w-20 h-20 rounded-full border-2 border-blue-500/30 p-1'>
								<img
									src={player}
									alt={player}
									className='w-full h-full rounded-full object-cover'
								/>
							</div>
							<div
								className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center text-sm ${
									isWinner
										? 'bg-blue-500 text-white'
										: 'bg-gray-600 text-gray-300'
								}`}>
								{isWinner ? '♔' : '♙'}
							</div>
						</div>
						<p className='mt-3 text-base font-medium text-white'>{player}</p>
						<div
							className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
								isWinner
									? 'bg-blue-500/20 text-blue-400'
									: 'bg-gray-700/50 text-gray-400'
							}`}>
							{isWinner ? 'Winner' : 'Defeated'}
						</div>
					</div>

					{/* VS */}
					<div className='flex flex-col items-center gap-2'>
						<div className='w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center'>
							<span className='text-blue-400 font-bold'>VS</span>
						</div>
						<div className='text-xs text-gray-500'>Match #2453</div>
					</div>

					{/* Opponent */}
					<div className='flex flex-col items-center'>
						<div className='relative'>
							<div className='w-20 h-20 rounded-full border-2 border-blue-500/30 p-1'>
								<img
									src={opponent}
									alt={opponent}
									className='w-full h-full rounded-full object-cover'
								/>
							</div>
							<div
								className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center text-sm ${
									!isWinner
										? 'bg-blue-500 text-white'
										: 'bg-gray-600 text-gray-300'
								}`}>
								{!isWinner ? '♔' : '♙'}
							</div>
						</div>
						<p className='mt-3 text-base font-medium text-white'>{opponent}</p>
						<div
							className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
								!isWinner
									? 'bg-blue-500/20 text-blue-400'
									: 'bg-gray-700/50 text-gray-400'
							}`}>
							{!isWinner ? 'Winner' : 'Defeated'}
						</div>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='mt-8 flex gap-4'>
				<button
					onClick={() => window.location.reload()}
					className='flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white hover:bg-blue-400 transition-colors'>
					<RotateCcw className='w-5 h-5' />
					Play Again
				</button>
				<button className='flex items-center justify-center gap-2 rounded-lg bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors'>
					<Share2 className='w-5 h-5' />
					Share
				</button>
				<button className='flex-1 flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-3 text-sm font-medium text-white hover:bg-gray-700 transition-colors'>
					<LogOut className='w-5 h-5' />
					Exit
				</button>
			</div>
		</div>
	);
};

export default GameResult;
