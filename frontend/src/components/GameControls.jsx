import React, { useState } from 'react';
import { Flag, RotateCcw, MessageSquare } from 'lucide-react';
import ResignConfirmation from './ResignConfirmation';

const GameControls = ({ showChat, setShowChat, resignGame }) => {
	const [showResignConfirmation, setShowResignConfirmation] = useState(false);

	const handleResignConfirm = () => {
		resignGame();
		setShowResignConfirmation(false);
	};

	return (
		<>
			<div className='grid grid-cols-3 gap-3'>
				<button
					className='flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-700/50 hover:bg-red-500/20 transition-colors group'
					onClick={() => setShowResignConfirmation(true)}>
					<Flag className='w-5 h-5 text-gray-300 group-hover:text-red-400 transition-colors' />
					<span className='text-xs text-gray-300 group-hover:text-red-400 transition-colors'>
						Resign
					</span>
				</button>

				<button className='flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-700/50 hover:bg-yellow-500/20 transition-colors group'>
					<RotateCcw className='w-5 h-5 text-gray-300 group-hover:text-yellow-400 transition-colors' />
					<span className='text-xs text-gray-300 group-hover:text-yellow-400 transition-colors'>
						Draw
					</span>
				</button>

				<button
					onClick={() => setShowChat(!showChat)}
					className='flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-700/50 hover:bg-blue-500/20 transition-colors group'>
					<MessageSquare className='w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors' />
					<span className='text-xs text-gray-300 group-hover:text-blue-400 transition-colors'>
						Chat
					</span>
				</button>
			</div>

			<ResignConfirmation
				isOpen={showResignConfirmation}
				onClose={() => setShowResignConfirmation(false)}
				onConfirm={handleResignConfirm}
			/>
		</>
	);
};

export default GameControls;
