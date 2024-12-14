import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ProtectedRoute = ({children}) => {


    // utils
    const dispatch=useDispatch()
    const navigate=useNavigate()

    // Store vars
    const accessToken=useSelector(state=>state.user.accessToken)
    const isAuthenticated=useSelector(state=>state.user.isAuthenticated)

    useEffect(()=>{
        const fecthUserDetails=async()=>{

            if (isAuthenticated) return;
            const baseUrl=import.meta.env.VITE_API_URL;
            const response=await fetch(`${baseUrl}/user/details`,{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            });

            const result=await response.json();
            console.log(result)
            if(result.status==='success'){
                const data=result.data
                dispatch(login({
                    firstName:data.first_name,
                    lastName:data.last_name,
                    username:data.username,
                    email:data.email,
                }))
            }
            else{
                toast('You must be logged in to proceed. Please log in and try again.')
                return navigate('/login')
            }
        }
        fecthUserDetails();

    },[]);


    return children;
}

export default ProtectedRoute
