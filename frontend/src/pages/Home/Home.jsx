import React from 'react'
import homeBg from '../../assets/home_bg.png'
import ChessBoard from '../../components/ChessBoard.jsx'
import Menu from '../../components/Menu.jsx'
const Home = () => {
  return (
    <div className=' h-screen w-screen flex items-center' style={{
        background:`url(${homeBg}) no-repeat center center/cover`
    }}>
      <div className='justify-start h-full'>
      <Menu/>
      </div>
      <div className='flex justify-center items-center w-full'>
      <ChessBoard/>
      </div>
    </div>
  )
}

export default Home
