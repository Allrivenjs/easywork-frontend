export const config = {
	API_URL: import.meta.env.VITE_API_URL,
	KEY: import.meta.env.VITE_CHAT_KEY,
	WS_HOST: import.meta.env.VITE_CHAT_WS_HOST,
	CLUSTER: import.meta.env.VITE_CHAT_CLUSTER,
	WS_PORT: import.meta.env.VITE_CHAT_WS_PORT,
	MERCADO_PAGO_KEY: import.meta.env.VITE_MERCADOPAGO_KEY,
	MERCADO_PAGO_SECRET: import.meta.env.VITE_MERCADOPAGO_SECRET,
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
	headersWithAuth(token: string) {
		return {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	},
};
