import React, { useEffect, useState } from 'react';
import authBg from '../../assets/auth_bg.png';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const Register = () => {
	// State variables
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [waiting, setWaiting] = useState(false);

	// utils
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const registerUser = async (e) => {
		e.preventDefault();

		setWaiting(true);
		const baseUrl = import.meta.env.VITE_API_URL;
		const response = await fetch(`${baseUrl}/user/register/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				username,
				email,
				password,
			}),
		});

		let data = await response.json();
		console.log(data);
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

			navigate('/');
		} else {
			toast(data.errors);
		}
		setWaiting(false);
	};

	return (
		<div>
			<div
				className='flex  items-center h-screen flex-col justify-center px-6 py-12 lg:px-8 '
				style={{
					background: `url(${authBg}) no-repeat center center/cover`,
				}}>
				<div className='w-fit overflow-auto scrollbar-hidden pl-12 pr-12 pt-6 pb-6 rounded-lg bg-neutral-800 text-white border-2 border-neutral-700'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<img
							className='mx-auto h-10 w-auto'
							src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600'
							alt='Your Company'
						/>
						<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-green-600'>
							Create a new account
						</h2>
					</div>

					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
						<form className='space-y-6'>
							<div className='flex gap-4'>
								<div>
									<label
										htmlFor='username'
										className='block text-sm/6 font-medium '>
										First Name
									</label>
									<div className='mt-2'>
										<input
											id='firstName'
											name='firstName'
											type='text'
											autoComplete='firstName'
											required
											className='bg-slate-300 text-black p-1 block w-full rounded-md border-0 py-1.5  shadow-sm  placeholder:text-gray-400 sm:text-sm/6 outline-none'
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor='lastName'
										className='block text-sm/6 font-medium '>
										Last Name
									</label>
									<div className='mt-2'>
										<input
											id='lastName'
											name='lastName'
											type='text'
											autoComplete='lastName'
											required
											className='bg-slate-300 outline-none text-black p-1 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6'
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</div>
								</div>
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-sm/6 font-medium '>
									Email
								</label>
								<div className='mt-2'>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										required
										className='bg-slate-300 outline-none text-black p-1 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm/6'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>

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
										className='bg-slate-300 outline-none text-black p-1 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6'
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
								</div>
								<div className='mt-2'>
									<input
										id='password'
										name='password'
										type='password'
										autoComplete='current-password'
										required
										className='bg-slate-300 outline-none text-black p-1 block w-full rounded-md border-0 py-1.5  shadow-sm  placeholder:text-gray-400  sm:text-sm/6'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</div>

							<div className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 '>
								{!waiting && (
									<button
										type='submit'
										onClick={registerUser}>
										Register
									</button>
								)}
								{waiting && <Spinner />}
							</div>
						</form>

						<p className='mt-10 text-center text-sm/6 text-gray-500'>
							Already have an account?
							<Link
								to='/register'
								className='font-semibold text-green-600 hover:text-green-500'>
								{' '}
								Log in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
