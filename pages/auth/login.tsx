import React, { useEffect } from 'react';

import { LoginPage } from '../../src/auth';

import { useAuthStore } from '../../src/hooks';

import { NoAuthLayout } from '../../src/layouts';

const login = () => {
	const {
		state,
		checkAuthToken,
	} = useAuthStore();

	useEffect(() => {
		checkAuthToken();
	}, []);

	return (
		<NoAuthLayout>
			<LoginPage />
		</NoAuthLayout>
	);
};

export default login;
