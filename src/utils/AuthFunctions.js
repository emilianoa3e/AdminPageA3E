import axios from "axios";
import { showSimpleAlert } from "../shared/Alerts";
import { messages } from "./Messages";

export const loginPost = async (email, password) => {
	const dataJson = {
		email,
		password,
	};

	try {
		console.log(dataJson)
		const data = await axios.post(
			 'http://localhost:3000/api/auth/signin',
			dataJson
		);
		
		
		console.log(data.data);

		return data.data;
	} catch (error) {
		const { data } = error.response;

		// console.log(data);

		if (data.message === messages.login.errorCrendentials) {
			showSimpleAlert('Error', data.message, 'error');
			return null;
		}

		if (data.message === messages.login.errorServer) {
			showSimpleAlert('Error', data.message, 'error');
			return null;
		}

		showSimpleAlert('Error', data.message, 'error');

		return null;
	}
};