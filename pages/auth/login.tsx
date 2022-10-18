import React, { useEffect } from 'react';

import { LoginPage } from '../../src/auth';

import { NoAuthLayout } from '../../src/layouts';

const login = () => {
	return (
		<NoAuthLayout>
			<LoginPage />
		</NoAuthLayout>
	);
};

export default login;
