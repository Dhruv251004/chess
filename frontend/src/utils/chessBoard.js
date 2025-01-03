import { getCoordinates } from './getCoordinates';

const initialBoard = {
	a1: {
		piece: 'rook',
		pieceColor: 'white',
		squareColor: 'dark',
		isCorner: true,
		...getCoordinates('a1'),
	},
	b1: {
		piece: 'knight',
		pieceColor: 'white',
		squareColor: 'light',
		...getCoordinates('b1'),
	},
	c1: {
		piece: 'bishop',
		pieceColor: 'white',
		squareColor: 'dark',
		...getCoordinates('c1'),
	},
	d1: {
		piece: 'queen',
		pieceColor: 'white',
		squareColor: 'light',
		...getCoordinates('d1'),
	},
	e1: {
		piece: 'king',
		pieceColor: 'white',
		squareColor: 'dark',
		...getCoordinates('e1'),
	},
	f1: {
		piece: 'bishop',
		pieceColor: 'white',
		squareColor: 'light',
		...getCoordinates('f1'),
	},
	g1: {
		piece: 'knight',
		pieceColor: 'white',
		squareColor: 'dark',
		...getCoordinates('g1'),
	},
	h1: {
		piece: 'rook',
		pieceColor: 'white',
		squareColor: 'light',
		isCorner: true,
		cornerPos: 'tr',
		...getCoordinates('h1'),
	},

	a2: {
		piece: 'pawn',
		pieceColor: 'white',
		squareColor: 'light',
		...getCoordinates('a2'),
	},
	b2: {
		piece: 'pawn',
		pieceColor: 'white',
		squareColor: 'dark',
		...getCoordinates('b2'),
	},
	c2: {
		piece: 'pawn',
		pieceColor: 'white',
		squareColor: 'light',
		...getCoordinates('c2'),
	},
	d2: {
		piece: 'pawn',
		pieceColor: 'white',
		squareColor: 'dark',
		...getCoordinates('d2'),
	},
	e2: {
		piece: 'pawn',
		pieceColor: 'white',
		squareColor: 'light',
		...getCoordinates('e2'),
	},
	f2: {
		piece: 'pawn',
		pieceColor: 'white',
		squareColor: 'dark',
		...getCoordinates('f2'),
	},
	g2: {
		piece: 'pawn',
		pieceColor: 'white',
		squareColor: 'light',
		...getCoordinates('g2'),
	},
	h2: {
		piece: 'pawn',
		pieceColor: 'white',
		squareColor: 'dark',
		...getCoordinates('h2'),
	},

	a3: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('a3'),
	},
	b3: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('b3'),
	},
	c3: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('c3'),
	},
	d3: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('d3'),
	},
	e3: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('e3'),
	},
	f3: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('f3'),
	},
	g3: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('g3'),
	},
	h3: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('h3'),
	},

	a4: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('a4'),
	},
	b4: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('b4'),
	},
	c4: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('c4'),
	},
	d4: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('d4'),
	},
	e4: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('e4'),
	},
	f4: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('f4'),
	},
	g4: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('g4'),
	},
	h4: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('h4'),
	},

	a5: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('a5'),
	},
	b5: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('b5'),
	},
	c5: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('c5'),
	},
	d5: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('d5'),
	},
	e5: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('e5'),
	},
	f5: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('f5'),
	},
	g5: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('g5'),
	},
	h5: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('h5'),
	},

	a6: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('a6'),
	},
	b6: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('b6'),
	},
	c6: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('c6'),
	},
	d6: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('d6'),
	},
	e6: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('e6'),
	},
	f6: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('f6'),
	},
	g6: {
		piece: '',
		pieceColor: '',
		squareColor: 'light',
		...getCoordinates('g6'),
	},
	h6: {
		piece: '',
		pieceColor: '',
		squareColor: 'dark',
		...getCoordinates('h6'),
	},

	a7: {
		piece: 'pawn',
		pieceColor: 'black',
		squareColor: 'dark',
		...getCoordinates('a7'),
	},
	b7: {
		piece: 'pawn',
		pieceColor: 'black',
		squareColor: 'light',
		...getCoordinates('b7'),
	},
	c7: {
		piece: 'pawn',
		pieceColor: 'black',
		squareColor: 'dark',
		...getCoordinates('c7'),
	},
	d7: {
		piece: 'pawn',
		pieceColor: 'black',
		squareColor: 'light',
		...getCoordinates('d7'),
	},
	e7: {
		piece: 'pawn',
		pieceColor: 'black',
		squareColor: 'dark',
		...getCoordinates('e7'),
	},
	f7: {
		piece: 'pawn',
		pieceColor: 'black',
		squareColor: 'light',
		...getCoordinates('f7'),
	},
	g7: {
		piece: 'pawn',
		pieceColor: 'black',
		squareColor: 'dark',
		...getCoordinates('g7'),
	},
	h7: {
		piece: 'pawn',
		pieceColor: 'black',
		squareColor: 'light',
		...getCoordinates('h7'),
	},

	a8: {
		piece: 'rook',
		pieceColor: 'black',
		squareColor: 'light',
		isCorner: true,
		...getCoordinates('a8'),
	},
	b8: {
		piece: 'knight',
		pieceColor: 'black',
		squareColor: 'dark',
		...getCoordinates('b8'),
	},
	c8: {
		piece: 'bishop',
		pieceColor: 'black',
		squareColor: 'light',
		...getCoordinates('c8'),
	},
	d8: {
		piece: 'queen',
		pieceColor: 'black',
		squareColor: 'dark',
		...getCoordinates('d8'),
	},
	e8: {
		piece: 'king',
		pieceColor: 'black',
		squareColor: 'light',
		...getCoordinates('e8'),
	},
	f8: {
		piece: 'bishop',
		pieceColor: 'black',
		squareColor: 'dark',
		...getCoordinates('f8'),
	},
	g8: {
		piece: 'knight',
		pieceColor: 'black',
		squareColor: 'light',
		...getCoordinates('g8'),
	},
	h8: {
		piece: 'rook',
		pieceColor: 'black',
		squareColor: 'dark',
		isCorner: true,
		...getCoordinates('h8'),
	},
};

export default initialBoard;
