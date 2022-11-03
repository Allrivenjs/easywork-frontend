import { axiosClient } from './axiosClient';

import { IProfileInformation, IUserInformation } from '../../store/auth';

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

export const updateUser = async (editedUser: IUserInformation) => {
	try {
		const res = await axiosClient.post(`user/update`, editedUser );
		return {
			ok: true,
			res,
		};
	} catch (err: any) {
		console.log('Error fetching comments: ', err.response);
		return {
			ok: false,
			msg: err.response.data?.message,
		};
	}
};

export const updateProfile = async (editedProfile: IProfileInformation) => {
	try {
		const res = await axiosClient.post(`profile/update`, editedProfile);
		return {
			ok: true,
			res,
		};
	} catch (err: any) {
		console.log('Error fetching comments: ', err.response);
		return {
			ok: false,
			msg: err.response.data?.message,
		};
	}
};
