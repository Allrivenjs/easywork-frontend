import React from 'react'
import ReactDOM from 'react-dom'

import './styles/tailwind.css';
import './styles/anim.css';

import App from './routes'
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
	<ChakraProvider>
		<App />
	</ChakraProvider>,
	document.getElementById('root')
)
