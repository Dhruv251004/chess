import React, { useEffect, useState } from 'react';
import authBg from '../../assets/auth_bg.png';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
const Login = () => {
	// States
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [waiting, setWaiting] = useState(false);

	// store variables
	const dispatch = useDispatch();

	//utils
	const navigate = useNavigate();

	// handlers
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
			// error
			toast(data.message);
		}
		setWaiting(false);
	};

	return (
		<div
			className='flex  items-center h-screen flex-col justify-center px-6 py-12 lg:px-8 '
			style={{
				background: `url(${authBg}) no-repeat center center/cover`,
			}}>
			<div className='min-w-96 scrollbar-hidden p-12 rounded-lg bg-neutral-800 text-white border-2 border-neutral-700'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img
						className='mx-auto h-10 w-auto'
						src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600'
						alt='Your Company'
					/>
					<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-green-600'>
						Sign in to your account
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form
						className='space-y-6'
						action='#'
						method='POST'>
						<div>
							<label
								htmlFor='username'
								className='block text-sm/6 font-medium '>
								Username
							</label>
							<div className='mt-2'>
								<input
									id='username'
									name='username'
									type='text'
									autoComplete='username'
									required
									className='text-black p-1 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-slate-300 outline-none sm:text-sm/6'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm/6 font-medium '>
									Password
								</label>
								<div className='text-sm'>
									<a
										href='#'
										className='font-semibold text-green-600 hover:text-green-500'>
										Forgot password?
									</a>
								</div>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									className='text-black p-1 block w-full rounded-md border-0 py-1.5  shadow-sm  placeholder:text-gray-400 bg-slate-300 outline-none sm:text-sm/6'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 '>
							{!waiting && (
								<button
									type='submit'
									className=''
									onClick={loginUser}>
									Sign in
								</button>
							)}
							{waiting && <Spinner />}
						</div>
					</form>

					<p className='mt-10 text-center text-sm/6 text-gray-500'>
						Not a member?
						<Link
							to='/register'
							className='font-semibold text-green-600 hover:text-green-500'>
							{' '}
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
