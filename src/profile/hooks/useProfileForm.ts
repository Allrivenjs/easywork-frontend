import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { useAuthStore } from '../../hooks';

import { IProfileInformation } from '../../store/auth';

export const useProfileForm = ( defaultValues: IProfileInformation ) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		} = useForm<IProfileInformation>({
			defaultValues,
		});

	const { startUpdateProfileInformation } = useAuthStore();

	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onSubmit = handleSubmit( async (data: IProfileInformation) => {
		setLoading(true);
		const res = await startUpdateProfileInformation(data);
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
