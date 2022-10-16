import { axiosClient } from './';

export interface LoginUserState {
	email: string;
	password: string;
};

export interface RegisterUserState {
	name: string;
	lastname: string;
	email: string;
	phone: number;
	birthday: string;
	password: string;
};

export const login = async (user: LoginUserState) => {
	try {
		const res = await axiosClient.post('login', user);
		return res.data.access_token;
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);
	}
};

export const register = async (user: RegisterUserState) => {
	try {
		const res = await axiosClient.post(`register`, user);
		return res.data.access_token;
	} catch (err: any) {
		console.log("Error fetching register: ", err.response);
	}
};

export const isAuthenticated = async () => {
	try {
		const res = await axiosClient.get(`user`);
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching isAuthenticated: ", err.response);
		return false;
	}
};

export const logout = async () => {
	try {
		await axiosClient.get(`logout`);
	} catch (err: any) {
		console.log("Error fetching logout: ", err.response);
		return false;
	}
};
