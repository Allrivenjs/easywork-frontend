import React from 'react';

import { useAuthStore } from '../../src/hooks';
import { ProfilePage } from '../../src/profile';

const profile = () => {
	const { userProfile } = useAuthStore();

	return (
		<>
			<ProfilePage
				userProfile={userProfile}
			/>
		</>
	);
};

export default profile;
