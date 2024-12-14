import React, { useState } from 'react'
import homeBg from '../../assets/home_bg.png'
import ChessBoard from '../../components/ChessBoard.jsx'
import Menu from '../../components/Menu.jsx'
import UserItem from './UserItem.jsx'
import WaitingScreen from './WaitingScreen.jsx'
const Play = () => {

  const [waiting,setWaiting]=useState(true)

  return (
    <div className=' h-screen w-screen flex items-center' style={{
        background:`url(${homeBg}) no-repeat center center/cover`
    }}>
      <div className='justify-start h-full'>
      <Menu/>
      </div>
      <div className='flex justify-around items-center w-full h-full'>
      <div className='h-full flex justify-center items-center'>
      <ChessBoard waiting={waiting} setWaiting={setWaiting} />
      {!waiting && <div className='text-white text-5xl flex flex-col h-full pt-7 pb-7'>
       <div className='mb-auto'>
       <UserItem/>
       </div>
       <div className='items-end'>
       <UserItem/>
       </div>
      </div>}
      </div>
      </div>
    </div>
  )
}

export default Play
