import axios from 'axios';
import Cookies from 'universal-cookie';

import { config } from '../../config';

const cookies = new Cookies();

const axiosClient = axios.create({
	baseURL: `${config.API_URL}/api/`,
	headers: config.headers,
});

axiosClient.interceptors.request.use((config) => {
	const token = cookies.get('user-token');

	if (token) {
		config.headers!['Authorization'] = `Bearer ${token}`;
	};

	return config;
	}, (error) => {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use((config) => {
		return config;
	}, (error) => {
		return Promise.reject(error);
	}
);

export { axiosClient };
