import axios from 'axios';
import { messages } from './messages';

export const loginPost = async (email, password) => {
	const dataJson = {
		 email,
		password,
	};

	try {
		const data = await axios.post(
			 'http://localhost:3000/api/auth/singin',
			dataJson
		);
		return data.data;
	} catch (error) {
		const { data } = error.response;

		// console.log(data);

		if (data.message === messages.login.errorCrendentials) {
			console.log('error', data.message)
			return null;
		}

		if (data.message === messages.login.errorServer) {
			console.log('error', data.message)
			return null;
		}

		console.log('error', data.message)

		return null;
	}
};