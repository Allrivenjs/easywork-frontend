import { FC } from 'react';

import Link from 'next/link';

import {
	Avatar,
	Box,
	HStack,
	Link as ChakraLink,
	Text
} from '@chakra-ui/react';

import { IComment } from './interface';

export const Comment: FC<IComment> = ({
	body, replies, created_at, owner
}) => {
	return(
		<Box

		>
			<HStack
			>
				<Avatar
					name={`${owner.name} ${owner.lastname}`}
				/>
				<Box
				>
					<ChakraLink
						as={ Link }
						href={`/profile/${owner.id}`}
						size='base'
						fontWeight='bold'
					>
						{`${owner.name} ${owner.lastname}`}
					</ChakraLink>
					<p className='text-sm text-slate-500'>
						Publicaco hace:{' '}
						<span>{created_at}</span>
					</p>
				</Box>
			</HStack>

			<Text
				my={4}
				ml={14}
			>
				{body}
			</Text>

			<hr className='mb-4'/>
		</Box>
	);
};
