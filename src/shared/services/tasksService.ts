import axios, { CancelTokenSource } from "axios";
import { NewTask } from "../../components/task/components/Create";

import { config } from "../../config";

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

export const getTasks = async (token: string, source: CancelTokenSource, url: string) => {
	try {
		if (url) {
			const res = await axios.get(url, {
				cancelToken: source.token,
				headers: config.headersWithAuth(token),
			});
			return res.data;
		} else {
			const res = await axios.get(`${config.API_URL}/api/tasks`, {
				cancelToken: source.token,
				headers: config.headersWithAuth(token),
			});
			return res.data;
		}
	} catch (err: any) {
		console.log("Error fetching tags: ", err.response);
	}
};

export const getTaskBySlug = async (token: string, slug: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/tasks/${slug}`, {
			headers: config.headersWithAuth(token),
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching task: ", err.response);
	}
};

export const createTask = async (token: string, body: NewTask) => {
	try {
		const fd = new FormData();
		fd.append('name', body.name);
		fd.append('description', body.description);
		fd.append('difficulty', body.difficulty);

		fd.append('topics', JSON.stringify(body.topics));


		if(body.files) {
			for (let i = 0; i < body.files.length; i++) {
				fd.append('files[]', body.files[i], body.files[i].name);
			}
		}

		const res = await axios.post(`${config.API_URL}/api/tasks`, fd, {
			headers: config.headersWithAuth(token),
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching course: ", err.response);
	}
};

export const getTasksByUser = async (token: string, source: CancelTokenSource) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/getAllMeTask`, {
			cancelToken: source.token,
			headers: config.headersWithAuth(token),
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching tasks by user: ", err.response);
	}
};

export const deleteTask = async (token: string, source: CancelTokenSource, taskid: string) => {
	try {
		const res = await axios.delete(`${config.API_URL}/api/task/${taskid}`, {
			cancelToken: source.token,
			headers: config.headersWithAuth(token),
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching tasks by user: ", err.response);
	}
};
