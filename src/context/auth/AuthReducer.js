export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isLogged: true,				
				email: action.payload.email,
			};

		case 'LOGOUT':
			return {
				isLogged: false,			
				email: ''
			};

		case 'UPDATE_USER_DATA':
			return {
				...state,
				email: action.payload.email,
			};

		case 'IS_LOADING':
			return {
				...state,
				isLoading: action.payload,
			};

		default:
			return state;
	}
};