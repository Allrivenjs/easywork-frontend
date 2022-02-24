import axios, { CancelTokenSource } from "axios";

import { config } from "../config";


export const getCourses = async (source: CancelTokenSource) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/courses`, {
			cancelToken: source.token,
			headers: config.headers,
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching courses: ", err.response);
	}
};

export const getCourse = async (source: CancelTokenSource, slug: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/courses/${slug}`, {
			headers: config.headers,
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching course: ", err.response);
	}
};
