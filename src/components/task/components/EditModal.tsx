import { FC, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Stack,
	Textarea,
} from '@chakra-ui/react';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';

import { useCookies } from 'react-cookie';

import {
	CategoriesSelect,
	DifficultySelect,
} from './';

import { editTask } from '../../../shared/services/tasksService';

export interface INewTask {
	name: string;
	description: string;
	topics: Array<number>;
	difficulty: string;
	files: FileList | null;
}

interface CreateTaskState {
	newTask: INewTask;
	loading: boolean;
}

interface EditModalProps {
	task_id: string;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const EditModal: FC<EditModalProps> = ({
	isOpen,
	onOpen,
	onClose,
	task_id,
}) => {
	const initialRef = useRef(null);
	const finalRef = useRef(null);

	const [cookies] = useCookies(['user-token']);

	const { push } = useRouter();

	const [createTaskState, setCreateTaskState] = useState<CreateTaskState>({
		newTask: {
			name: '',
			description: '',
			topics: [1],
			difficulty: 'easy',
			files: null,
		},
		loading: false,
	});

	const handleOnChangeInput = (e: any) => {
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				[e.target.name]: e.target.value,
			},
		});
	};

	const handleOnChangeSelect = (idTopic: number, index: number) => {
		const newCategories = createTaskState.newTask.topics;
		newCategories[index] = idTopic;
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				topics: newCategories,
			},
		});
	};

	const handleOnAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				files: e.target.files,
			},
		});
	};

	const handleOnAddTopic = () => {
		const newCategories = createTaskState.newTask.topics;
		newCategories.push(1);
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				topics: newCategories,
			},
		});
	};

	const handleOnRemoveTopic = () => {
		const newCategories = createTaskState.newTask.topics;
		newCategories.pop();
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				topics: newCategories,
			},
		});
	};

	const handleOnSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCreateTaskState({
			...createTaskState,
			loading: true,
		});
		await editTask(cookies['user-token'], createTaskState.newTask, task_id);
		setCreateTaskState({
			...createTaskState,
			loading: false,
		});
		push('/tasks');
	};

	return (
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Editar tarea</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<form onSubmit={handleOnSubmitForm}>
						<Stack spacing={4}>
							<FormControl id='name'>
								<FormLabel htmlFor='name'>Titulo de la publicación</FormLabel>
								<Input
									onChange={handleOnChangeInput}
									name='name'
									type='name'
									required
									autoFocus
								/>
								<FormHelperText>
									Un titulo corto y especifico ayudara a los demás a entenderte
								</FormHelperText>
							</FormControl>
							<FormControl id='description'>
								<FormLabel htmlFor='description'>Descripción</FormLabel>
								<Textarea
									onChange={handleOnChangeInput}
									name='description'
									required
								></Textarea>
								<FormHelperText>
									Describe detalladamente tu problema y como quieres recibir
									ayuda de los demás
								</FormHelperText>
							</FormControl>
							<FormControl id='name'>
								<div className='flex items-center justify-between mb-2'>
									<FormLabel htmlFor='name' m={0} p={0}>
										Tematica
									</FormLabel>
									<div className='flex justify-end gap-2'>
										<IconButton
											onClick={handleOnAddTopic}
											aria-label='Add a category'
											size='sm'
											colorScheme='blue'
											icon={<AddIcon />}
										/>
										<IconButton
											onClick={handleOnRemoveTopic}
											aria-label='Add a category'
											size='sm'
											colorScheme='red'
											isDisabled={!(createTaskState.newTask.topics.length > 1)}
											icon={<MinusIcon />}
										/>
									</div>
								</div>

								{createTaskState.newTask.topics.map((element, i) => {
									return (
										<CategoriesSelect
											key={i}
											index={i}
											onChange={handleOnChangeSelect}
										/>
									);
								})}

								<FormHelperText>
									Selecciona un tematica acorde a tu tarea para ayudar
									clasificarla
								</FormHelperText>
							</FormControl>

							<FormControl id='description'>
								<FormLabel htmlFor='description'>Dificultad</FormLabel>
								<DifficultySelect onChange={handleOnChangeInput} />
								<FormHelperText>
									Elige una dificultad que consideres acorde a tu tarea
								</FormHelperText>
							</FormControl>

							<FormControl id='description'>
								<FormLabel htmlFor='description'>Archivos</FormLabel>
								<input type='file' onChange={handleOnAddFile} multiple />
								<FormHelperText>
									Puedes adjuntar pdfs, imagenes o documentos de tu tarea
								</FormHelperText>
							</FormControl>
						</Stack>
						<Stack spacing={10}>
							<Button
								isDisabled={createTaskState.loading}
								type='submit'
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
							>
								{createTaskState.loading ? (
									<Spinner />
								) : (
									<>Editar tarea</>
								)}
						</Button>
					</Stack>
					</form>
				</ModalBody>

				<ModalFooter>

					<Button onClick={onClose}>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
