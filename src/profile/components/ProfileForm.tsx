import { FC } from 'react';

import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Textarea,
	VStack
} from '@chakra-ui/react';
import { useProfileForm } from '../hooks/useProfileForm';


interface ProfileFormProps {
	about: string;
}

export const ProfileForm: FC<ProfileFormProps> = ({ about }) => {
	const { register, onSubmit, loading } = useProfileForm({ about });

	return (
		<form onSubmit={onSubmit}>
			{ loading && (<>loading</>) }
			<VStack spacing={4}>
				<HStack w='full'>
					<FormControl>
						<FormLabel>Descripción</FormLabel>
						<Textarea {...register('about')} defaultValue={about} w={400} />
					</FormControl>
					<p className='text-sm text-slate-500'>
						Una breve descripción de tu persona para que los demás puedan darse
						una idea de ti. Minimo 50 caracteres.
					</p>
				</HStack>
				<Button colorScheme='blue' alignSelf='flex-end' type='submit'>
					Enviar
				</Button>
			</VStack>
		</form>
	);
};
