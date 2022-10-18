import { FC, ReactNode } from 'react'

import { useRouter } from 'next/router';

import { useAuthStore } from '../hooks';

import { Status } from '../store/auth';

interface NoAuthLayoutProps {
  children: ReactNode;
};

/*
* High-order layout component to protect not-auth-required pages
*/
export const NoAuthLayout: FC<NoAuthLayoutProps> = ({ children }) => {
	const {
		status,
	} = useAuthStore();

	console.log(status);

	const { push } = useRouter();

	if (status === Status.Authenticated) {
		push('/');
		return (<></>);
	};

	return (
		<>
			{ children }
		</>
	);
};
