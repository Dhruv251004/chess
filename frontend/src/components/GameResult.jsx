import React from 'react';
import resultBg from '../assets/home_bg.png';

const GameResult = ({ winner, player, opponent }) => {
	const isWinner = winner === player;

	return (
		<div
			className='h-fit w-fit rounded-lg p-10 pl-12 pr-12  flex flex-col items-center justify-center text-white'
			style={{
				// backgroundColor: '#272522',
				backgroundColor: 'rgb(29 28 26)',
			}}>
			{/* Result Banner */}
			<div
				style={{
					backgroundColor: 'rgb(42 40 38)',
				}}
				className={`text-center p-6 rounded-lg shadow-lg`}>
				<h1 className='text-4xl font-bold'>
					{isWinner ? 'You Won!' : 'You Lost'}
				</h1>
				<p className='mt-2 text-lg'>
					{isWinner
						? `Congratulations, ${player}!`
						: `Better luck next time, ${player}.`}
				</p>
			</div>

			{/* Game Details */}
			<div
				style={{
					backgroundColor: 'rgb(42 40 38)',
				}}
				className='mt-8 w-full max-w-2xl shadow-lg rounded-lg p-6'>
				<h2 className='text-2xl font-semibold text-center mb-6'>
					Game Summary
				</h2>

				{/* Player vs Opponent */}
				<div className='flex items-center justify-between'>
					{/* Player */}
					<div className='flex flex-col items-center'>
						<img
							src={player}
							alt={player}
							className='w-24 h-24 rounded-full border-4 border-white'
						/>
						<p className='mt-4 font-semibold text-lg'>{player}</p>
						<p
							className={`mt-2 text-lg font-extrabold ${
								isWinner ? 'text-green-500' : 'text-gray-500'
							}`}>
							{isWinner ? 'Winner' : 'Loser'}
						</p>
					</div>

					{/* VS */}
					<div className='text-white font-bold text-xl'>VS</div>

					{/* Opponent */}
					<div className='flex flex-col items-center'>
						<img
							src={opponent}
							alt={opponent}
							className='w-24 h-24 rounded-full border-4 border-white'
						/>
						<p className='mt-4 font-semibold text-lg'>{opponent}</p>
						<p
							className={`mt-2 text-lg font-extrabold ${
								!isWinner ? 'text-green-500' : 'text-gray-500'
							}`}>
							{!isWinner ? 'Winner' : 'Loser'}
						</p>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='mt-6 flex space-x-4'>
				<button
					style={{
						backgroundColor: 'rgb(42 40 38)',
					}}
					onClick={() => window.location.reload()}
					className='px-6 py-2  rounded-lg shadow-slate-100'>
					Play Again
				</button>
				<button
					style={{
						backgroundColor: 'rgb(42 40 38)',
					}}
					className='px-6 py-2 rounded-lg shadow-slate-100'>
					Exit
				</button>
			</div>
		</div>
	);
};

export default GameResult;
