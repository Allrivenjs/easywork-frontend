import { FC, ReactNode } from 'react'

import { useRouter } from 'next/router';

import { useAuthStore } from '../hooks';

import { Status } from '../store/auth';

interface AuthLayoutProps {
  children: ReactNode;
};

/*
* High-order layout component to protect auth-required pages
*/
export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
	const {
		status,
	} = useAuthStore();

	const { push } = useRouter();

	if (status === Status.Checking) {
		return (
			<>
				loading...
			</>
		);
	} else if (status === Status.NotAuthenticated) {
		push('/');
		return (<></>);
	};

	return (
		<>
			{ children }
		</>
	);
};
