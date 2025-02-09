import React, { useEffect, useState } from 'react';
import { Send, MessageSquare, Smile, ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { use } from 'react';

const Chat = ({ isOpen, onClose, socket }) => {
	const username = useSelector((state) => state.user.username);

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (!message.trim()) return;

		const newMessage = {
			username: username,
			text: message,
			time: new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			}),
		};

		socket.send(JSON.stringify({ chat: newMessage }));
		setMessage('');
	};

	const addMessage = (msg) => {
		msg.id = Math.random();
		msg.sender = msg.username === username ? 'user' : 'opponent';
		setMessages((prevMessages) => [...prevMessages, msg]);
	};
	useEffect(() => {
		if (!socket) return;

		const handleMessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('Received message:', data);
			if (data.chat) {
				addMessage(data.chat);
			}
		};

		socket.addEventListener('message', handleMessage);

		// Cleanup: Remove listener when component unmounts
		return () => {
			socket.removeEventListener('message', handleMessage);
		};
	}, [socket]);

	return (
		<div
			className={`fixed bottom-0 right-6 w-80 transform transition-transform duration-300 ${
				isOpen ? 'translate-y-0' : 'translate-y-full'
			}`}>
			{/* Chat Header */}
			<div className='flex items-center justify-between bg-gray-900/95 backdrop-blur-sm p-4 rounded-t-xl border-t border-l border-r border-blue-500/20'>
				<div className='flex items-center gap-2'>
					<MessageSquare className='w-5 h-5 text-blue-400' />
					<h3 className='font-medium text-white'>Game Chat</h3>
				</div>
				<button
					onClick={onClose}
					className='p-1 hover:bg-blue-500/10 rounded-lg transition-colors'>
					<ChevronDown className='w-5 h-5 text-blue-400' />
				</button>
			</div>

			{/* Chat Messages */}
			<div className='bg-gray-900/95 backdrop-blur-sm border-l border-r border-blue-500/20 h-96 overflow-y-auto'>
				<div className='p-4 space-y-4'>
					{messages.map((msg) => (
						<div
							key={msg.id}
							className={`flex ${
								msg.sender === 'user' ? 'justify-end' : 'justify-start'
							}`}>
							<div
								className={`max-w-[80%] ${
									msg.sender === 'user'
										? 'bg-blue-500/20 text-white'
										: 'bg-gray-800/50 text-gray-200'
								} rounded-2xl px-4 py-2`}>
								<div className='flex items-center gap-2 mb-1'>
									<span
										className={`text-xs font-medium ${
											msg.sender === 'user' ? 'text-blue-400' : 'text-gray-400'
										}`}>
										{msg.username}
									</span>
									<span className='text-xs text-gray-500'>{msg.time}</span>
								</div>
								<p className='text-sm'>{msg.text}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Chat Input */}
			<form
				onSubmit={handleSendMessage}
				className='bg-gray-900/95 backdrop-blur-sm p-4 border border-blue-500/20 rounded-b-xl'>
				<div className='flex items-center gap-2'>
					<button
						type='button'
						className='p-2 hover:bg-blue-500/10 rounded-lg transition-colors'>
						<Smile className='w-5 h-5 text-blue-400' />
					</button>
					<input
						type='text'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder='Type a message...'
						className='flex-1 bg-blue-500/5 text-white placeholder-gray-500 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500/50'
					/>
					<button
						type='submit'
						disabled={!message.trim()}
						className='p-2 hover:bg-blue-500/10 rounded-lg transition-colors disabled:opacity-50'>
						<Send className='w-5 h-5 text-blue-400' />
					</button>
				</div>
			</form>
		</div>
	);
};

export default Chat;
