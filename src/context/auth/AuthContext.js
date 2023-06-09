import { createContext, useContext} from 'react';

export const useAuth = () => useContext(AuthContext)
const initialState = {
	isLogged: false, 
};

export const AuthContext = createContext(initialState);