import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useAuth } from '../../hooks';

import { LoginUserState } from '../../shared/services/authService';

export const useLogin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		} = useForm<LoginUserState>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { status, startLoginUser } = useAuth();

	const [loading, setLoading] = useState(false);

	const onSubmit = handleSubmit( async (data: LoginUserState) => {
		await startLoginUser(data);
	});

	return {
		register,

		onSubmit,

		loading,
	};
};
