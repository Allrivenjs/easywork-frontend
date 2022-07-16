import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import './styles/tailwind.css';

import Pusher from "pusher-js";

import App from './components/app/router'
import { ChakraProvider } from '@chakra-ui/react';

window.Pusher = Pusher;

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container as HTMLElement);

root.render(
	<ChakraProvider>
		<App />
	</ChakraProvider>
);
