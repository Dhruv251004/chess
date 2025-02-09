import React from 'react';
import { Flag, X, AlertTriangle } from 'lucide-react';

const ResignConfirmation = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null;

	return (
		<div
			style={{ zIndex: 9999 }}
			className=' fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center p-4 '>
			<div className='bg-black/80 rounded-2xl border border-red-500/20 p-6 max-w-md w-full animate-in fade-in zoom-in duration-200'>
				<div className='flex flex-col items-center'>
					<div className='h-16 w-16 bg-red-500/10 rounded-xl flex items-center justify-center mb-6'>
						<AlertTriangle className='h-8 w-8 text-red-400' />
					</div>

					<h2 className='text-2xl font-bold text-white mb-2'>
						Confirm Resignation
					</h2>
					<p className='text-gray-400 text-center mb-6'>
						Are you sure you want to resign this game? This action cannot be
						undone.
					</p>

					<div className='flex gap-4 w-full'>
						<button
							onClick={onConfirm}
							className='flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg px-4 py-3 font-medium transition-colors'>
							<Flag className='w-5 h-5' />
							Resign Game
						</button>
						<button
							onClick={onClose}
							className='flex-1 flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg px-4 py-3 font-medium transition-colors'>
							<X className='w-5 h-5' />
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResignConfirmation;
