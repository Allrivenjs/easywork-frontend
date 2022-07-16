import Echo from "laravel-echo";

import { config } from "../../config";

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
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
			}
		},
		enabledTransports: ['ws', 'wss'],
		disableStats: true,
		forceTLS: false,
	});
};
