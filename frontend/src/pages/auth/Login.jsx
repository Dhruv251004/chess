import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../features/user/userSlice';
import { ChevronRight as ChessKnight } from 'lucide-react';
import Spinner from '../../components/Spinner';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [waiting, setWaiting] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loginUser = async (e) => {
		e.preventDefault();
		const baseUrl = import.meta.env.VITE_API_URL;
		setWaiting(true);
		const response = await fetch(`${baseUrl}/user/login/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		let data = await response.json();

		if (data.status === 'success') {
			data = data.data;
			dispatch(
				login({
					firstName: data.first_name,
					lastName: data.last_name,
					username: data.username,
					email: data.email,
					accessToken: data.access,
					refreshToken: data.refresh,
					profilePic: data.profile_pic,
				})
			);
			toast('Logged in successfully');
			navigate('/');
		} else {
			toast(data.message);
		}
		setWaiting(false);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
			<div className='w-full max-w-md'>
				<div className='bg-black/20 backdrop-blur-sm rounded-2xl border border-white/5 p-8 shadow-xl'>
					<div className='text-center'>
						<div className='mx-auto h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center'>
							<ChessKnight className='h-8 w-8 text-blue-400' />
						</div>
						<h2 className='mt-6 text-3xl font-bold tracking-tight text-white'>
							Welcome Back
						</h2>
						<p className='mt-2 text-sm text-gray-400'>
							Sign in to continue your chess journey
						</p>
					</div>

					<form
						className='mt-8 space-y-6'
						onSubmit={loginUser}>
						<div className='space-y-5'>
							<div>
								<label
									htmlFor='username'
									className='block text-sm font-medium text-gray-300'>
									Username
								</label>
								<div className='mt-1'>
									<input
										id='username'
										name='username'
										type='text'
										required
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										className='block w-full rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
										placeholder='Enter your username'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-300'>
									Password
								</label>
								<div className='mt-1'>
									<input
										id='password'
										name='password'
										type='password'
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='block w-full rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
										placeholder='Enter your password'
									/>
								</div>
							</div>
						</div>

						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<input
									id='remember-me'
									name='remember-me'
									type='checkbox'
									className='h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
								/>
								<label
									htmlFor='remember-me'
									className='ml-2 block text-sm text-gray-300'>
									Remember me
								</label>
							</div>

							<div className='text-sm'>
								<a
									href='#'
									className='font-medium text-blue-400 hover:text-blue-300'>
									Forgot password?
								</a>
							</div>
						</div>

						<button
							type='submit'
							disabled={waiting}
							className='flex w-full justify-center items-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors disabled:opacity-50'>
							{waiting ? <Spinner /> : 'Sign in'}
						</button>

						<p className='text-center text-sm text-gray-400'>
							Not a member yet?{' '}
							<Link
								to='/register'
								className='font-medium text-blue-400 hover:text-blue-300'>
								Create an account
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
