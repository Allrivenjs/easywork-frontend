import { FC, ReactNode } from 'react';

import ChatRoot from '../../chat';
import Footer from './Footer';
import { Navbar } from './Navbar';

interface props {
	children: ReactNode;
}

export const Layout: FC<props> = ({ children }) => {
	return (
		<>
			<Navbar />
			{ children }
			<Footer />
			<ChatRoot />
		</>
	);
};
