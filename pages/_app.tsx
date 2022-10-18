import { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { ChakraProvider } from '@chakra-ui/react';

import { CheckAuthLayout } from '../src/layouts';

//import { AuthProvider } from '../src/context/AuthContext';

import { store } from '../src/store';

const App = ({ Component, pageProps }: AppProps)=> {
	return (
		<ChakraProvider>
			{/*
				*<AuthProvider>
				*/}
				<Provider store={store}>
					<CheckAuthLayout>
						<Component {...pageProps} />
					</CheckAuthLayout>
				</Provider>
			{/*
				*</AuthProvider>
				*/}
		</ChakraProvider>
	);
};

export default App;
