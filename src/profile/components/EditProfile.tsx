import { FC } from 'react';

import {
	Box,
	Heading,
	Text,
} from '@chakra-ui/react';

import { UserForm } from './UserForm';
import { ProfileForm } from './ProfileForm';

import { IProfile } from '../../store/auth/interfaces';

interface EditProfileProps {
	userProfile: IProfile;
}

export const EditProfile: FC<EditProfileProps> = ({ userProfile }) => {
	return (
		<Box bgColor='white' rounded='lg' shadow='base' py={8} px={12} mt={4}>
			<Heading size='lg'>Edita tu información personal</Heading>
			<hr className='my-4' />
			<Text fontWeight='bold' fontSize='xl' mb={4}>
				Información de usuario
			</Text>

			<UserForm
				birthday={userProfile.user.birthday}
				lastname={userProfile.user.lastname}
				name={userProfile.user.name}
				phone={userProfile.user.phone}
			/>

			<hr className='my-4' />
			<Text fontWeight='bold' fontSize='xl' mb={4}>
				Información del perfil
			</Text>

		<ProfileForm
			about={userProfile.about}
		/>
		</Box>
	);
};


