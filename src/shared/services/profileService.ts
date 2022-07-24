import axios, { CancelTokenSource } from "axios";
import { IEditedProfile, IEditedUser } from "../../components/profile/interface";

import { config } from "../../config";

export const getUserWithSlug = async (source: CancelTokenSource, slug: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/profile/${slug}`, {
			cancelToken: source.token,
			headers: config.headers,
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching getUserWithSlug: ", err.response);
		return null;
	}
};

export const updateUser = async (token: string, editedUser: IEditedUser) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/user/update`, editedUser, {
			headers: config.headersWithAuth(token),
		});
		return res;
	} catch (err: any) {
		console.log("Error fetching comments: ", err.response);
	}
};

export const updateProfile = async (token: string, editedProfile: IEditedProfile) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/profile/update`, editedProfile, {
			headers: config.headersWithAuth(token),
		});
		return res;
	} catch (err: any) {
		console.log("Error fetching comments: ", err.response);
	}
};
