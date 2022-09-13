import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	Avatar,
	Badge,
	Box,
	Button,
	Container,
	Heading,
	Spinner,
} from '@chakra-ui/react';

import { useCookies } from 'react-cookie';

import {
	Comment,
	AddComment,
} from './';

import FileItem from '../../../shared/FileItem';

import { IComment, ITask } from './interface';
import { IProfile } from '../../../context/AuthContext/interfaces';

import { getComments } from '../../../shared/services/commentsServices';
import { getRoomOrCreate } from '../../../shared/services/chatServices';
import { getTaskBySlug } from '../../../shared/services/tasksService';

import { useAuth } from '../../../context/AuthContext';

export const Task = () => {
	const [cookies] = useCookies(['user-token']);

	const { user } = useAuth();
	const router = useRouter();

	const { slug } = router.query;

	const [task, setTask] = useState<ITask>();
	const [comments, setComments] = useState<Array<IComment>>();
	const [loading, setLoading] = useState(true);

	const handleOnContactUser = async () => {
		if(task?.own_id) {
			await getRoomOrCreate(cookies['user-token'], task.own_id);
		}
		location.reload();
	};

	const fetchTaskPageData = async () => {
		if (!slug) return;

		setLoading(true);
		const resTasks = await getTaskBySlug(cookies['user-token'], slug as string);
		console.log(resTasks);

		if (resTasks) {
			setTask(resTasks);
			const commentsRes = await getComments(cookies['user-token'], resTasks.id);

			if (commentsRes) {
				setComments(commentsRes);
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchTaskPageData();
	}, [slug]);

	if (loading) {
		return (
			<div className='flex items-center justify-center w-full h-screen'>
				<Spinner size={'xl'}></Spinner>
			</div>
		);
	} else {
		return (
			<div className='w-full pt-20 pb-20 bg-slate-100'>
				<Container maxW='container.xl'>
					<div className='p-4 bg-white rounded-lg shadow'>
						<div className='flex justify-between mb-4'>
							<div>
								<Heading size={'lg'}>{task?.name}</Heading>
								{task?.topics.map((element, i) => {
									return (
										<React.Fragment key={i}>
											<span className='mr-2 text-sm italic bg-gray-100 text-slate-500'>
												| {element.name}
											</span>
										</React.Fragment>
									);
								})}
							</div>
							<Badge className='h-fit'>{task?.difficulty}</Badge>
						</div>

						<hr />

						<p className='mt-4 mb-4 text-md text-slate-500'>Publicada por:</p>

						<div className='flex items-center justify-between w-full'>
							<div className='flex'>
								<Avatar
									name={`${task?.owner.name} ${task?.owner.lastname}`}
									src={task?.owner.profile_photo_path}
								/>
								<div className='ml-3'>
									<Link href={`/profile/${task?.owner.profile_slug}`}>
										<p className='font-bold hover:underline'>
											{task?.owner.name} {task?.owner.lastname}
										</p>
									</Link>
									<p className='text-sm text-slate-500'>
										Publicaco hace: {task?.created_at}
									</p>
								</div>
							</div>
							{(user as IProfile) && (user as IProfile).id !== task?.own_id && (
								<Button
									mt={4}
									colorScheme={'blue'}
									onClick={handleOnContactUser}
								>
									Aceptar tarea
								</Button>
							)}
						</div>

						<p className='mt-6 mb-4 text-md text-slate-500'>Descripción:</p>

						<p>{task?.description}</p>

						{task?.files && task?.files.length > 0 ? (
							<>
								<p className='mt-4 mb-4 text-md text-slate-500'>
									Archivos adjuntos:
								</p>
								{task?.files.map((element, i) => {
									return (
										<FileItem key={i} mime={element.mime} url={element.url} />
									);
								})}
							</>
						) : (
							<></>
						)}

						<hr className='my-5' />

						{task?.id && (
							<AddComment
								task_id={task.id}
								fetchTaskPageData={fetchTaskPageData}
							/>
						)}

						<hr className='my-2' />

						<p className='mt-6 mb-4 text-md text-slate-500'>Comentarios:</p>

						<Box flex={1}>
							{comments?.map((element, i) => (
								<Comment key={i} {...element} />
							))}
						</Box>
					</div>
				</Container>
			</div>
		);
	}
};
