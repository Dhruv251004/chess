import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Shield, Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const accessToken = useSelector((state) => state.user.accessToken);
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

	const [isLoading, setIsLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState(
		'Verifying your session...'
	);

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (!accessToken) {
				setLoadingMessage('Session expired. Redirecting to login...');
				toast('Session expired or invalid. Redirecting to login...');
				setTimeout(() => navigate('/login'), 1500);
				return;
			}

			if (isAuthenticated) {
				setIsLoading(false);
				return;
			}

			const baseUrl = import.meta.env.VITE_API_URL;

			try {
				setLoadingMessage('Fetching your details...');
				const response = await fetch(`${baseUrl}/user/details`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const result = await response.json();

				if (result.status === 'success') {
					setLoadingMessage('Authentication successful...');
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
					setLoadingMessage('Session invalid. Redirecting to login...');
					toast('Session expired or invalid. Redirecting to login...');
					setTimeout(() => navigate('/login'), 1500);
				}
			} catch (error) {
				setLoadingMessage('An error occurred. Redirecting to login...');
				toast('An error occurred. Redirecting to login...');
				setTimeout(() => navigate('/login'), 1500);
			} finally {
				setTimeout(() => setIsLoading(false), 500);
			}
		};

		fetchUserDetails();
	}, [accessToken, isAuthenticated, dispatch, navigate]);

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4'>
				<div className='bg-black/20 backdrop-blur-sm rounded-2xl border border-white/5 p-8 shadow-xl max-w-md w-full'>
					<div className='flex flex-col items-center'>
						<div className='h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6'>
							<Shield className='h-8 w-8 text-blue-400' />
						</div>
						<h2 className='text-2xl font-bold text-white mb-2'>
							Securing Your Session
						</h2>
						<p className='text-gray-400 text-center mb-6'>{loadingMessage}</p>
						<div className='flex items-center justify-center'>
							<Loader2 className='h-8 w-8 text-blue-400 animate-spin' />
						</div>
					</div>
					<div className='mt-6'>
						<div className='h-1 w-full bg-blue-500/10 rounded-full overflow-hidden'>
							<div className='h-full bg-blue-500 animate-pulse rounded-full'></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return isAuthenticated ? children : null;
};

export default ProtectedRoute;
