import React from 'react';
import { Trophy, Timer } from 'lucide-react';

const PlayerCard = ({ name, username, profilePic, isOpponent = false }) => {
	return (
		<div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50'>
			<div className='flex items-center justify-between mb-3'>
				<div className='flex items-center gap-2'>
					<Trophy
						className={`w-5 h-5 ${
							isOpponent ? 'text-amber-400' : 'text-emerald-400'
						}`}
					/>
					<span
						className={`font-medium ${
							isOpponent ? 'text-amber-400' : 'text-emerald-400'
						}`}>
						{isOpponent ? 'Opponent' : 'You'}
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<Timer className='w-4 h-4 text-gray-400' />
					<span className='text-gray-400 text-sm'>10:00</span>
				</div>
			</div>

			<div className='flex items-center gap-3'>
				<div className='relative'>
					<img
						src={profilePic || 'https://via.placeholder.com/40'}
						alt={name}
						className='w-12 h-12 rounded-lg object-cover'
					/>
					<div className='absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-gray-800' />
				</div>
				<div>
					<h3 className='font-medium text-white'>{name}</h3>
					<p className='text-sm text-gray-400'>@{username}</p>
				</div>
			</div>
		</div>
	);
};

export default PlayerCard;
