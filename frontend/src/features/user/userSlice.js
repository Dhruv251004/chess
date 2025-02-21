import { createSlice } from '@reduxjs/toolkit';

const user = {
	firstName: '',
	lastName: '',
	username: '',
	email: '',
	accessToken: localStorage.getItem('accessToken') || '',
	refreshToken: localStorage.getItem('refreshToken') || '',
	isAuthenticated: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState: user,
	reducers: {
		login: (state, action) => {
			(state.firstName = action.payload.firstName),
				(state.lastName = action.payload.lastName),
				(state.username = action.payload.username),
				(state.email = action.payload.email);
			state.profilePic = action.payload.profilePic;

			if (action.payload.accessToken) {
				(state.accessToken = action.payload.accessToken),
					localStorage.setItem('accessToken', state.accessToken);
			}
			if (action.payload.refreshToken) {
				state.refreshToken = action.payload.refreshToken;
				localStorage.setItem('refreshToken', state.refreshToken);
			}

			state.isAuthenticated = true;
		},

		setProfileURL: (state, action) => {
			state.profilePic = action.payload;
		},
	},
});

export const { login, setProfileURL } = userSlice.actions;

export default userSlice.reducer;
