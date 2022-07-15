import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar/Navbar';

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
