import { useState } from 'react';

import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import {
	RegisterUserState
} from '../../shared/services/authService';

import { useAuthStore } from '../../hooks';

export const useRegister = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		} = useForm<RegisterUserState>({
		defaultValues: {
			name: '',
			lastname: '',
			email: '',
			phone: 0,
			birthday: '',
			password: '',
		},
	});

	const { status, startRegisterUser } = useAuthStore();

	const [loading, setLoading] = useState(false);

	const { push } = useRouter();

	const onSubmit = handleSubmit( async (data: RegisterUserState) => {
		setLoading(true);
		const token = await startRegisterUser(data);
		setLoading(false);
		// TODO: if register goes good, push to profile
		// push('/profile');
	});

	return {
		register,

		onSubmit,

		loading,
	};
};
