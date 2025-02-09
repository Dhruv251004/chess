import React, { useState } from 'react';
import {
	ChevronRight as ChessKnight,
	Users,
	Trophy,
	BookOpen,
	LogOut,
	Settings,
	Crown,
	Swords,
	Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { setProfileURL } from '../../features/user/userSlice.js';

function App() {
	const username = useSelector((state) => state.user.username);
	const firstName = useSelector((state) => state.user.firstName);
	const lastName = useSelector((state) => state.user.lastName);
	const avatar = useSelector((state) => state.user.profilePic);
	const accessToken = useSelector((state) => state.user.accessToken);
	const pic_ref = useRef();
	const dispatch = useDispatch();

	const handleLogout = () => {
		console.log(avatar);
		// setIsLoggedIn(false); // Mock logout function
	};

	const changePic = () => {
		pic_ref.current.click();
	};

	const uploadPic = async () => {
		const formData = new FormData();
		formData.append('file', pic_ref.current.files[0]);
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/user/changeProfilePic/`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				body: formData,
			}
		);

		const data = await response.json();
		dispatch(setProfileURL(data.data));
		pic_ref.current.value = '';
	};
	return (
		<div className='h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden'>
			{/* Header/Navigation */}
			<header className='w-full px-6 py-4 bg-black/30 border-b border-blue-500/10'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<div className='flex items-center space-x-3'>
						<div className='bg-blue-500/10 p-2 rounded-lg'>
							<ChessKnight
								size={32}
								className='text-blue-400'
							/>
						</div>
						<span className='text-2xl font-bold text-white tracking-tight'>
							ChessMaster
						</span>
					</div>

					<div className='flex items-center space-x-8'>
						<div className='flex items-center space-x-6'>
							<button className='flex items-center space-x-2 text-gray-300 hover:text-white transition group'>
								<Crown
									size={20}
									className='group-hover:text-blue-400'
								/>
								<span>Rankings</span>
							</button>
							<button className='flex items-center space-x-2 text-gray-300 hover:text-white transition group'>
								<Settings
									size={20}
									className='group-hover:text-blue-400'
								/>
								<span>Settings</span>
							</button>
						</div>
						<div className='flex items-center space-x-4 bg-black/20 py-2 px-4 rounded-lg border border-white/5'>
							<div className='flex items-center space-x-3'>
								<div className='relative'>
									<img
										src={avatar}
										alt='Profile'
										className='w-10 h-10 rounded-full border-2 border-blue-500/30'
										onClick={changePic}
									/>
									<input
										type='file'
										hidden={true}
										accept='image/*'
										ref={pic_ref}
										onChange={uploadPic}
									/>
									<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900'></div>
								</div>
								<div className='text-sm'>
									<p className='text-white font-medium'>Alex Chen</p>
									<p className='text-blue-400'>1250 ELO</p>
								</div>
							</div>
							<button
								className='text-red-400 hover:text-red-300 transition flex items-center space-x-1 ml-4'
								onClick={handleLogout}>
								<LogOut size={18} />
								<span>Logout</span>
							</button>
						</div>
					</div>
				</div>
			</header>

			<main className='h-[calc(100vh-theme(spacing.24))] flex items-center px-6'>
				<div className='max-w-7xl mx-auto w-full grid grid-cols-12 gap-12'>
					{/* Left Column - Hero & Stats */}
					<div className='col-span-5 space-y-8'>
						<div className='space-y-6'>
							<h1 className='text-6xl font-bold text-white leading-tight'>
								Your Next Move <br />
								<span className='text-blue-400'>Awaits</span>
							</h1>
							<p className='text-lg text-gray-300'>
								Join the global chess community. Challenge players, improve your
								strategy, and climb the rankings.
							</p>
							<button className='bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-600 transition transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20 w-fit flex items-center space-x-2'>
								<Swords size={20} />
								<Link to='/play'>
									<span>Play Now</span>
								</Link>
							</button>
						</div>

						{/* Stats Cards */}
						<div className='grid grid-cols-2 gap-4'>
							<div className='bg-black/20 rounded-xl p-6 border border-white/5'>
								<div className='flex items-center space-x-4'>
									<div className='bg-blue-500/10 p-3 rounded-lg'>
										<Target className='text-blue-400 w-8 h-8' />
									</div>
									<div>
										<p className='text-2xl font-bold text-white'>67%</p>
										<p className='text-sm text-gray-400'>Win Rate</p>
									</div>
								</div>
							</div>
							<div className='bg-black/20 rounded-xl p-6 border border-white/5'>
								<div className='flex items-center space-x-4'>
									<div className='bg-blue-500/10 p-3 rounded-lg'>
										<Trophy className='text-blue-400 w-8 h-8' />
									</div>
									<div>
										<p className='text-2xl font-bold text-white'>#234</p>
										<p className='text-sm text-gray-400'>Global Rank</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Game Modes */}
					<div className='col-span-7 grid grid-cols-2 gap-6'>
						{/* Quick Match Card */}
						<div className='group bg-black/20 rounded-xl p-8 hover:bg-black/30 transition cursor-pointer border border-white/5 hover:border-blue-500/20'>
							<div className='flex flex-col h-full'>
								<div className='bg-blue-500/10 p-4 rounded-lg w-fit mb-6 group-hover:bg-blue-500/20 transition'>
									<Users className='w-8 h-8 text-blue-400' />
								</div>
								<h3 className='text-xl font-bold text-white mb-3'>
									Quick Match
								</h3>
								<p className='text-gray-400 text-sm mb-6 flex-grow'>
									Find an opponent at your skill level and start playing
									instantly.
								</p>
								<div className='flex items-center text-blue-400 text-sm font-medium'>
									Play Now
									<ChessKnight
										size={16}
										className='ml-2 group-hover:translate-x-1 transition-transform'
									/>
								</div>
							</div>
						</div>

						{/* Learn Card */}
						<div className='group bg-black/20 rounded-xl p-8 hover:bg-black/30 transition cursor-pointer border border-white/5 hover:border-blue-500/20'>
							<div className='flex flex-col h-full'>
								<div className='bg-blue-500/10 p-4 rounded-lg w-fit mb-6 group-hover:bg-blue-500/20 transition'>
									<BookOpen className='w-8 h-8 text-blue-400' />
								</div>
								<h3 className='text-xl font-bold text-white mb-3'>
									Learn & Practice
								</h3>
								<p className='text-gray-400 text-sm mb-6 flex-grow'>
									Master chess strategies with interactive lessons and puzzles.
								</p>
								<div className='flex items-center text-blue-400 text-sm font-medium'>
									Start Learning
									<ChessKnight
										size={16}
										className='ml-2 group-hover:translate-x-1 transition-transform'
									/>
								</div>
							</div>
						</div>

						{/* Recent Activity */}
						<div className='col-span-2 bg-black/20 rounded-xl p-6 border border-white/5'>
							<h3 className='text-lg font-semibold text-white mb-4'>
								Recent Activity
							</h3>
							<div className='space-y-4'>
								<div className='flex items-center justify-between text-sm'>
									<div className='flex items-center space-x-3'>
										<div className='w-2 h-2 bg-green-500 rounded-full'></div>
										<span className='text-gray-300'>
											Won against Magnus_Fan
										</span>
									</div>
									<span className='text-gray-500'>2 hours ago</span>
								</div>
								<div className='flex items-center justify-between text-sm'>
									<div className='flex items-center space-x-3'>
										<div className='w-2 h-2 bg-red-500 rounded-full'></div>
										<span className='text-gray-300'>Lost to ChessWizard</span>
									</div>
									<span className='text-gray-500'>5 hours ago</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className='absolute bottom-0 w-full py-3 bg-black/30 border-t border-blue-500/10'>
				<div className='max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm'>
					<p>© 2024 ChessMaster. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
