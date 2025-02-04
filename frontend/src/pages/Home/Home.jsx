import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authBg from '../../assets/auth_bg.png';
import Menu from '../../components/Menu.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { setProfileURL } from '../../features/user/userSlice.js';

const Home = () => {
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
		<div
			className='h-full w-full flex flex-col items-center font-sans'
			style={{
				background: `url(${authBg}) no-repeat center center/cover`,
			}}>
			{/* Menu Section */}
			<div className='absolute top-4 left-4'>
				<Menu />
			</div>

			{/* User Profile Section */}
			<div className='absolute top-4 right-4 flex items-center gap-4'>
				<div className='flex items-center gap-4'>
					<img
						src={avatar}
						alt='User Avatar'
						className='w-12 h-12 rounded-full shadow-md'
						onClick={changePic}
					/>
					<input
						type='file'
						hidden={true}
						accept='image/*'
						ref={pic_ref}
						onChange={uploadPic}
					/>
					<div className='text-white'>
						<p className='font-bold text-lg'>{firstName + ' ' + lastName}</p>
						<button
							className='text-sm text-red-500 hover:text-red-700'
							onClick={handleLogout}>
							Logout
						</button>
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<div className='flex flex-col items-center justify-center w-full text-center mt-20'>
				<h1 className='text-white text-6xl font-bold mb-6 drop-shadow-lg'>
					Welcome to Chess Master
				</h1>
				<p className='text-white text-2xl mb-8 max-w-2xl'>
					Play, Learn, and Challenge the World. Join thousands of players today!
				</p>
				<div className='flex gap-4'>
					<button
						className='text-white text-3xl bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 
                                    px-12 py-4 rounded-full shadow-lg transform transition hover:scale-110 focus:outline-none'
						aria-label='Play Chess'>
						<Link to='/play'>Play</Link>
					</button>
					<button
						className='text-white text-3xl bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 
                                    px-12 py-4 rounded-full shadow-lg transform transition hover:scale-110 focus:outline-none'
						aria-label='Learn Chess'>
						<Link to='/learn'>Learn</Link>
					</button>
				</div>
			</div>

			{/* Featured Section */}
			<div className='w-full px-8 py-16 rounded-t-3xl mt-16'>
				<h2 className='text-white text-4xl font-bold text-center mb-8'>
					What We Offer
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{/* Card 1 */}
					<div
						style={{
							// backgroundColor: '#272522',
							backgroundColor: 'rgb(39 37 35)',
						}}
						className='bg-gray-800 p-6 rounded-lg shadow-lg text-center'>
						<img
							src='https://circlechess.com/wp-content/uploads/2024/11/istockphoto-1312101834-612x612-1.jpg'
							alt='Play Chess'
							className='mx-auto mb-4 h-72 w-96 rounded-lg'
						/>
						<h3 className='text-lg font-bold text-white mb-2'>Play Online</h3>
						<p className='text-sm text-gray-300'>
							Challenge players from around the globe in real-time matches.
						</p>
					</div>
					{/* Card 2 */}
					<div
						style={{
							// backgroundColor: '#272522',
							backgroundColor: 'rgb(39 37 35)',
						}}
						className='p-6 rounded-lg shadow-lg text-center'>
						<img
							src='https://images.unsplash.com/photo-1523875194681-bedd468c58bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlc3MlMjBzdHJhdGVnaWVzfGVufDB8fDB8fHww'
							alt='Learn Chess'
							className='mx-auto mb-4 rounded-lg h-72 w-96'
						/>
						<h3 className='text-lg font-bold text-white mb-2'>
							Learn Strategies
						</h3>
						<p className='text-sm text-gray-300'>
							Improve your skills with tutorials and puzzles.
						</p>
					</div>
					{/* Card 3 */}
					<div
						style={{
							// backgroundColor: '#272522',
							backgroundColor: 'rgb(39 37 35)',
						}}
						className=' p-6 rounded-lg shadow-lg text-center'>
						<img
							src='https://blogimage.vantagecircle.com/content/images/2023/04/Employee-leaderboard.png'
							width={500}
							height={600}
							alt='Leaderboards'
							className='mx-auto mb-4 h-72 w-96 rounded-lg'
						/>
						<h3 className='text-lg font-bold text-white mb-2'>
							Climb Leaderboards
						</h3>
						<p className='text-sm text-gray-300'>
							Show off your chess skills and rise to the top!
						</p>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer
				style={{
					// backgroundColor: '#272522',
					backgroundColor: 'rgb(29 28 26)',
				}}
				className='w-full py-6  text-white mt-8 text-center'>
				<p className='text-sm'>
					© 2024 Chess Master. All rights reserved. | Privacy Policy
				</p>
			</footer>
		</div>
	);
};

export default Home;
