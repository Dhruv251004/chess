import React, { useEffect, useRef, useState } from 'react'
import ChessSquare from './ChessSquare';
import initialBoard from '../utils/chessBoard';
import { useSelector } from 'react-redux';

const ChessBoard = () => {
    const accessToken=useSelector(state=>state.user.accessToken)
    const username=useSelector(state=>state.user.username)
    const [chessBoard,setChessBoard]=useState(initialBoard);
    const [from,setFrom]=useState('');
    const [socket,setSocket]=useState('');

    // const socketRef = useRef(null);

    useEffect(()=>{
            const newSocket=new WebSocket(`ws://127.0.0.1:8000/ws/chess/${accessToken}`)
            setSocket(newSocket)
            newSocket.onopen=(e)=>{
            console.log("Connected to web socket")

            newSocket.onmessage=(e)=>{
            const data=JSON.parse((e.data))
            console.log(data)
            if(data.event.message=='INVALID'){
                return;
            }
            if(data.event.message!='START'){

                //Do something
                let prev=data.event.from;
                let curr=data.event.to;
                setChessBoard((prevBoard) => {
                    const board = JSON.parse(JSON.stringify(prevBoard));
                    board[curr].piece = board[prev].piece;
                    board[curr].pieceColor = board[prev].pieceColor;

                    // Clear the previous square
                    board[prev].piece = '';
                    board[prev].pieceColor = '';

                    return board; // Return the updated board
                });
                
                if (data.event.castle){
                    let prev=data.event.castle.from;
                    let curr=data.event.castle.to;
                    setChessBoard((prevBoard) => {
                        const board = JSON.parse(JSON.stringify(prevBoard));
                        board[curr].piece = board[prev].piece;
                        board[curr].pieceColor = board[prev].pieceColor;

                        // Clear the previous square
                        board[prev].piece = '';
                        board[prev].pieceColor = '';

                        return board; // Return the updated board
                    });
                }

                if(data.event.en_passant){
                    let position=data.event.en_passant
                    console.log("hii",position)
                    setChessBoard((prevBoard) => {
                        const board = JSON.parse(JSON.stringify(prevBoard));
                        // Clear the square
                        board[position].piece = '';
                        board[position].pieceColor = '';
                        return board; // Return the updated board
                    });
                }
            }
        }

         // Cleanup WebSocket connection when component unmounts
        return () => {
            newSocket.close();
      };
        }
    },[username,setChessBoard])


    let file=['a','b','c','d','e','f','g','h'];
    let rank=[8,7,6,5,4,3,2,1];
      


   const selectSquare=(square)=>{
        if(from==''){
            setFrom(square);
        }
        else{
            const message={
                event:{
                    from,
                    to:square
                }
            }
            setFrom('')
            console.log('sending ',message)
            socket.send(JSON.stringify(message))
        }
   } 

  return (
    <div>
    <div className='rounded-lg overflow-hidden shadow-2xl grid grid-rows-8 grid-cols-8 w-fit h-fit bg-white-400'>
    {/* <svg className=' absolute max-w-full max-h-full  fill-current z-10' viewBox='0 0 167 167'><text x="0.75" y="3.5" fontSize="2.8" className="text-amber-50">8</text><text x="0.75" y="15.75" fontSize="2.8" className="text-amber-50">7</text><text x="0.75" y="28.25" fontSize="2.8" className="text-amber-50">6</text><text x="0.75" y="40.75" fontSize="2.8" className="text-amber-50">5</text><text x="0.75" y="53.25" fontSize="2.8" className="text-amber-50">4</text><text x="0.75" y="65.75" fontSize="2.8" className="text-amber-50">3</text><text x="0.75" y="78.25" fontSize="2.8" className="text-amber-50">2</text><text x="0.75" y="90.75" fontSize="2.8" className="text-amber-50">1</text><text x="10" y="99" fontSize="2.8" className="text-amber-50">a</text><text x="22.5" y="99" fontSize="2.8" className="text-amber-50">b</text><text x="35" y="99" fontSize="2.8" className="text-amber-50">c</text><text x="47.5" y="99" fontSize="2.8" className="text-amber-50">d</text><text x="60" y="99" fontSize="2.8" className="text-amber-50">e</text><text x="72.5" y="99" fontSize="2.8" className="text-amber-50">f</text><text x="85" y="99" fontSize="2.8" className="text-amber-50">g</text><text x="97.5" y="99" fontSize="2.8" className="text-amber-50">h</text></svg> */}

        {
            rank.map((r)=>{
                return file.map((f)=>{
                    let key=f+r;
                    let square=chessBoard[key]
                    return (
                        <div key={key} onClick={()=> selectSquare(key)}>
                            <ChessSquare  square={square} color={square.squareColor}/>
                        </div>
                    )
                })
            })
        }

    </div>
    </div>
  )
}

export default ChessBoard
