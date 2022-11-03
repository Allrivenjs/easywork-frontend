import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { useAuthStore } from '../../hooks';

import { IUserInformation } from '../../store/auth';

export const useUserForm = ( defaultValues: IUserInformation ) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		} = useForm<IUserInformation>({
			defaultValues,
		});

	const { startUpdateUserInformation } = useAuthStore();

	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onSubmit = handleSubmit( async (data: IUserInformation) => {
		setLoading(true);
		const res = await startUpdateUserInformation(data);
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
