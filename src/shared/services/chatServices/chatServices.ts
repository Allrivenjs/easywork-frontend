import axios from "axios";
import Echo from "laravel-echo";
import { ISendMessage } from "../../../components/chat/interfaces";

import { config } from "../../../config";

export const getChatConnection = (token: string): Echo =>  {
	return new Echo({
		broadcaster: "pusher",
		key: config.KEY,
		wsHost: config.WS_HOST,
		cluster: config.CLUSTER,
		wsPort: config.WS_PORT,
		authEndpoint: `${config.API_URL}/api/broadcasting/auth`,
		auth: {
			headers: {
				Authorization: `Bearer ${token}`
			}
		},
		enabledTransports: ['ws'],
		disableStats: true,
		forceTLS: false,
	});
};

export const getRoomOrCreate = async (token: string, receiver_id: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/chat/exist-room-or-create?receiver_id=${receiver_id}`, {
			headers: config.headersWithAuth(token),
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching chat rooms: ", err.response);
	}
};

export const getMyRooms = async (token: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/get-my-rooms`, {
			headers: config.headersWithAuth(token),
		});
		return res.data.rooms;
	} catch (err: any) {
		console.log("Error fetching chat rooms: ", err.response);
	}
};

export const getMessages = async (token: string, room_id: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/chat/message/${room_id}`, {
			headers: config.headersWithAuth(token),
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching chat rooms: ", err.response);
	}
};

export const sendMessage = async (token: string, newMessage: ISendMessage) => {
	try {
		await axios.post(`${config.API_URL}/api/chat/send-message`, newMessage, {
			headers: config.headersWithAuth(token),
		});
	} catch (err: any) {
		console.log("Error fetching course: ", err.response);
	}
};
