import { FC } from 'react';

import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	VStack
} from '@chakra-ui/react';
import { useUserForm } from '../hooks/useUserForm';

interface UserFormProps {
	name: string;
	lastname: string;
	phone: string;
	birthday: Date;
}

export const UserForm: FC<UserFormProps> = ({	birthday,	lastname,	name,	phone }) => {
	const { register, onSubmit, loading } = useUserForm({
		name,
		lastname,
		phone,
		birthday,
	});

	return (
		<form onSubmit={ onSubmit }>
			{ loading && (<>loading</>) }
			<VStack spacing={4}>
				<HStack w='full'>
					<FormControl>
						<FormLabel>Nombre</FormLabel>
						<Input {...register('name')} defaultValue={name} w={400} />
					</FormControl>
					<p className='text-sm text-slate-500'>
						Tu nombre será visible por otros usuarios y podrán encontrarte por
						el
					</p>
				</HStack>
				<HStack w='full'>
					<FormControl>
						<FormLabel>Apellido</FormLabel>
						<Input {...register('lastname')} defaultValue={lastname} w={400} />
					</FormControl>
					<p className='text-sm text-slate-500'>
						Tu apellido será visible por otros usuarios y podrán encontrarte por
						el
					</p>
				</HStack>
				<HStack w='full'>
					<FormControl>
						<FormLabel>Número de contacto</FormLabel>
						<Input {...register('phone')} defaultValue={phone} w={400} />
					</FormControl>
					<p className='text-sm text-slate-500'>
						Tu número de contacto podrá ser visible por aquellos que quieran
						contactarte
					</p>
				</HStack>
				<HStack w='full'>
					<FormControl>
						<FormLabel>Fecha de nacimiento</FormLabel>
						<Input
							{...register('birthday')}
							type='date'
							defaultValue={new Date(birthday) as any}
							w={400}
						/>
					</FormControl>
					<p className='text-sm text-slate-500'>
						Tu fecha de nacimiento no será visible para todos los usuarios
					</p>
				</HStack>
				<Button colorScheme='blue' alignSelf='flex-end' type='submit'>
					Enviar
				</Button>
			</VStack>
		</form>
	);
};
