import { useState } from 'react';

import { useForm } from 'react-hook-form';

import {
	RegisterUserState
} from '../../shared/services/authService';

import { useAuthStore } from '../../hooks';
import { useToast } from '@chakra-ui/react';

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

	const { startRegisterUser } = useAuthStore();

	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onSubmit = handleSubmit( async (data: RegisterUserState) => {
		setLoading(true);
		const res = await startRegisterUser(data);
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
