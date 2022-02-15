import axios from "axios";

import { config } from "../config";


export const getCourses = async () => {
	try {
		const res = await axios.get(`${config.API_URL}/api/courses`, {
			headers: config.headers,
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching courses: ", err.response);
	}
};