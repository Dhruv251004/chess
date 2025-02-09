import React from 'react';
import { X, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WaitingScreen = ({ setWaiting, closeSocket }) => {
	const navigate = useNavigate();

	const cancelSearch = () => {
		closeSocket();
		setWaiting(false);
		navigate('/');
	};

	return (
		<div className='h-full flex items-center justify-center w-full p-6'>
			<div className='text-center space-y-6'>
				{/* Animated Crown Logo */}
				<div className='relative'>
					<Crown className='w-20 h-20 text-[#e2b714] mx-auto animate-pulse' />
					<div className='absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent' />
				</div>

				{/* Loading Animation */}
				<div className='flex justify-center gap-2'>
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className='w-3 h-3 bg-[#e2b714] rounded-full animate-bounce'
							style={{
								animationDelay: `${i * 0.2}s`,
								animationDuration: '1s',
							}}
						/>
					))}
				</div>

				{/* Status Text */}
				<div className='space-y-2'>
					<h2 className='text-xl font-semibold text-white'>Finding Opponent</h2>
					<p className='text-gray-400'>Looking for a worthy challenger...</p>
				</div>

				{/* Cancel Button */}
				<button
					onClick={cancelSearch}
					className='group flex items-center gap-2 mx-auto px-4 py-2 bg-[#2a2a4a] hover:bg-[#3a3a5a] rounded-lg transition-colors'>
					<X className='w-5 h-5 text-gray-400 group-hover:text-white transition-colors' />
					<span className='text-gray-400 group-hover:text-white transition-colors'>
						Cancel Search
					</span>
				</button>
			</div>
		</div>
	);
};

export default WaitingScreen;
