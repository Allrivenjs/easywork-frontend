import { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../src/context/AuthContext';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</ChakraProvider>
	);
};

export default App;
