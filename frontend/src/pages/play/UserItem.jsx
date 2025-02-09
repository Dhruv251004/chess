import React from 'react';
import { Clock, Crown, MessageSquare } from 'lucide-react';

const UserItem = ({
	firstName,
	lastName,
	username,
	profilePic,
	time,
	rating = 1500,
	status = 'online',
}) => {
	return (
		<div className='bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all hover:bg-black/30 group z-0'>
			<div className='flex items-center justify-between mb-4'>
				<div className='flex items-center space-x-4'>
					<div className='relative'>
						<div className='w-14 h-14 rounded-xl border-2 border-blue-500/30 p-0.5 transition-transform group-hover:scale-105'>
							<img
								src={profilePic}
								alt={`${firstName} ${lastName}`}
								className='w-full h-full rounded-lg object-cover'
							/>
						</div>
						<div
							className={`absolute -bottom-1 -right-1 w-4 h-4 ${
								status === 'online' ? 'bg-green-500' : 'bg-gray-500'
							} rounded-full border-2 border-gray-900 ring-2 ring-blue-500/10`}></div>
					</div>
					<div>
						<div className='flex items-center gap-2'>
							<h3 className='text-white font-medium group-hover:text-blue-400 transition-colors'>
								{`${firstName} ${lastName}`}
							</h3>
							{rating > 2000 && <Crown className='w-4 h-4 text-yellow-400' />}
						</div>
						<p className='text-gray-400 text-sm'>@{username}</p>
					</div>
				</div>
				<button className='p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors'>
					<MessageSquare className='w-5 h-5 text-blue-400' />
				</button>
			</div>

			<div className='space-y-3'>
				<div className='bg-blue-500/5 p-4 rounded-lg flex items-center justify-between group-hover:bg-blue-500/10 transition-all border border-blue-500/5 group-hover:border-blue-500/10'>
					<div className='flex items-center gap-2'>
						<Clock className='w-5 h-5 text-blue-400' />
						<span className='text-gray-400 text-sm'>Time Played</span>
					</div>
					<span className='font-mono text-lg text-white group-hover:text-blue-400 transition-colors'>
						{time}
					</span>
				</div>

				<div className='bg-blue-500/5 px-4 py-2 rounded-lg flex items-center justify-between group-hover:bg-blue-500/10 transition-all border border-blue-500/5 group-hover:border-blue-500/10'>
					<span className='text-gray-400 text-sm'>Rating</span>
					<span className='font-mono text-white group-hover:text-blue-400 transition-colors'>
						{rating}
					</span>
				</div>
			</div>

			<div className='mt-4 flex justify-end'>
				<button className='text-sm text-blue-400 hover:text-blue-300 transition-colors'>
					View Profile →
				</button>
			</div>
		</div>
	);
};

export default UserItem;
