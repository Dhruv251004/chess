import React from 'react';

const UserItem = ({ profilePic, firstName, lastName, username }) => {
	return (
		<div
			className='flex w-full rounded-lg  p-4 lg:min-w-36 text-xl h-fit lg:text-4xl border-[1px] border-zinc-700 shadow-md shadow-black'
			style={{ backgroundColor: '#2a2826' }}>
			<div className='m-1 flex justify-center items-center'>
				<img
					className='w-20 h-20 rounded-full'
					src={profilePic}
					alt=''
				/>
			</div>
			<div className='p-2 text-stone-300'>
				<div className='p-1 font-extrabold'>{firstName + ' ' + lastName}</div>
				<div className='text-xl p-1 font-bold '>@{username}</div>
			</div>
		</div>
	);
};

export default UserItem;
