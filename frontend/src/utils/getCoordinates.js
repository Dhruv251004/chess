import { SQUARE_SIZE } from './constants.js';

export const getCoordinates = (square) => {
	const col = square.charCodeAt(0) - 'a'.charCodeAt(0); // 'a' = 0, 'b' = 1, ..., 'h' = 7
	const row = 8 - parseInt(square[1]); // '1' = 7 (bottom), '8' = 0 (top)
	const left = col * SQUARE_SIZE;
	const top = row * SQUARE_SIZE;
	return { top, left };
};
