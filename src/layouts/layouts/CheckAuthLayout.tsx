import { FC, ReactNode, useEffect } from 'react'

import { useAuthStore } from '../hooks';

interface CheckAuthLayoutProps {
  children: ReactNode;
};

/*
* High-order layout component to refresh token in all the app
*/
export const CheckAuthLayout: FC<CheckAuthLayoutProps> = ({ children }) => {
	const {
		checkAuthToken,
	} = useAuthStore();

	useEffect(() => {
		checkAuthToken();
	}, []);

	return (
		<>
			{ children }
		</>
	);
};
