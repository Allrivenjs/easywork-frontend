import axios, { CancelTokenSource } from "axios";

import { config } from "../../config";

export const getUserWithSlug = async (source: CancelTokenSource, slug: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/profile/${slug}`, {
			cancelToken: source.token,
			headers: config.headers,
		});
		console.log(res);
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching getUserWithSlug: ", err.response);
		return null;
	}
};
