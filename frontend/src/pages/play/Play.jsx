import homeBg from '../../assets/auth_bg.png';
import ChessBoard from '../../components/ChessBoard.jsx';
import UserItem from './UserItem.jsx';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Play = () => {
	const [waiting, setWaiting] = useState(true);

	const firstName = useSelector((state) => state.user.firstName);
	const lastName = useSelector((state) => state.user.lastName);
	const username = useSelector((state) => state.user.username);
	const profilePic = useSelector((state) => state.user.profilePic);

	// oppoent info
	const [opponentUsername, setOpponentUsername] = useState('');
	const [opponentProfilePic, setOpponentProfilePic] = useState('');
	const [opponentFirstName, setOpponentFirstName] = useState('');
	const [opponentLastName, setOpponentLastName] = useState('');

	const setOpponentInfo = (opponent) => {
		setOpponentUsername(opponent.username);
		setOpponentProfilePic(opponent.profile_pic);
		setOpponentFirstName(opponent.first_name);
		setOpponentLastName(opponent.last_name);
	};

	return (
		<div
			className='flex pt-10 lg:pt-0 lg:items-center h-screen w-screen justify-center'
			style={{
				background: `url(${homeBg}) no-repeat center center/cover`,
			}}>
			{/* <div className='flex items-center justify-center h-screen w-[100%]'> */}
			<div className='flex w-fit h-fit gap-4 '>
				<div className='md:flex justify-center items-center h-fit w-fit'>
					<ChessBoard
						waiting={waiting}
						setWaiting={setWaiting}
						setOpponentInfo={setOpponentInfo}
					/>
				</div>

				<div className='hidden lg:flex w-fit flex-col justify-between  '>
					<div className='md:flex justify-center items-center h-fit min-w-52'>
						<UserItem
							firstName={opponentFirstName}
							lastName={opponentLastName}
							profilePic={opponentProfilePic}
							username={opponentUsername}
						/>
					</div>
					<div className='md:flex justify-center items-center h-fit min-w-52'>
						<UserItem
							firstName={firstName}
							lastName={lastName}
							username={username}
							profilePic={profilePic}
						/>
					</div>
				</div>
			</div>
			{/* {!waiting && (
						<div className='hidden text-white text-5xl lg:flex flex-col h-full pt-8 pb-8 m-8'> */}
			{/* <div className='mb-auto rounded-full'>
								<UserItem
									firstName={opponentFirstName}
									lastName={opponentLastName}
									profilePic={opponentProfilePic}
									username={opponentUsername}
								/>
							</div>
							<div className='items-end '>
								<UserItem
									firstName={firstName}
									lastName={lastName}
									username={username}
									profilePic={profilePic}
								/>
							</div> */}
			{/* </div> */}
			{/* )} */}
			{/* </div> */}
			{/* </div> */}
		</div>
	);
};

export default Play;
