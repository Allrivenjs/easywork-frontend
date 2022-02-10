import axios from "axios";

import { config } from "../config";

export interface UserState {
	email: string;
	password: string;
}

export const login = async (user: UserState) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/login`, user, {
			headers: config.headers,
		});
		return res.data.access_token;
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);
	}
};

export const isAuthenticated = async (token: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/user`, {
			headers: config.headersWithAuth(token),
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);
		return false;
	}
};
