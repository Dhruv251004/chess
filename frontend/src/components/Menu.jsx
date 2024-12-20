import React from 'react';
import logo from '../assets/logo.png';

const Menu = () => {
	return (
		<div
			className='h-full w-44 rounded-lg'
			style={{ backgroundColor: '#2a2826' }}>
			<div
				className='w-full h-20 text-white'
				style={{
					background: `url(${logo}) no-repeat center center/cover`,
				}}></div>
		</div>
	);
};

export default Menu;
