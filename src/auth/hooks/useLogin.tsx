import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useAuthStore } from '../../hooks';

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

	const { startLoginUser } = useAuthStore();

	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onSubmit = handleSubmit( async (data: LoginUserState) => {
		setLoading(true);
		const res = await startLoginUser(data);
		setLoading(false);

		if (!res.ok) {
			toast({
				title: 'Algo ha salido mal',
				description: `${res.msg}`,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		};
	});

	return {
		register,

		onSubmit,

		loading,
	};
};
