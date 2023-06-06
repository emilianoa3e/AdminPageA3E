import { createContext } from 'react';

const initialState = {
	isLogged: false, 
};

export const AuthContext = createContext(initialState);