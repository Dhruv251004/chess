import React, { useEffect, useRef, useState } from 'react'
import ChessSquare from './ChessSquare';
import initialBoard from '../utils/chessBoard';

const ChessBoard = () => {
    const usernameRef=useRef(null);
    const [username,setUsername]=useState('');
    const [chessBoard,setChessBoard]=useState(initialBoard);
    
    const [from,setFrom]=useState('');
    const [socket,setSocket]=useState('');

    // const socketRef = useRef(null);

    useEffect(()=>{
        if (username!=''){
            const newSocket=new WebSocket(`ws://127.0.0.1:8000/ws/chess/${username}/`)
            setSocket(newSocket)
            newSocket.onopen=(e)=>{
            console.log("Connected to web socket")
        }

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

                // let board=JSON.parse(JSON.stringify(chessBoard));
                // board[curr].piece=board[prev].piece
                // board[curr].pieceColor=board[prev].pieceColor;

                // board[prev].piece=board[prev].pieceColor=''

                // setChessBoard(board)
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
    <div >
        <div>
            <input ref={usernameRef} placeholder='Enter your username' type="text" className='bg-black text-white'/>
            <button onClick={()=>{
                setUsername(usernameRef.current.value)
            }}>
                Play
            </button>
        </div>
    <div className='border border-red-950 grid grid-rows-8 grid-cols-8 w-96 h-96 bg-white-400'>

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
