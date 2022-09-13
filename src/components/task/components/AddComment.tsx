import { FC, useState } from 'react';
import { Avatar, Box, Button, HStack, Textarea, VStack } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { useAuth } from '../../../context/AuthContext';
import { IProfile } from '../../../context/AuthContext/interfaces';
import { sendNewComment } from '../../../shared/services/commentsServices';

interface AddCommentProps {
	task_id: string;
	fetchTaskPageData: () => void;
}

export const AddComment: FC<AddCommentProps> = ({ task_id, fetchTaskPageData}) => {
	const [cookies] = useCookies(['user-token']);
	const { user } = useAuth();

	const [body, setBody] = useState<string>('');

	const handleOnSendNewComment = async () => {
		await sendNewComment(cookies['user-token'], {
			body,
			own_id: (user as IProfile).user.id,
			task_id,
		});
		fetchTaskPageData();
	};

	return(
		<Box
		>
			<HStack
				align='flex-start'
			>
				<Avatar
					name={`${(user as IProfile).user.name} ${(user as IProfile).user.lastname}`}
				/>
				<Textarea
					name='body'
					bgColor='gray.50'
					placeholder='Unete a la discución con un comentario...'
					maxHeight={300}

					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
			</HStack>
			<VStack
				mt={2}
				align='flex-end'
			>
				<Button
					colorScheme='blue'
					variant='ghost'
					onClick={handleOnSendNewComment}
				>
					Enviar
				</Button>
			</VStack>
		</Box>
	);
};
