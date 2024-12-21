import React from 'react';

const ChessPiece = ({ piece, top, left }) => {
	return (
		<div
			className={`w-10 h-10 md:h-16 md:w-16 lg:w-20 lg:h-20 absolute transition-all duration-3000 ease-in-out bg-contain`}
			style={{
				background: piece
					? `url(${piece}) no-repeat center center/cover`
					: 'none',
				zIndex: 2,
			}}></div>
	);
};

export default ChessPiece;
