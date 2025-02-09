import { History } from 'lucide-react';

const MoveHistory = ({ moves, compact = false }) => {
	return (
		<div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50'>
			<div className='flex items-center justify-between mb-4'>
				<div className='flex items-center gap-2'>
					<History className='w-5 h-5 text-blue-400' />
					<h3 className='text-blue-400 font-medium'>Move History</h3>
				</div>
				<span className='text-sm text-gray-400'>{moves.length} moves</span>
			</div>

			<div
				className={`grid grid-cols-2 gap-3 grid-rows-10 ${
					compact ? 'max-h-[200px]' : 'h-[500px]'
				} overflow-y-scroll pr-2 custom-scrollbar`}>
				{moves.map((move, index) => (
					<div
						key={index}
						className='bg-gray-700/50 text-center py-2.5 px-4 rounded-xl text-sm font-medium text-gray-200 transition-all hover:bg-gray-600/50 hover:scale-[1.02] hover:shadow-lg h-fit'>
						{index + 1}. {move}
					</div>
				))}
			</div>
		</div>
	);
};

export default MoveHistory;
