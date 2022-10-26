import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useActiveProfileStore } from '../../src/hooks';

import { ProfilePage } from '../../src/profile';

import { Status } from '../../src/store/activeProfile';

const profileWithSlug = () => {
	const {
		status,
		activeProfile,
		startSetActiveProfile
	} = useActiveProfileStore();

	const { query } = useRouter();

	useEffect(() => {
		if (query.slug) {
			startSetActiveProfile(query.slug as string);
		};
	}, [query.slug]);

	return (
		<>
			{ status === Status.Found ? (
				<ProfilePage
					userProfile={ activeProfile }
				/>
			) : status === Status.NotFound ? (
				<>not found</>
			) : (
				<>loading...</>
			)}
		</>
	);
};

export default profileWithSlug;
