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
		return {
			ok: true,
			token: res.data.access_token,
			user: res.data.user,
		};
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);

		// TODO: hacer algo para manejar cuando vengan más de un error

		return {
			ok: false,
			msg: err.response.data?.message
		};
	}
};

export const register = async (user: RegisterUserState) => {
	try {
		const res = await axiosClient.post(`register`, user);
		return {
			ok: true,
			token: res.data.access_token,
			user: res.data.user,
		};
	} catch (err: any) {
		console.log("Error fetching register: ", err.response);

		// TODO: hacer algo para manejar cuando vengan más de un error

		return {
			ok: false,
			msg: err.response.data?.message
		};
	}
};

export const isAuthenticated = async () => {
	try {
		const res = await axiosClient.get(`user`);
		return {
			ok: true,
			user: res.data[0],
		};
	} catch (err: any) {
		console.log("Error fetching isAuthenticated: ", err.response);
		console.log(err);
		return {
			ok: false,
			//msg: err.response.data.message,
		}
	}
};

export const logout = async () => {
	try {
		const res = await axiosClient.get(`logout`);
		return {
			ok: true,
			msg: res,
		};
	} catch (err: any) {
		console.log("Error fetching logout: ", err.response);
		return {
			ok: false,
		};
	}
};
