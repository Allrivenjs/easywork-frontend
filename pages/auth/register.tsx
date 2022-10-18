import React from 'react';

import { RegisterPage } from '../../src/auth';

import { NoAuthLayout } from '../../src/layouts';

const register = () => {
	return (
		<NoAuthLayout>
			<RegisterPage />
		</NoAuthLayout>
	);
}

export default register;
