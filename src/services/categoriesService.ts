import axios from "axios";

import { config } from "../config";


export const getCategories = async () => {
	try {
		const res = await axios.get(`${config.API_URL}/api/topics`, {
			headers: config.headers,
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching tags: ", err.response);
	}
};

export const getCourse = async (slug: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/courses/${slug}`, {
			headers: config.headers,
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching course: ", err.response);
	}
};
