import React from 'react';
import { Crown } from 'lucide-react';

const PromotionDialog = ({ isOpen, onSelect, onClose }) => {
	if (!isOpen) return null;

	const pieces = [
		{ type: 'Q', name: 'Queen', symbol: '♕' },
		{ type: 'R', name: 'Rook', symbol: '♖' },
		{ type: 'B', name: 'Bishop', symbol: '♗' },
		{ type: 'N', name: 'Knight', symbol: '♘' },
	];

	return (
		<div
			className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'
			style={{ zIndex: 9999 }}>
			<div className='bg-black/80 rounded-2xl border border-blue-500/20 p-6 max-w-md w-full animate-in fade-in zoom-in duration-200'>
				<div className='flex flex-col items-center'>
					<div className='h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6'>
						<Crown className='h-8 w-8 text-blue-400' />
					</div>

					<h2 className='text-2xl font-bold text-white mb-2'>Promote Pawn</h2>
					<p className='text-gray-400 text-center mb-6'>
						Choose a piece to promote your pawn to
					</p>

					<div className='grid grid-cols-2 gap-4 w-full'>
						{pieces.map((piece) => (
							<button
								key={piece.type}
								onClick={() => onSelect(piece.type)}
								className='flex items-center justify-center gap-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg p-4 transition-colors group'>
								<span className='text-4xl font-chess text-blue-400 group-hover:scale-110 transition-transform'>
									{piece.symbol}
								</span>
								<span className='text-white group-hover:text-blue-400 transition-colors'>
									{piece.name}
								</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PromotionDialog;
