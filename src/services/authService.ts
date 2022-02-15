import axios from "axios";

import { config } from "../config";

export interface LoginUserState {
	email: string;
	password: string;
}

export interface RegisterUserState {
	name: string;
	lastname: string;
	email: string;
	phone: number;
	birthday: string;
	password: string;
}

export const login = async (user: LoginUserState) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/login`, user, {
			headers: config.headers,
		});
		return res.data.access_token;
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);
	}
};

export const register = async (user: RegisterUserState) => {
	console.log(user);
	try {
		const res = await axios.post(`${config.API_URL}/api/register`, user, {
			headers: config.headers,
		});
		return res.data.access_token;
	} catch (err: any) {
		console.log("Error fetching register: ", err.response);
	}
};

export const isAuthenticated = async (token: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/user`, {
			headers: config.headersWithAuth(token),
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching isAuthenticated: ", err.response);
		return false;
	}
};

export const logout = async (token: string) => {
	try {
		await axios.get(`${config.API_URL}/api/logout`, {
			headers: config.headersWithAuth(token),
		});
	} catch (err: any) {
		console.log("Error fetching logout: ", err.response);
		return false;
	}
}
