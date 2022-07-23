import axios from "axios";
import { INewComment } from "../../components/task/components/interface";

import { config } from "../../config";

export const getComments = async (token: string, taskid: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/getComments?task_id=${taskid}`, {
			headers: config.headersWithAuth(token),
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching comments: ", err.response);
	}
};

export const sendNewComment = async (token: string, newComment: INewComment) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/comment`, newComment, {
			headers: config.headersWithAuth(token),
		});
		return res;
	} catch (err: any) {
		console.log("Error fetching comments: ", err.response);
	}
};
