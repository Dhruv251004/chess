import React from 'react'
import homeBg from '../../assets/home_bg.png'
import ReactLoading from 'react-loading'
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
const WaitingScreen = ({setWaiting,closeSocket}) => {

    const navigate=useNavigate()

    const cancelSearch=()=>{
        closeSocket()
        setWaiting(false)
        navigate('/')
    }

  return (
    <div className=' h-full w-full flex justify-center items-center' style={{
        background:`url(${homeBg}) no-repeat center center/cover`
    }}>
       <div className='flex flex-col'>
       <div>
       <ReactLoading type="bars" color="gray"
                height={200} width={200} />
       </div>
       <div className=' text-center text-gray-400 mb-3'>
        Searching for opponent...
       </div>
       <div className=' text-center text-gray-400 cursor-pointer' onClick={cancelSearch}>
        <CloseIcon/>
       </div>
       </div>
    </div>
  )
}

export default WaitingScreen
