import React from 'react';

const UserItem = ({ profilePic, firstName, lastName, username }) => {
	return (
		<div
			className='text-md p-0 flex h-full w-full rounded-lg  lg:p-2 lg:min-w-36  lg:text-4xl border-[1px] border-zinc-700 shadow-md shadow-black mt-2 mb-2 lg:mt-0 lg:mb-0'
			style={{ backgroundColor: '#2a2826' }}>
			<div className='m-1 flex justify-center items-center'>
				<img
					className='w-14 h-14 lg:w-20 lg:h-20 rounded-full'
					src={profilePic}
					alt=''
				/>
			</div>
			<div className='p-2 text-stone-300'>
				<div className='p-1 font-extrabold'>{firstName + ' ' + lastName}</div>
				<div className=' text-s lg:text-xl p-1 font-bold '>@{username}</div>
			</div>
		</div>
	);
};

export default UserItem;
