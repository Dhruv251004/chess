/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import whiteKnight from '../assets/wn.png';
import whiteQueen from '../assets/wq.png';
import whiteKing from '../assets/wk.png';
import whiteRook from '../assets/wr.png';
import whiteBishop from '../assets/wb.png';
import whitePawn from '../assets/wp.png';

import blackKnight from '../assets/bn.png';
import blackQueen from '../assets/bq.png';
import blackKing from '../assets/bk.png';
import blackRook from '../assets/br.png';
import blackBishop from '../assets/bb.png';
import blackPawn from '../assets/bp.png';
import darkSquare from '../assets/dark_sq.png'
import lightSquare from '../assets/light_sq.png'
import ChessPiece from './ChessPiece';

const ChessSquare = ({ color, square,selectedFrom }) => {
  const [piece, setPiece] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);

  // This effect runs only once after the first render
  useEffect(() => {
    setIsFirstRender(false); // Set the flag to false after the first render
  }, []);
  useEffect(() => {
    let selectedPiece = "";
    if (square.pieceColor === 'white') {
      switch (square.piece) {
        case 'pawn':
          selectedPiece = whitePawn;
          break;
        case 'knight':
          selectedPiece = whiteKnight;
          break;
        case 'bishop':
          selectedPiece = whiteBishop;
          break;
        case 'rook':
          selectedPiece = whiteRook;
          break;
        case 'queen':
          selectedPiece = whiteQueen;
          break;
        case 'king':
          selectedPiece = whiteKing;
          break;
        default:
          selectedPiece = "";
      }
    } else if (square.pieceColor === 'black') {
      switch (square.piece) {
        case 'pawn':
          selectedPiece = blackPawn;
          break;
        case 'knight':
          selectedPiece = blackKnight;
          break;
        case 'bishop':
          selectedPiece = blackBishop;
          break;
        case 'rook':
          selectedPiece = blackRook;
          break;
        case 'queen':
          selectedPiece = blackQueen;
          break;
        case 'king':
          selectedPiece = blackKing;
          break;
        default:
          selectedPiece = "";
      }
    }
    
    setPiece(selectedPiece);
  }, [square]);

  // useEffect(()=>{
  //   if(selectedFrom){
  //     setBg('')
  //   }
  //   else setBg(color==='light'?darkSquare:lightSquare)
  // },[selectedFrom])

const bg=color==='light'?darkSquare:lightSquare;
  // const [bg,setBg]=useState(color==='light'?darkSquare:lightSquare)

  return (
    <div
      style={{ background: `url(${bg}) no-repeat center center/cover`}}
      className={`w-20 h-20 `}>
      <div className={`w-20 h-20`}
        style={{
          backgroundColor:`${selectedFrom?'#dda13487':''}`
        }}
      >
      {
         <ChessPiece piece={piece}  top={square.top} left={square.left}/>
      }
      </div>
    </div>
  );
};

export default ChessSquare;
