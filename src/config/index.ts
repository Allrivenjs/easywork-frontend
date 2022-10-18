export const config = {
	API_URL: process.env.NEXT_PUBLIC_API_URL,
	KEY: process.env.NEXT_PUBLIC_CHAT_KEY,
	WS_HOST: process.env.NEXT_PUBLIC_CHAT_WS_HOST,
	CLUSTER: process.env.NEXT_PUBLIC_CHAT_CLUSTER,
	WS_PORT: process.env.NEXT_PUBLIC_CHAT_WS_PORT,
	MERCADO_PAGO_KEY: process.env.NEXT_PUBLIC_MERCADOPAGO_KEY,
	MERCADO_PAGO_SECRET: process.env.NEXT_PUBLIC_MERCADOPAGO_SECRET,
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
