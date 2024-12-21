import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authBg from '../assets/auth_bg.png';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const accessToken = useSelector((state) => state.user.accessToken);
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

	const [isLoading, setIsLoading] = useState(true); // Tracks whether authentication is being verified

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (!accessToken) {
				toast('Session expired or invalid. Redirecting to login...');
				navigate('/login');
				return;
			}

			if (isAuthenticated) {
				setIsLoading(false);
				return;
			}

			const baseUrl = import.meta.env.VITE_API_URL;

			try {
				const response = await fetch(`${baseUrl}/user/details`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const result = await response.json();

				if (result.status === 'success') {
					const data = result.data;
					dispatch(
						login({
							firstName: data.first_name,
							lastName: data.last_name,
							username: data.username,
							email: data.email,
							profilePic: data.profile_pic,
						})
					);
				} else {
					toast('Session expired or invalid. Redirecting to login...');
					navigate('/login');
				}
			} catch (error) {
				toast('An error occurred. Redirecting to login...');
				navigate('/login');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserDetails();
	}, [accessToken, isAuthenticated, dispatch, navigate]);

	if (isLoading) {
		return (
			<div
				className='flex justify-center items-center h-screen'
				style={{
					background: `url(${authBg}) no-repeat center center/cover`,
				}}>
				<Spinner />
			</div>
		);
	}

	return isAuthenticated ? children : null;
};

export default ProtectedRoute;
