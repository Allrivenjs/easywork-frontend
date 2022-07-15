import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import './styles/tailwind.css';

import App from './components/app/router'
import { ChakraProvider } from '@chakra-ui/react';

//
// const options = {
// 	broadcaster: "pusher",
// 	key: "335ba815830fca30a899",
// 	cluster: "us2",
// 	wsHost: '192.168.1.8',
// 	wssHost: '192.168.1.8',
// 	wsPort: 6001,
// 	forceTLS: false,
// 	encrypted: false,
// 	disableStats: true,
// };
//
// const echo = new Echo(options);
//
// echo.channel('notification').listen('MessageNotification', (data) => {
// 	console.log(JSON.stringify(data));
// });


const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container as HTMLElement);

root.render(
	<ChakraProvider>
		<App />
	</ChakraProvider>
);
