import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../features/user/userSlice';
import { ChevronRight as ChessKnight } from 'lucide-react';
import Spinner from '../../components/Spinner';

const Register = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [waiting, setWaiting] = useState(false);

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
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
			<div className='w-full max-w-2xl'>
				<div className='bg-black/20 backdrop-blur-sm rounded-2xl border border-white/5 p-8 shadow-xl'>
					<div className='text-center'>
						<div className='mx-auto h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center'>
							<ChessKnight className='h-8 w-8 text-blue-400' />
						</div>
						<h2 className='mt-6 text-3xl font-bold tracking-tight text-white'>
							Create Your Account
						</h2>
						<p className='mt-2 text-sm text-gray-400'>
							Join the chess community and start your journey
						</p>
					</div>

					<form
						className='mt-8 space-y-6'
						onSubmit={registerUser}>
						<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='firstName'
									className='block text-sm font-medium text-gray-300'>
									First Name
								</label>
								<div className='mt-1'>
									<input
										type='text'
										id='firstName'
										required
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className='block w-full rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
										placeholder='Enter your first name'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='lastName'
									className='block text-sm font-medium text-gray-300'>
									Last Name
								</label>
								<div className='mt-1'>
									<input
										type='text'
										id='lastName'
										required
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className='block w-full rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
										placeholder='Enter your last name'
									/>
								</div>
							</div>

							<div className='sm:col-span-2'>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-300'>
									Email
								</label>
								<div className='mt-1'>
									<input
										type='email'
										id='email'
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='block w-full rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
										placeholder='Enter your email address'
									/>
								</div>
							</div>

							<div className='sm:col-span-2'>
								<label
									htmlFor='username'
									className='block text-sm font-medium text-gray-300'>
									Username
								</label>
								<div className='mt-1'>
									<input
										type='text'
										id='username'
										required
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										className='block w-full rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
										placeholder='Choose a username'
									/>
								</div>
							</div>

							<div className='sm:col-span-2'>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-300'>
									Password
								</label>
								<div className='mt-1'>
									<input
										type='password'
										id='password'
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='block w-full rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
										placeholder='Create a strong password'
									/>
								</div>
							</div>
						</div>

						<button
							type='submit'
							disabled={waiting}
							className='flex w-full justify-center items-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors disabled:opacity-50'>
							{waiting ? <Spinner /> : 'Create Account'}
						</button>

						<p className='text-center text-sm text-gray-400'>
							Already have an account?{' '}
							<Link
								to='/login'
								className='font-medium text-blue-400 hover:text-blue-300'>
								Sign in
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
