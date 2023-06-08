import { createContext, useContext} from 'react';

export const useAuth = () => useContext(AuthContext)
const initialState = {
	isLogged: true, 
};

export const AuthContext = createContext(initialState);