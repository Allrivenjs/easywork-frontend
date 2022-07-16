import { Outlet } from 'react-router-dom';
import ChatRoot from '../../chat';
import Footer from './Footer';
import Navbar from './Navbar/Navbar';

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
			<ChatRoot />
		</>
	);
};

export default Layout;
