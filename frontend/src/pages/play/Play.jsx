import homeBg from '../../assets/auth_bg.png';
import ChessBoard from '../../components/ChessBoard.jsx';
import UserItem from './UserItem.jsx';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import WaitingScreen from './WaitingScreen.jsx';

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

	const [moves, setMoves] = useState([]);

	const addMove = (move) => {
		setMoves((prevMoves) => [...prevMoves, move]);
	};

	return (
		<div
			className='flex pt-10 lg:pt-0 lg:items-center h-screen w-screen justify-center'
			style={{
				background: `url(${homeBg}) no-repeat center center/cover`,
			}}>
			<div className='flex w-fit h-fit gap-4 '>
				<div className='md:flex justify-center items-center h-fit w-fit flex-col'>
					{!waiting && (
						<div className='lg:hidden w-full block'>
							<UserItem
								firstName={opponentFirstName}
								lastName={opponentLastName}
								profilePic={opponentProfilePic}
								username={opponentUsername}
							/>
						</div>
					)}
					<div>
						<ChessBoard
							waiting={waiting}
							setWaiting={setWaiting}
							setOpponentInfo={setOpponentInfo}
							addMove={addMove}
						/>
					</div>
					{!waiting && (
						<div className='w-full lg:hidden block'>
							<UserItem
								firstName={firstName}
								lastName={lastName}
								username={username}
								profilePic={profilePic}
							/>
						</div>
					)}
				</div>

				{!waiting && (
					<div className='hidden lg:flex w-fit flex-col'>
						<div className='md:flex justify-center items-center h-fit min-w-52'>
							<UserItem
								firstName={opponentFirstName}
								lastName={opponentLastName}
								profilePic={opponentProfilePic}
								username={opponentUsername}
							/>
						</div>
						<div className='grid grid-cols-2 gap-4 border-zinc-700   rounded-lg  mt-4 mb-4 flex-grow overflow-y-scroll overflow-x-hidden scrollbar-hide h-[372px]'>
							{moves.map((move, index) => (
								<div
									key={index}
									className='text-white text-center py-2 px-4 rounded-md h-fit'
									style={{ backgroundColor: 'rgb(29 28 27)' }}>
									{index + 1}. {move}
								</div>
							))}
						</div>

						<div className='md:flex justify-center items-center h-fit min-w-52  mt-auto'>
							<UserItem
								firstName={firstName}
								lastName={lastName}
								username={username}
								profilePic={profilePic}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Play;
