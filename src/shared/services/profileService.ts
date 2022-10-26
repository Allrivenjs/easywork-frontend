import axios from 'axios';

import { IEditedProfile, IEditedUser } from '../../components/profile/interface';

import { config } from '../../config';

import { axiosClient } from './axiosClient';

export const getUserWithSlug = async (slug: string) => {
	try {
		const res = await axiosClient.get(`profile/${slug}`);
		return {
			ok: true,
			profile: res.data[0],
		};
	} catch (err: any) {
		console.log('Error fetching getUserWithSlug: ', err.response);
		return {
			ok: false,
			msg: err.response.data?.message,
		};
	}
};

export const updateUser = async (token: string, editedUser: IEditedUser) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/user/update`, editedUser, {
			headers: config.headersWithAuth(token),
		});
		return res;
	} catch (err: any) {
		console.log('Error fetching comments: ', err.response);
	}
};

export const updateProfile = async (token: string, editedProfile: IEditedProfile) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/profile/update`, editedProfile, {
			headers: config.headersWithAuth(token),
		});
		return res;
	} catch (err: any) {
		console.log('Error fetching comments: ', err.response);
	}
};
