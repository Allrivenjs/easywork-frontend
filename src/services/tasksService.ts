import axios, { CancelTokenSource } from "axios";

import { config } from "../config";
import { NewTask } from "../pages/CreateTask";


export const getTasks = async (source: CancelTokenSource, url: string) => {
	try {
		if (url) {
			const res = await axios.get(url, {
				cancelToken: source.token,
				headers: config.headers,
			});
			return res.data[0];
		} else {
			const res = await axios.get(`${config.API_URL}/api/tasks`, {
				cancelToken: source.token,
				headers: config.headers,
			});
			return res.data[0];
		}
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

export const createTask = async (body: NewTask) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/tasks`, body, {
			headers: config.headers,
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching course: ", err.response);
	}
};
